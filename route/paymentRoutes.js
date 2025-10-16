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

export default router;