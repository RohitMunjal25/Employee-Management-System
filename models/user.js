const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: {
    type: String,
    enum:["admin","employee"],
    default: "employee"
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  otp: String,
  otpExpiry: Date,
  resetOtp: String,
  resetOtpExpiry: Date
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);