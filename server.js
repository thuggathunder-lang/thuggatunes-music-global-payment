import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import paymentRoutes from "./paymentRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5050;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/payments", paymentRoutes);

// MongoDB connection (only when MONGO_URI is provided)
if (process.env.MONGO_URI) {
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("✅ MongoDB Connected Successfully"))
    .catch((err) => console.error("❌ MongoDB Error:", err));
} else {
  console.warn("⚠️  MONGO_URI is not set. Skipping MongoDB connection. Set MONGO_URI in .env to enable DB.");
}

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});