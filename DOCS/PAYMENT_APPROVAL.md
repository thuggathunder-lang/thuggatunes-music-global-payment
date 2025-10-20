# Payment Approval API

## Overview

The Payment Approval API allows administrators and systems to approve payment transactions in the Thuggatunes Music & Global Payment platform.

## Endpoint

### Approve a Payment

**POST** `/api/payments/approve`

Approves a payment transaction by its transaction ID.

#### Request Body

```json
{
  "transactionId": "string (required)",
  "approvedBy": "string (optional)"
}
```

**Parameters:**
- `transactionId` (required): The unique identifier of the transaction to approve
- `approvedBy` (optional): Email or identifier of the person approving the payment. Defaults to "system" if not provided.

#### Success Response

**Code:** 200 OK

```json
{
  "success": true,
  "message": "Payment approved successfully",
  "data": {
    "transactionId": "txn-12345",
    "approved": true,
    "approvedAt": "2025-10-20T05:42:03.140Z",
    "approvedBy": "admin@thuggatunes.com",
    "status": "approved"
  }
}
```

#### Error Response

**Code:** 400 Bad Request

```json
{
  "success": false,
  "message": "Transaction ID is required"
}
```

**Code:** 500 Internal Server Error

```json
{
  "success": false,
  "message": "Payment approval failed"
}
```

## Usage Examples

### Using cURL

```bash
# Approve with specific approver
curl -X POST http://localhost:5050/api/payments/approve \
  -H "Content-Type: application/json" \
  -d '{"transactionId": "txn-12345", "approvedBy": "admin@thuggatunes.com"}'

# Approve with default system approver
curl -X POST http://localhost:5050/api/payments/approve \
  -H "Content-Type: application/json" \
  -d '{"transactionId": "txn-12345"}'
```

### Using JavaScript/Node.js

```javascript
const response = await fetch('http://localhost:5050/api/payments/approve', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    transactionId: 'txn-12345',
    approvedBy: 'admin@thuggatunes.com'
  })
});

const result = await response.json();
console.log(result);
```

## Database Schema

The Transaction model has been updated to include approval fields:

```javascript
{
  amount: Number,
  currency: String,
  paymentIntentId: String,
  status: String,
  approved: { type: Boolean, default: false },
  approvedAt: { type: Date },
  approvedBy: { type: String },
  createdAt: { type: Date, default: Date.now }
}
```

## Testing

Automated tests are available in `test/approval.test.js`. Run the test suite with:

```bash
npm test
```

Tests cover:
- ✅ Successful approval with specified approver
- ✅ Validation error when transactionId is missing
- ✅ Default "system" approver when not specified
