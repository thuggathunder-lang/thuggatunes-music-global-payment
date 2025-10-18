import mongoose from 'mongoose';
import logger from '../../lib/logger.js';

const connectDB = async (uri = 'mongodb://localhost:27017/thuggatunes_payments') => {
  try {
    const conn = await mongoose.connect(uri, {});
    logger.info('✅ MongoDB connected: %s', conn.connection.host);
  } catch (error) {
    logger.error('❌ MongoDB connection error: %s', error && error.message ? error.message : error);
    process.exit(1);
  }
};

export default connectDB;
