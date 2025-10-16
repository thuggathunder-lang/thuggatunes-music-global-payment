import http from 'http';
import fetch from 'node-fetch';
import { startServer } from '../server.js';

let server;
beforeAll(async () => {
  server = await startServer(5050);
}, 20000);

afterAll(async () => {
  if (server) await new Promise((r) => server.close(r));
});

test('GET /health returns 200 and JSON', async () => {
  const res = await fetch('http://localhost:5050/health');
  const body = await res.json();
  expect(res.status).toBe(200);
  expect(body).toHaveProperty('status', 'ok');
  expect(body).toHaveProperty('dbConnected');
});
