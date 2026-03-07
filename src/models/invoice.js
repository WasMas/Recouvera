const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema(
{
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "clients",
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  dueDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ["pending", "partial", "paid", "overdue"],
    default: "pending"
  }
},
{ timestamps: true }
);

module.exports = mongoose.model("invoices", invoiceSchema);