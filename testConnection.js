// testConnection.js
const mongoose = require("mongoose");
// Load Stripe key from environment. Do NOT hard-code secrets in source.
const stripeKey = process.env.STRIPE_KEY || process.env.STRIPE_TEST_KEY || '';
if (!stripeKey) {
  console.warn('WARN: STRIPE_KEY not set; Stripe calls will fail in this test file');
}
const stripe = require('stripe')(stripeKey);
const connectDB = require("./db"); // Your db.js file

(async () => {
  try {
    // 1️⃣ Test MongoDB connection
    await connectDB();
    console.log("✅ MongoDB connected successfully!");

    // 2️⃣ Test Stripe connection by creating a test payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 100,        // 1.00 USD (or your currency)
      currency: "usd",
      payment_method_types: ["card"],
    });

    console.log("✅ Stripe test successful! PaymentIntent ID:", paymentIntent.id);

    process.exit(0); // exit script
  } catch (err) {
    console.error("❌ Connection test failed:", err);
    process.exit(1); // exit with error
  }
})();
