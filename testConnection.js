import logger from './lib/logger.js';
import Stripe from 'stripe';
import connectDB from './db.js';

// Load Stripe key from environment. Do NOT hard-code secrets in source.
const stripeKey = process.env.STRIPE_KEY || process.env.STRIPE_TEST_KEY || '';
if (!stripeKey) {
  logger.warn('WARN: STRIPE_KEY not set; Stripe calls will fail in this test file');
}
const stripe = Stripe(stripeKey);

(async () => {
  try {
    // 1️⃣ Test MongoDB connection
    await connectDB();
    logger.info('✅ MongoDB connected successfully!');

    // 2️⃣ Test Stripe connection by creating a test payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 100, // 1.00 USD (or your currency)
      currency: 'usd',
      payment_method_types: ['card'],
    });

    logger.info('✅ Stripe test successful! PaymentIntent ID: %s', paymentIntent.id);

    process.exit(0); // explicit exit for CLI script
  } catch (err) {
    logger.error('❌ Connection test failed: %o', err && err.stack ? err.stack : err);
    process.exit(1); // explicit exit for CLI script
  }
})();
