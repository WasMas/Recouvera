const mongoose = require("mongoose");

const recoverySchema = new mongoose.Schema(
{
  invoice: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "invoices",
    required: true
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "clients",
    required: true
  },
  agent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true
  },
  type: {
    type: String,
    enum: ["call", "email", "letter", "visit", "legal"],
    required: true
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

module.exports = mongoose.model("recoveries", recoverySchema);