// keepalive.mjs - import server and keep process alive to test server behavior
import logger from './lib/logger.js';

import('./server.js')
  .then(() => {
    logger.info('KEEPALIVE: server imported');
    setInterval(() => {
      // keep the event loop busy
    }, 1000 * 60 * 60);
  })
  .catch((err) => {
    logger.error('KEEPALIVE: failed to import server %o', err && err.stack ? err.stack : err);
  });
