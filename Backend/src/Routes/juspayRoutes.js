import express from 'express';
import juspay from '../config/juspayConfig.js';
import Order from '../model/orderModel.js'
const juspayRouter = express.Router();
import dotenv from "dotenv"
dotenv.config()



juspayRouter.post('/initiate', async (req, res) => {
  const orderId = `order_${Date.now()}`;
  const amount = req.body.amount || 100;
  const returnUrl = `${req.protocol}://${req.get('host')}/api/payment/response`;

  try {
    const session = await juspay.orderSession.create({
      order_id: orderId,
      amount,
      payment_page_client_id: process.env.PAYMENT_PAGE_CLIENT_ID,
      customer_id: req.body.customerId || 'demo_customer',
      action: 'paymentPage',
      return_url: returnUrl,
      currency: 'INR',
      // Add optional fields to mimic the sample response more closely
      first_name: req.body.firstName || 'John',
      last_name: req.body.lastName || 'Doe',
      customer_email: req.body.customerEmail || 'test@mail.com',
      customer_phone: req.body.customerPhone || '9876543210',
      description: req.body.description || 'Complete your payment',
    });

        // ✅ Save the order in your DB
    await Order.create({
      orderId,
      user: req.body.userId, // optional
      course: req.body.courseId, // optional
      amount,
      status: 'CREATED',
    });

    // Remove the HTTP property if present
    if (session.http) delete session.http;

    // Send the full session object as response
    res.status(200).json(session);

  } catch (err) {
    res.status(500).json({ error: err.message || 'Juspay Error' });
  }
});


juspayRouter.post('/response', async (req, res) => {
  const orderId = req.body.order_id;

  if (!orderId) return res.status(400).json({ error: 'order_id missing' });
 try {
    // Fetch the payment status from Juspay
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

    
    // Attach the message to the response before sending
    const responsePayload = makeJuspayResponse(statusResponse);
    responsePayload.message = message;

       // ✅ Update order status in DB
    await Order.findOneAndUpdate(
      { orderId }, // Match by Juspay order ID
      { status: orderStatus },
      { new: true }
    );

  // Use your frontend URL
// const redirectUrl = `${process.env.FRONTEND_URL}/payment/success?orderId=${orderId}&amount=${statusResponse.amount}&status=${orderStatus}`;
// return res.redirect(302, redirectUrl);

    return res.json(responsePayload);


  } catch (error) {
    if (error instanceof APIError) {
      return res.json(makeError(error.message));
    }
    return res.json(makeError());
  }
});


function makeJuspayResponse(successRspFromJuspay) {
  if (!successRspFromJuspay) return successRspFromJuspay;
  if (successRspFromJuspay.http) delete successRspFromJuspay.http;
  return successRspFromJuspay;
}


export default juspayRouter;
