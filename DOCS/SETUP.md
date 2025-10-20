# 🚀 Setup Guide for Thuggatunes Music & Global Payment

This guide will help you set up the Thuggatunes Music & Global Payment system on your local machine.

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14 or higher recommended)
- **npm** (comes with Node.js)
- **Git**
- **MongoDB** (optional for development)

## Quick Setup (Recommended)

Follow these steps to get the project running quickly:

### 1. Clone the Repository

```bash
git clone https://github.com/thuggathunder-lang/thuggatunes-music-global-payment.git
cd thuggatunes-music-global-payment
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required dependencies and set up Git hooks via Husky.

### 3. Configure Environment Variables

Create a `.env` file from the example template:

```bash
cp .env.example .env
```

Edit the `.env` file with your configuration. For development without MongoDB:

```env
NODE_ENV=development
PORT=5050
# MONGO_URI=mongodb://127.0.0.1:27017/thuggatunes  # Comment out if MongoDB not available
PAYSTACK_SECRET_KEY=sk_test_your_paystack_key
BASE_URL=https://api.paystack.co
LOG_LEVEL=info
```

**Note:** The `MONGO_URI` is optional for development. If not set, the server will run without database connectivity, which is fine for testing the basic functionality.

### 4. Run Tests

Verify the installation by running the test suite:

```bash
npm test
```

You should see output similar to:
```
Test Suites: 3 passed, 3 total
Tests:       5 passed, 5 total
```

### 5. Start the Server

Start the development server:

```bash
npm start
```

You should see:
```
⚠️  MONGO_URI not set — skipping MongoDB connection (development mode)
✅ Server running on port 5050
```

### 6. Verify Server is Running

Open your browser or use curl to check the health endpoint:

```bash
curl http://localhost:5050/health
```

Expected response:
```json
{"status":"ok","dbConnected":false}
```

## Advanced Setup

### Setting up MongoDB (Optional)

If you want to use MongoDB:

1. Install MongoDB locally or use a cloud service like MongoDB Atlas
2. Update your `.env` file:
   ```env
   MONGO_URI=mongodb://127.0.0.1:27017/thuggatunes
   ```
3. Restart the server

### Payment Integration Setup

To enable payment features:

1. **Paystack**: Get your API keys from [Paystack Dashboard](https://dashboard.paystack.com/)
2. Update `.env`:
   ```env
   PAYSTACK_SECRET_KEY=sk_test_your_actual_key
   ```

## Available Scripts

- `npm start` - Start the production server
- `npm test` - Run the test suite
- `npm run check:secrets` - Check for exposed secrets in the code

## Troubleshooting

### Issue: MongoDB Connection Error

**Solution:** If you see MongoDB connection errors but tests pass, this is normal. The application is designed to run without MongoDB for development. Either:
- Comment out `MONGO_URI` in your `.env` file, or
- Install and start MongoDB locally

### Issue: Port Already in Use

**Solution:** If port 5050 is already in use, change the `PORT` in your `.env` file:
```env
PORT=3000
```

### Issue: Dependencies Installation Fails

**Solution:** Try:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Issue: Tests Hang or Don't Exit

**Solution:** This is a known issue with Jest and async operations. The tests are passing correctly. You can safely press Ctrl+C to exit.

## Next Steps

1. Review the API documentation in the DOCS folder
2. Configure additional payment providers if needed
3. Set up CI/CD secrets (see `DOCS/CI_SECRETS.md`)
4. Review security best practices in the codebase

## Support

For issues or questions:
- Open an issue on GitHub
- Contact: Awosiji Wonderful Isaac (Wonder Thunder)
- Instagram: https://instagram.com/thuggatunes

---

**Note:** Always keep your `.env` file private and never commit it to version control. The `.gitignore` file is already configured to exclude it.
