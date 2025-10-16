// Load .env from project root (standard behavior)
import path from 'path';
import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';
import logger from './lib/logger.js';
import { validateEnv } from './lib/envValidator.js';

const argv = yargs(hideBin(process.argv))
  .option('env', {
    alias: 'e',
    description: 'Path to env file',
    type: 'string',
  })
  .option('no-dotenv', {
    alias: 'D',
    description: 'Do not load .env file (use only process env)',
    type: 'boolean',
    default: false,
  })
  .help()
  .alias('help', 'h').argv;

// Load env according to flags: --env path, or default .env, or --no-dotenv to skip
// yargs can handle negation, but to be robust detect the raw flag directly too.
const rawNoDotenv = process.argv.slice(2).some((a) => a === '--no-dotenv' || a === '-D');
const noDotenv = rawNoDotenv || argv.noDotenv || argv['no-dotenv'];
if (noDotenv) {
  logger.info('Skipping dotenv load (--no-dotenv)');
} else if (argv.env) {
  const envPath = path.isAbsolute(argv.env) ? argv.env : path.join(process.cwd(), argv.env);
  logger.info('Loading env from %s', envPath);
  require('dotenv').config({ path: envPath });
} else {
  logger.info('Loading env from .env in project root');
  require('dotenv').config();
}

try {
  validateEnv();
  logger.info('Env test: %s', process.env.TEST_KEY);
  process.exitCode = 0;
} catch (err) {
  logger.error('Environment validation failed: %s', err.message);
  process.exitCode = 1;
}

// Ensure the script exits (child processes used in tests otherwise may hang
// when transports or other async work keep the event loop alive).
// Use a short deferred exit so any pending logs flush.
setImmediate(() => process.exit(process.exitCode || 0));
