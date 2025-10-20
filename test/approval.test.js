import fetch from 'node-fetch';
import { startServer } from '../server.js';

let server;
beforeAll(async () => {
  server = await startServer(5051);
}, 20000);

afterAll(async () => {
  if (server) await new Promise((r) => server.close(r));
});

describe('Payment Approval API', () => {
  test('POST /api/payments/approve should approve a payment with transactionId', async () => {
    const response = await fetch('http://localhost:5051/api/payments/approve', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        transactionId: 'test-transaction-123',
        approvedBy: 'admin@thuggatunes.com'
      })
    });

    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.success).toBe(true);
    expect(body.message).toBe('Payment approved successfully');
    expect(body.data.transactionId).toBe('test-transaction-123');
    expect(body.data.approved).toBe(true);
    expect(body.data.approvedBy).toBe('admin@thuggatunes.com');
    expect(body.data.status).toBe('approved');
  });

  test('POST /api/payments/approve should fail without transactionId', async () => {
    const response = await fetch('http://localhost:5051/api/payments/approve', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ approvedBy: 'admin@thuggatunes.com' })
    });

    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.success).toBe(false);
    expect(body.message).toBe('Transaction ID is required');
  });

  test('POST /api/payments/approve should use default approver when not provided', async () => {
    const response = await fetch('http://localhost:5051/api/payments/approve', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ transactionId: 'test-transaction-456' })
    });

    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.success).toBe(true);
    expect(body.data.approvedBy).toBe('system');
  });
});

