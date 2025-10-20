import mongoose from 'mongoose';
import logger from '../../lib/logger.js';
import Stripe from 'stripe';

// Load Stripe key from environment. Do NOT hard-code secrets in source.
const stripeKey = process.env.STRIPE_KEY || process.env.STRIPE_TEST_KEY || '';
if (!stripeKey) {
  logger.warn('WARN: STRIPE_KEY not set; Stripe calls will fail in this test file');
}
const stripe = Stripe(stripeKey);

// ✅ MongoDB connection (leave this as is if you’re running MongoDB locally)
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/thuggatunes_payments';

async function testConnections() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGO_URI);
    logger.info('✅ MongoDB connected successfully!');

    // Test Stripe connection
    const balance = await stripe.balance.retrieve();
    logger.info('✅ Stripe connection successful!');
    logger.info('💰 Balance Info: %o', balance);
  } catch (err) {
    logger.error('❌ Connection test failed: %o', err && err.stack ? err.stack : err);
  } finally {
    mongoose.connection.close();
  }
}

testConnections();
