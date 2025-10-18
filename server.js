import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import paymentRoutes from './paymentRoutes.js';
import { fileURLToPath } from 'url';
import path from 'path';
import logger from './lib/logger.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5050;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/payments', paymentRoutes);

// Health check
app.get('/health', (req, res) => {
  const dbConnected = !!mongoose.connection && mongoose.connection.readyState === 1;
  res.json({ status: 'ok', dbConnected });
});

// Debug listeners to help diagnose unexpected errors in dev
process.on('uncaughtException', (err) => {
  logger.error('ERROR: uncaughtException %o', err && err.stack ? err.stack : err);
});
process.on('unhandledRejection', (reason) => {
  logger.error('ERROR: unhandledRejection %o', reason && reason.stack ? reason.stack : reason);
});

let _serverInstance = null;

/**
 * Gracefully shutdown HTTP server and mongoose connection.
 * By default this does not call process.exit - it only closes resources.
 * To exit the process after shutdown, pass exitAfter=true and set ALLOW_PROCESS_EXIT=1.
 */
export async function gracefulShutdown(code = 0, exitAfter = false, timeoutMs = 10000) {
  logger.info('INFO: gracefulShutdown initiated, code=%d, exitAfter=%s', code, exitAfter);
  const killTimer = setTimeout(() => {
    logger.warn('WARN: gracefulShutdown timeout reached, forcing exit');
    if (exitAfter && process.env.ALLOW_PROCESS_EXIT === '1') process.exit(code);
    process.exitCode = code;
  }, timeoutMs);

  try {
    if (_serverInstance && _serverInstance.close) {
      await new Promise((resolve, reject) => {
        _serverInstance.close((err) => (err ? reject(err) : resolve()));
      });
      logger.info('INFO: HTTP server closed');
      _serverInstance = null;
    }
    if (mongoose && mongoose.disconnect) {
      await mongoose.disconnect();
      logger.info('INFO: Mongoose disconnected');
    }
  } catch (err) {
    logger.error('ERROR during gracefulShutdown: %o', err && err.stack ? err.stack : err);
  } finally {
    clearTimeout(killTimer);
    if (exitAfter) {
      if (process.env.ALLOW_PROCESS_EXIT === '1') {
        process.exit(code);
      }
      process.exitCode = code;
    }
  }
}

export function safeExit(code = 0) {
  if (process.env.ALLOW_PROCESS_EXIT === '1') {
    process.exit(code);
  }
  process.exitCode = code;
}

// Start server helper so tests can run the server in-process
export async function startServer(port = PORT) {
  // Connect to MongoDB only when starting the server
  if (process.env.MONGO_URI) {
    try {
      await mongoose.connect(process.env.MONGO_URI, {});
      logger.info('✅ MongoDB Connected Successfully');
    } catch (err) {
      logger.error('❌ MongoDB Error: %o', err && err.stack ? err.stack : err);
    }
  } else {
    logger.warn('⚠️  MONGO_URI not set — skipping MongoDB connection (development mode)');
  }

  return new Promise((resolve, reject) => {
    const server = app.listen(port, () => {
      logger.info('✅ Server running on port %d', port);
      _serverInstance = server;
      resolve(server);
    });
    server.on('error', (err) => {
      logger.error('ERROR: server listen error %o', err && err.stack ? err.stack : err);
      reject(err);
    });
  });
}

// If run directly, start the server
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(__filename)) {
  // started from command line: node server.js
  startServer();
  // Register termination signal handlers only when explicitly enabled.
  // Some environments (including the test harness) may send signals that
  // cause an immediate shutdown; enable this in production by setting
  // ENABLE_SHUTDOWN_SIGNALS=1 in the environment.
  if (process.env.ENABLE_SHUTDOWN_SIGNALS === '1') {
    process.on('SIGINT', () => gracefulShutdown(0, true));
    process.on('SIGTERM', () => gracefulShutdown(0, true));
  } else {
    logger.warn('WARN: shutdown signal handlers not registered (ENABLE_SHUTDOWN_SIGNALS!=1)');
  }
}

export default app;