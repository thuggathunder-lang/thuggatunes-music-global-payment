// debug.mjs - import server and log process exit/uncaughtException for diagnosis

import logger from './lib/logger.js';

process.on('exit', (code) => {
  logger.info('DEBUG: process.exit event, code=%d', code);
});
process.on('uncaughtException', (err) => {
  logger.error('DEBUG: uncaughtException %o', err && err.stack ? err.stack : err);
  // Do not exit here so we can see stack
});
process.on('unhandledRejection', (reason) => {
  logger.error('DEBUG: unhandledRejection %o', reason && reason.stack ? reason.stack : reason);
});

import('./server.js')
  .then((mod) => {
    logger.info('DEBUG: server module imported');
  })
  .catch((err) => {
    logger.error('DEBUG: failed to import server %o', err && err.stack ? err.stack : err);
  });
