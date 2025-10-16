// start.js - bootstrap to capture unexpected process.exit calls and global errors
const origExit = process.exit;
process.exit = function(code = 0) {
  try {
    // log stack where exit was called
    const err = new Error('DEBUG: process.exit intercepted');
    console.error('DEBUG: process.exit called with code=', code);
    console.error(err.stack);
  } catch (e) {
    console.error('DEBUG: failed to log process.exit stack', e);
  }
  return origExit(code);
};

process.on('exit', (code) => {
  console.log('DEBUG: process.exit event, code =', code);
});
process.on('uncaughtException', (err) => {
  console.error('DEBUG: uncaughtException', err && err.stack ? err.stack : err);
});
process.on('unhandledRejection', (reason) => {
  console.error('DEBUG: unhandledRejection', reason && reason.stack ? reason.stack : reason);
});

// Import server after hooks are in place
import('./server.js').then(() => {
  console.log('DEBUG: server imported from start.js');
}).catch((err) => {
  console.error('DEBUG: error importing server.js', err && err.stack ? err.stack : err);
});
