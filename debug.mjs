// debug.mjs - import server and log process exit/uncaughtException for diagnosis

process.on('exit', (code) => {
  console.log('DEBUG: process.exit event, code =', code);
});
process.on('uncaughtException', (err) => {
  console.error('DEBUG: uncaughtException', err && err.stack ? err.stack : err);
  // Do not exit here so we can see stack
});
process.on('unhandledRejection', (reason) => {
  console.error('DEBUG: unhandledRejection', reason && reason.stack ? reason.stack : reason);
});

import('./server.js').then((mod) => {
  console.log('DEBUG: server module imported');
}).catch((err) => {
  console.error('DEBUG: failed to import server', err && err.stack ? err.stack : err);
});
