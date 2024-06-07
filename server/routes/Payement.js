const express = require('express');
const router = express.Router();
const razorpayInstance = require('../config/razorpay');
const crypto = require('crypto');

router.post('/create-order', async (req, res) => {
  const { amount, currency, receipt, notes } = req.body;

  try {
    const options = {
      amount: amount * 100, // Amount in paise
      currency,
      receipt,
      notes,
    };

    const order = await razorpayInstance.orders.create(options);

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: error.message,
    });
  }
});

router.post('/verify-signature', (req, res) => {
    const { order_id, payment_id, signature } = req.body;
  
    const body = order_id + '|' + payment_id;
  
    const expectedSignature = crypto
      .createHmac('sha256', 'YOUR_RAZORPAY_SECRET')
      .update(body.toString())
      .digest('hex');
  
    const isAuthentic = expectedSignature === signature;
  
    if (isAuthentic) {
      res.status(200).json({ success: true, message: 'Payment verified successfully' });
    } else {
      res.status(400).json({ success: false, message: 'Payment verification failed' });
    }
  });
  


module.exports = router;
