import { startServer, gracefulShutdown } from '../server.js';

describe('graceful shutdown', () => {
  let server;
  test('start and shutdown server', async () => {
    server = await startServer(0);
    expect(server).toBeDefined();
    await gracefulShutdown(0);
  }, 10000);
});

describe('listen error', () => {
  test('startServer rejects if port already in use', async () => {
    const s = await startServer(0);
    const port = s.address().port;
    let error;
    try {
      await startServer(port);
    } catch (err) {
      error = err;
    } finally {
      await gracefulShutdown(0);
    }
    expect(error).toBeDefined();
  }, 10000);
});
