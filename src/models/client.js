const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema(
{
  name: {
    type: String,
    required: true
  },
  email: {
    type: String
  },
  phone: {
    type: String
  },
  address: {
    type: String
  },
  company: {
    type: String
  }
},
{ timestamps: true }
);

module.exports = mongoose.model("clients", clientSchema);