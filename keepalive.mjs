// keepalive.mjs - import server and keep process alive to test server behavior
import('./server.js').then(() => {
  console.log('KEEPALIVE: server imported');
  setInterval(() => {
    // keep the event loop busy
  }, 1000 * 60 * 60);
}).catch((err) => {
  console.error('KEEPALIVE: failed to import server', err && err.stack ? err.stack : err);
});
