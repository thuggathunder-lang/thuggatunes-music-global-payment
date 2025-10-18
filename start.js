import logger from './lib/logger.js';

// start.js - bootstrap to capture unexpected process.exit calls and global errors
const origExit = process.exit;
process.exit = function (code = 0) {
  try {
    // log stack where exit was called
    const err = new Error('DEBUG: process.exit intercepted');
    logger.error('DEBUG: process.exit called with code=%d', code);
    logger.error(err.stack);
  } catch (e) {
    logger.error('DEBUG: failed to log process.exit stack %o', e);
  }
  return origExit(code);
};

process.on('exit', (code) => {
  logger.info('DEBUG: process.exit event, code=%d', code);
});
process.on('uncaughtException', (err) => {
  logger.error('DEBUG: uncaughtException %o', err && err.stack ? err.stack : err);
});
process.on('unhandledRejection', (reason) => {
  logger.error('DEBUG: unhandledRejection %o', reason && reason.stack ? reason.stack : reason);
});

// Import server after hooks are in place
import('./server.js')
  .then(() => {
    logger.info('DEBUG: server imported from start.js');
  })
  .catch((err) => {
    logger.error('DEBUG: error importing server.js %o', err && err.stack ? err.stack : err);
  });
