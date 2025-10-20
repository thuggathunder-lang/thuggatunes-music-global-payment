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

// @route   POST /api/payments/approve
// @desc    Approve a payment transaction
router.post("/approve", async (req, res) => {
  try {
    const { transactionId, approvedBy } = req.body;

    if (!transactionId) {
      return res.status(400).json({ 
        success: false, 
        message: "Transaction ID is required" 
      });
    }

    // In a real implementation, this would update the transaction in the database
    // For now, we'll return a success response
    const approvalData = {
      transactionId,
      approved: true,
      approvedAt: new Date().toISOString(),
      approvedBy: approvedBy || "system",
      status: "approved"
    };

    res.status(200).json({ 
      success: true, 
      message: "Payment approved successfully",
      data: approvalData
    });
  } catch (error) {
    console.error("Payment approval error:", error.message);
    res.status(500).json({ 
      success: false, 
      message: "Payment approval failed" 
    });
  }
});

export default router;