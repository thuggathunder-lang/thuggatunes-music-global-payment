import express from "express";

const router = express.Router();

// Example payment route
router.get("/", (req, res) => {
  res.json({ message: "Welcome to Thuggatunes Global Payment API" });
});

// Test route to simulate payment success
router.post("/initiate", (req, res) => {
  res.json({ success: true, message: "Payment initiated successfully" });
});

// Route to approve a payment
router.post("/approve", (req, res) => {
  const { transactionId, approvedBy } = req.body;

  if (!transactionId) {
    return res.status(400).json({ 
      success: false, 
      message: "Transaction ID is required" 
    });
  }

  res.json({ 
    success: true, 
    message: "Payment approved successfully",
    data: {
      transactionId,
      approved: true,
      approvedAt: new Date().toISOString(),
      approvedBy: approvedBy || "system",
      status: "approved"
    }
  });
});

export default router;