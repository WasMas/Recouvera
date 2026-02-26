const mongoose = require("mongoose");
const roleEnum = require("../shared/enums/roles");

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  roles: {
    type: String,
    enum: Object.values(roleEnum),
    default: roleEnum.USER,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model("users", userSchema);