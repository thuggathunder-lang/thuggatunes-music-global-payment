import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import paymentRoutes from "./paymentRoutes.js";
import { fileURLToPath } from 'url';
import path from 'path';

dotenv.config();

// Intercept accidental calls to process.exit so imported utilities or tests
// cannot terminate the running server unexpectedly. To allow exits in
// special cases (CI or intentional scripts) set ALLOW_PROCESS_EXIT=1.
const _originalProcessExit = process.exit.bind(process);
process.exit = (code = 0) => {
  if (process.env.ALLOW_PROCESS_EXIT === '1') {
    return _originalProcessExit(code);
  }
  // record code but do not exit the process
  console.warn(`Blocked process.exit(${code}) — set ALLOW_PROCESS_EXIT=1 to allow`);
  process.exitCode = code ?? process.exitCode;
};

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

// Debug listeners to help diagnose unexpected exits in dev
process.on('uncaughtException', (err) => {
  console.error('ERROR: uncaughtException', err && err.stack ? err.stack : err);
});
process.on('unhandledRejection', (reason) => {
  console.error('ERROR: unhandledRejection', reason && reason.stack ? reason.stack : reason);
});

let _serverInstance = null;
export async function gracefulShutdown(code = 0) {
  console.log('INFO: gracefulShutdown initiated, code =', code);
  try {
    if (_serverInstance && _serverInstance.close) {
      await new Promise((resolve) => _serverInstance.close(resolve));
      console.log('INFO: HTTP server closed');
    }
    if (mongoose && mongoose.disconnect) {
      await mongoose.disconnect();
      console.log('INFO: Mongoose disconnected');
    }
  } catch (err) {
    console.error('ERROR during gracefulShutdown:', err && err.stack ? err.stack : err);
  }
  // finally exit using original saved exit
  _originalProcessExit(code);
}

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
      _serverInstance = server;
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
  // Register termination signal handlers only when explicitly enabled.
  // Some environments (including the test harness) may send signals that
  // cause an immediate shutdown; enable this in production by setting
  // ENABLE_SHUTDOWN_SIGNALS=1 in the environment.
  if (process.env.ENABLE_SHUTDOWN_SIGNALS === '1') {
    process.on('SIGINT', () => gracefulShutdown(0));
    process.on('SIGTERM', () => gracefulShutdown(0));
  } else {
    console.log('WARN: shutdown signal handlers not registered (ENABLE_SHUTDOWN_SIGNALS!=1)');
  }
}

export default app;