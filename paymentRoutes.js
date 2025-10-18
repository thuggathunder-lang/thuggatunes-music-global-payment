import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import logger from './lib/logger.js';
dotenv.config();

const router = express.Router();

// @route   POST /api/payments/initiate
// @desc    Initialize a payment
router.post("/initiate", async (req, res) => {
  try {
    const { email, amount } = req.body;

    const response = await axios.post(
      `${process.env.BASE_URL}/transaction/initialize`,
      { email, amount: amount * 100 }, // Paystack works in kobo
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
    logger.error('Payment initiation error: %o', error.response?.data || error.message);
    res.status(500).json({ message: 'Payment initiation failed' });
  }
});

export default router;