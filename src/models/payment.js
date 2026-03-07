const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
{
  invoice: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "invoices",
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  method: {
    type: String,
    default: "manual"
  },
  note: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
},
{ timestamps: true }
);

module.exports = mongoose.model("payments", paymentSchema);