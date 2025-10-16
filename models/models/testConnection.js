// testConnection.js
const mongoose = require("mongoose");
// Load Stripe key from environment. Do NOT hard-code secrets in source.
const stripeKey = process.env.STRIPE_KEY || process.env.STRIPE_TEST_KEY || '';
if (!stripeKey) {
  console.warn('WARN: STRIPE_KEY not set; Stripe calls will fail in this test file');
}
const stripe = require('stripe')(stripeKey);

// ✅ MongoDB connection (leave this as is if you’re running MongoDB locally)
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/thuggatunes_payments";

async function testConnections() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB connected successfully!");

    // Test Stripe connection
    const balance = await stripe.balance.retrieve();
    console.log("✅ Stripe connection successful!");
    console.log("💰 Balance Info:", balance);
  } catch (err) {
    console.error("❌ Connection test failed:", err);
  } finally {
    mongoose.connection.close();
  }
}

testConnections();
