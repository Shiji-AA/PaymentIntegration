import express from 'express';
import juspay from '../config/juspayConfig.js';
import Order from '../model/orderModel.js';
import Course from '../model/courseModel.js';
import dotenv from "dotenv";

dotenv.config();
const juspayRouter = express.Router();

// Set allowed return URL to prevent tampering
const ALLOWED_RETURN_URL = process.env.JUSPAY_RETURN_URL || 'https://courses.arcite.in/api/payment/response';

// ---------------------------------------------
// Initiate Payment
// ---------------------------------------------
juspayRouter.post('/initiate', async (req, res) => {
  const {
    customerId = 'demo_customer',
    userId,
    courseId,
    campus = 'Kochi',
  } = req.body;

  const orderId = req.body.orderId || `order_${Date.now()}`;
  const returnUrl = ALLOWED_RETURN_URL;

  if (returnUrl !== ALLOWED_RETURN_URL) {
    return res.status(400).json({ error: "Invalid return URL" });
  }

  if (!userId || !courseId) {
    return res.status(400).json({ error: "Missing required fields: userId or courseId" });
  }

  try {
    // Fetch course securely
      const existingOrder = await Order.findOne({ orderId });
    if (existingOrder) {
      return res.status(400).json({ error: "Duplicate orderId. Please try again." });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ error: "Invalid course ID" });
    }

    const amount = course.fee || course.amount || 1000;
    const coursename = course.name || course.title || "Course Payment";

    // Create Juspay order session
    const session = await juspay.orderSession.create({
      order_id: orderId,
      amount,
      customerId,
      payment_page_client_id: process.env.PAYMENT_PAGE_CLIENT_ID,
      action: 'paymentPage',
      return_url: returnUrl,
      currency: 'INR',
      first_name: req.body.firstName || 'John',
      last_name: req.body.lastName || 'Doe',
      customer_email: req.body.customerEmail || 'test@mail.com',
      customer_phone: req.body.customerPhone || '9876543210',
      description: `Payment for ${coursename}`,
    });

    //Save order in DB
    await Order.create({
      orderId,
      user: userId,
      course: courseId,
      coursename,
      campus,
      amount,
      status: 'CREATED',
      paymentMethod: 'juspay',
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
    const orderStatus = statusResponse.status;

    let message = '';
    switch (orderStatus) {
      case "CHARGED":
        message = "Order payment done successfully";
        break;
      case "PENDING":
      case "PENDING_VBV":
        message = "Order payment pending";
        break;
      case "AUTHORIZATION_FAILED":
        message = "Order payment authorization failed";
        break;
      case "AUTHENTICATION_FAILED":
        message = "Order payment authentication failed";
        break;
      default:
        message = "Order status: " + orderStatus;
        break;
    }

    // Update order in DB
    await Order.findOneAndUpdate(
      { orderId },
      { status: orderStatus },
      { new: true }
    );

    const responsePayload = makeJuspayResponse(statusResponse);
    responsePayload.message = message;
    return res.json(responsePayload);

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
    // Fetch order & enrich with Juspay status
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
        name: card.name_on_card || localOrder.user?.name || 'N/A',
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
//  return res.redirect(`https://courses.arcite.in/receipt/${orderId}`);

 

  } catch (err) {
    console.error("Error fetching receipt:", err);
    return res.status(500).json({ error: "Could not generate receipt" });
  }
});
// ---------------------------------------------
// Helper: Clean Juspay response
// ---------------------------------------------
function makeJuspayResponse(successRspFromJuspay) {
  if (!successRspFromJuspay) return {};
  if (successRspFromJuspay.http) delete successRspFromJuspay.http;
  return successRspFromJuspay;
}

export default juspayRouter;
