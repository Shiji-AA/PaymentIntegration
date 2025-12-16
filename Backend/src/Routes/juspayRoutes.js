import express from "express";
import juspay from "../config/juspayConfig.js";
import Order from "../model/orderModel.js";
import Course from "../model/courseModel.js";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

const RETURN_URL =
  process.env.JUSPAY_RETURN_URL ||
  "https://courses.arcite.in/api/payment/response";

const FRONTEND_URL =
  process.env.FRONTEND_URL || "http://localhost:4000";

/* =====================================================
   INITIATE PAYMENT
===================================================== */
router.post("/initiate", async (req, res) => {
  try {
    const {
      orderId,
      customerId,
      userId,
      courseId,
      campusOpted,
      customerName,
      customerEmail,
      customerPhone,
      collegeName,
      joiningBatch,
      dayScholarOrHosteler,
      hasLaptop,
      whatsapp,
      amount,
    } = req.body;

    //const amount = 15;

    if (!orderId || !courseId || !customerName || !customerEmail || !customerPhone) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const existing = await Order.findOne({ orderId });
    if (existing) {
      return res.status(400).json({ error: "Duplicate orderId" });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ error: "Invalid course" });
    }

    const session = await juspay.orderSession.create({
      order_id: orderId,
      amount,
      currency: "INR",
      customerId,
      payment_page_client_id: process.env.PAYMENT_PAGE_CLIENT_ID,
      action: "paymentPage",
      return_url: RETURN_URL,
      first_name: customerName,
      last_name: "-",
      customer_email: customerEmail,
      customer_phone: customerPhone,
      description: `Payment for ${course.courseName}`,
    });

    await Order.create({
      orderId,
      user: userId || null,
      course: courseId,
      coursename: course.courseName,
      campusOpted,
      amount,
      status: session.status || "CREATED",
      paymentMethod: "juspay",
      enrolled: false,
      customerName,
      customerEmail,
      customerPhone,
      collegeName,
      joiningBatch,
      dayScholarOrHosteler,
      hasLaptop,
      whatsapp,
    });

    if (session.http) delete session.http;
    return res.status(200).json(session);
  } catch (err) {
    console.error("INITIATE ERROR:", err);
    return res.status(500).json({ error: "Payment initiation failed" });
  }
});

/* =====================================================
   PAYMENT RESPONSE
===================================================== */
router.post("/response", async (req, res) => {
  const orderId = req.body.order_id;
  if (!orderId) return res.status(400).json({ error: "order_id missing" });

  try {
    const statusResponse = await juspay.order.status(orderId);
    const status = (statusResponse.status || "").toUpperCase();
    const txnId = statusResponse?.txn_detail?.txn_id || null;
    const amount = statusResponse.amount;

    const enrolled = status === "CHARGED";

    await Order.findOneAndUpdate(
      { orderId },
      {
        status,
        paymentId: txnId,
        enrolled,
        enrolledAt: enrolled ? new Date() : null,
        juspayResponse: statusResponse,
      }
    );

    if (status === "CHARGED") {
      return res.redirect(
        `${FRONTEND_URL}/payment/success?orderId=${orderId}&amount=${amount}`
      );
    }

    return res.redirect(
      `${FRONTEND_URL}/payment/failure?orderId=${orderId}&status=${status}`
    );
  } catch (err) {
    console.error("RESPONSE ERROR:", err);
    return res.status(500).json({ error: "Payment verification failed" });
  }
});

/* =====================================================
   RECEIPT (SUCCESS ONLY)
===================================================== */
router.get("/receipt/:orderId", async (req, res) => {
  try {
    const order = await Order.findOne({ orderId: req.params.orderId })
      .populate("course user");

    if (!order) return res.status(404).json({ error: "Order not found" });
    if (order.status !== "CHARGED") {
      return res.status(400).json({ error: "Payment not successful" });
    }

    return res.json({
      receiptId: `ARCITE-${order.createdAt.getFullYear()}-${order.orderId.slice(-6)}`,
      orderId: order.orderId,
      amountPaid: order.amount,
      customerName: order.customerName,
      course: order.coursename,
      paidOn: order.enrolledAt,
    });
  } catch (err) {
    return res.status(500).json({ error: "Receipt error" });
  }
});

export default router;
