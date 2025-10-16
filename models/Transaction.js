import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  amount: Number,
  currency: String,
  paymentIntentId: String,
  status: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Transaction", transactionSchema);