import http from 'http';
import fetch from 'node-fetch';
import { spawn } from 'child_process';
import path from 'path';

const serverPath = path.resolve(process.cwd(), 'server.js');

let serverProcess;

beforeAll(async () => {
  jest.setTimeout(20000);
  serverProcess = spawn('node', [serverPath], { stdio: 'inherit' });

  // Wait for the health endpoint to become available (timeout after 5s)
  const start = Date.now();
  const timeout = 5000;
  while (Date.now() - start < timeout) {
    try {
      const res = await fetch('http://localhost:5050/health');
      if (res.ok) return;
    } catch (e) {
      // ignore and retry
    }
    await new Promise((r) => setTimeout(r, 200));
  }
  throw new Error('Server did not start within timeout');
});

afterAll(() => {
  if (serverProcess) serverProcess.kill();
});

test('GET /health returns 200 and JSON', async () => {
  const res = await fetch('http://localhost:5050/health');
  const body = await res.json();
  expect(res.status).toBe(200);
  expect(body).toHaveProperty('status', 'ok');
  expect(body).toHaveProperty('dbConnected');
});
