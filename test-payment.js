const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

async function testPayment() {
  try {
    const res = await fetch('http://localhost:5050/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: 2000, currency: 'usd' })
    });

    const data = await res.json();
    console.log('✅ Payment API Response:', data);
  } catch (err) {
    console.error('❌ Error testing payment:', err);
  }
}

testPayment();
