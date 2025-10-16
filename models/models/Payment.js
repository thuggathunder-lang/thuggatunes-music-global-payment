const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  currency: { type: String, required: true },
  paymentId: { type: String, required: true },
  status: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Payment", paymentSchema);
