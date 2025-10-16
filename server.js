import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import paymentRoutes from "./paymentRoutes.js";
import { fileURLToPath } from 'url';
import path from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5050;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/payments", paymentRoutes);

// Health check
app.get('/health', (req, res) => {
  const dbConnected = !!mongoose.connection && mongoose.connection.readyState === 1;
  res.json({ status: 'ok', dbConnected });
});

// MongoDB connection (only if MONGO_URI is provided)
if (process.env.MONGO_URI) {
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("✅ MongoDB Connected Successfully"))
    .catch((err) => console.error("❌ MongoDB Error:", err));
} else {
  console.warn('⚠️  MONGO_URI not set — skipping MongoDB connection (development mode)');
}

// Start server helper so tests can run the server in-process
export async function startServer(port = PORT) {
  // MongoDB connection (only if MONGO_URI is provided)
  if (process.env.MONGO_URI) {
    try {
      await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("✅ MongoDB Connected Successfully");
    } catch (err) {
      console.error("❌ MongoDB Error:", err);
    }
  } else {
    console.warn('⚠️  MONGO_URI not set — skipping MongoDB connection (development mode)');
  }

  return new Promise((resolve) => {
    const server = app.listen(port, () => {
      console.log(`✅ Server running on port ${port}`);
      resolve(server);
    });
  });
}

// If run directly, start the server
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(__filename)) {
  // started from command line: node server.js
  startServer();
}

export default app;