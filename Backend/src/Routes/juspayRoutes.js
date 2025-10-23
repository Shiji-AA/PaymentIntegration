import express from 'express';
import juspay from '../config/juspayConfig.js';
import Order from '../model/orderModel.js';
import Course from '../model/courseModel.js';
import dotenv from 'dotenv';

dotenv.config();
const juspayRouter = express.Router();

// Allowed return URL (for Juspay session)
const ALLOWED_RETURN_URL = process.env.JUSPAY_RETURN_URL || 'https://courses.arcite.in/api/payment/response';

// FRONTEND URL (used for redirects)
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:4000';

// ---------------------------------------------
// Initiate Payment
// ---------------------------------------------
juspayRouter.post('/initiate', async (req, res) => {
  const {
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
    // amount,
  } = req.body;

  const amount = 12;
  // Validate required fields
  if (!customerId || !userId || !courseId || !customerName || !customerEmail || !customerPhone || !amount) {
    return res.status(400).json({ error: "Missing required fields." });
  }

  const orderId = req.body.orderId || `order_${Date.now()}`;
  const returnUrl = ALLOWED_RETURN_URL;

  try {
    // Check for duplicate order
    const existingOrder = await Order.findOne({ orderId });
    if (existingOrder) {
      return res.status(400).json({ error: "Duplicate orderId. Please try again." });
    }

    // Fetch course
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ error: "Invalid course ID" });
    }

    const coursename = course.courseName || "Course Payment";
    const firstName = customerName.trim();
    const lastName = "-"; // placeholder since you only have full name

    // Create Juspay order session
    const session = await juspay.orderSession.create({
      order_id: orderId,
      amount,
      customerId,
      payment_page_client_id: process.env.PAYMENT_PAGE_CLIENT_ID,
      action: 'paymentPage',
      return_url: returnUrl,
      currency: 'INR',
      first_name: firstName,
      last_name: lastName,
      customer_email: customerEmail,
      customer_phone: customerPhone,
      description: `Payment for ${coursename}`,
    });

    // Save order in DB
    await Order.create({
      orderId,
      user: userId,
      course: courseId,
      coursename,
      campusOpted,
      amount,
      status: 'CREATED',
      paymentMethod: 'juspay',
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
    console.error("Error creating order:", err);
    return res.status(500).json({ error: err.message || 'Juspay Error' });
  }
});

// ---------------------------------------------
// Handle Payment Response (status update)
// ---------------------------------------------
juspayRouter.post('/response', async (req, res) => {
  const orderId = req.body.order_id;

  if (!orderId) return res.status(400).json({ error: 'order_id missing' });

  try {
    const statusResponse = await juspay.order.status(orderId);
    const orderStatus = (statusResponse.status || '').toUpperCase();
    const amount = statusResponse.amount;
    const isEnrolled = orderStatus === 'CHARGED';
    const txnId = statusResponse?.txn_detail?.txn_id || null;

    // Update order in DB 

    const updatedOrder = await Order.findOneAndUpdate(
  { orderId },
  {
    status: orderStatus,
    enrolled: isEnrolled,
    enrolledAt: isEnrolled ? new Date() : null,   
    paymentId: txnId,    
  },
  { new: true }
);
console.log("Updated Order:", updatedOrder);



    // Redirect user to frontend with query params
    if (orderStatus === "CHARGED") {
      return res.redirect(
        `${FRONTEND_URL}/payment/success?orderId=${orderId}&amount=${amount}`
      );
    } else {
      return res.redirect(
        `${FRONTEND_URL}/payment/failure?orderId=${orderId}&status=${orderStatus}`
      );
    }

  } catch (error) {
    console.error("Error verifying order:", error);
    return res.status(500).json({ error: 'Failed to verify payment' });
  }
});

// ---------------------------------------------
// Generate Receipt
// ---------------------------------------------
juspayRouter.get('/receipt/:orderId', async (req, res) => {
  const { orderId } = req.params;

  try {
    const localOrder = await Order.findOne({ orderId }).populate('user course');
    if (!localOrder) return res.status(404).json({ error: 'Order not found' });

    const juspayDetails = await juspay.order.status(orderId);
    if (!juspayDetails || juspayDetails.status !== 'CHARGED') {
      return res.status(400).json({ error: 'Receipt only available for successful payments' });
    }

    const txn = juspayDetails.txn_detail || {};
    const card = juspayDetails.card || {};
    const pgResp = juspayDetails.payment_gateway_response || {};

    const receipt = {
      receiptId: `ARCITE-${new Date(txn.created || Date.now()).getFullYear()}-${orderId.slice(-7)}`,
      orderId: orderId,
      transactionId: txn.txn_id || 'N/A',
      amountPaid: `₹${juspayDetails.amount}`,
      paymentMethod: `${card.card_brand || 'CARD'} (${card.card_type || 'N/A'})`,
      cardLast4: card.last_four_digits || '',
      cardIssuer: card.card_issuer || '',
      cardType: card.extended_card_type || '',
      customer: {
        name: card.name_on_card || localOrder.customerName || 'N/A',
        email: juspayDetails.customer_email,
        phone: juspayDetails.customer_phone,
      },
      status: juspayDetails.status,
      paidOn: txn.last_updated || juspayDetails.last_updated,
      bankTxnId: pgResp.epg_txn_id || '',
      rrn: pgResp.rrn || '',
      authCode: pgResp.auth_id_code || '',
    };

    return res.status(200).json({ success: true, receipt });

  } catch (err) {
    console.error("Error fetching receipt:", err);
    return res.status(500).json({ error: "Could not generate receipt" });
  }
});

export default juspayRouter;
