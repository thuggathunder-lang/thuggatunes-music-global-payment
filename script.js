const stripe = Stripe("pk_test_51SFihWF4I0lE5UsxHo8qJxFh..."); // Replace with your Stripe publishable key

document.getElementById("payBtn").addEventListener("click", async () => {
  const amount = document.getElementById("amount").value * 100;

  const res = await fetch("/api/create-payment-intent", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount }),
  });

  const data = await res.json();
  const clientSecret = data.clientSecret;

  const result = await stripe.confirmCardPayment(clientSecret, {
    payment_method: {
      card: { token: "tok_visa" }, // Use a real card element in production
    },
  });

  if (result.error) {
    document.getElementById("status").innerText = "❌ Payment failed: " + result.error.message;
  } else {
    if (result.paymentIntent.status === "succeeded") {
      document.getElementById("status").innerText = "✅ Payment successful!";
      await fetch("/api/confirm-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          paymentIntentId: result.paymentIntent.id,
          status: "succeeded",
        }),
      });
    }
  }
});
