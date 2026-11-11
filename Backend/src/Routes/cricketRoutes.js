import express from "express";
import juspay from "../config/juspayConfig.js";
import Cricket from "../model/cricketModel.js";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();


const CRICKET_FEE = Number(process.env.CRICKET_FEE || 15);

const RETURN_URL =
  process.env.JUSPAY_CRICKET_RETURN_URL ||
  "https://courses.arcite.in/api/cricket/response";

const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:4000";

const generateOrderId = () =>
  `CRK${Date.now()}${Math.floor(100 + Math.random() * 900)}`;

/* =====================================================
   INITIATE PAYMENT
===================================================== */
router.post("/initiate", async (req, res) => {
  let orderId;
  try {
    orderId = generateOrderId();

    await Cricket.create({
      orderId,
      amount: CRICKET_FEE,
      status: "CREATED",
      paymentMethod: "juspay",
    });

    const session = await juspay.orderSession.create({
      order_id: orderId,
      amount: CRICKET_FEE,
      currency: "INR",
      customerId: `guest_${orderId}`,
      payment_page_client_id: process.env.PAYMENT_PAGE_CLIENT_ID,
      action: "paymentPage",
      return_url: RETURN_URL,
      description: "Cricket League Payment",
    });

    await Cricket.updateOne({ orderId }, { status: session.status || "NEW" });

    if (session.http) delete session.http;
    return res.status(200).json(session);
  } catch (err) {
    console.error("CRICKET INITIATE ERROR:", err);
    if (orderId) {
      await Cricket.updateOne({ orderId }, { status: "FAILED" }).catch(() => {});
    }
    return res.status(500).json({ error: "Payment initiation failed" });
  }
});

/* =====================================================
   PAYMENT RESPONSE (Juspay return URL)
===================================================== */
router.post("/response", async (req, res) => {
  const orderId = req.body.order_id;
  if (!orderId) return res.status(400).json({ error: "order_id missing" });

  try {
    const order = await Cricket.findOne({ orderId });
    if (!order) return res.status(404).json({ error: "Order not found" });

    // Juspay-യോട് ചോദിച്ച് status ഉറപ്പാക്കുന്നു
    const statusResponse = await juspay.order.status(orderId);
    const status = (statusResponse.status || "").toUpperCase();
    const txnId = statusResponse?.txn_detail?.txn_id || null;

    await Cricket.updateOne(
      { orderId },
      { status, paymentId: txnId, juspayResponse: statusResponse }
    );

    if (status === "CHARGED") {
      return res.redirect(
        `${FRONTEND_URL}/payment/success?orderId=${orderId}&amount=${statusResponse.amount}&type=cricket`
      );
    }

    return res.redirect(
      `${FRONTEND_URL}/payment/failure?orderId=${orderId}&status=${status}&type=cricket`
    );
  } catch (err) {
    console.error("CRICKET RESPONSE ERROR:", err);
    return res.status(500).json({ error: "Payment verification failed" });
  }
});

/* =====================================================
   RECEIPT (SUCCESS ONLY)
===================================================== */
router.get("/receipt/:orderId", async (req, res) => {
  try {
    const order = await Cricket.findOne({ orderId: req.params.orderId });

    if (!order) return res.status(404).json({ error: "Order not found" });
    if (order.status !== "CHARGED") {
      return res.status(400).json({ error: "Payment not successful" });
    }

    return res.json({
      orderId: order.orderId,
      paymentId: order.paymentId,
      amountPaid: order.amount,
      paymentMethod: order.paymentMethod,
      paidOn: order.updatedAt,
    });
  } catch (err) {
    return res.status(500).json({ error: "Receipt error" });
  }
});

export default router;