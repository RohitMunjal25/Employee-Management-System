const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");

// REGISTER
exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  let user = await User.findOne({ email });
  if (user) return res.json({ message: "User already exists" });

  const hashedPassword = await bcrypt.hash(password, 10);

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  user = new User({
    name,
    email,
    password: hashedPassword,
    otp,
    otpExpiry: Date.now() + 5 * 60 * 1000
  });

  await user.save();

  // 🔥 FIXED EMAIL
  await sendEmail(
    email,
    "OTP Verification",
    `Your OTP is ${otp}`
  );

  res.json({ message: "OTP sent" });
};


// VERIFY OTP
exports.verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.json({ message: "User not found" });

  if (user.otp === otp && user.otpExpiry > Date.now()) {
    user.isVerified = true;
    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    res.json({ message: "Verified successfully" });
  } else {
    res.json({ message: "Invalid OTP" });
  }
};


// LOGIN
exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.json({ message: "User not found" });

  if (!user.isVerified) {
    return res.json({ message: "Verify email first" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.json({ message: "Wrong Password" });

  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({ token });
};


// FORGOT PASSWORD
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.json({ message: "User not found" });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  user.resetOtp = otp;
  user.resetOtpExpiry = Date.now() + 5 * 60 * 1000;

  await user.save();

  // 🔥 FIXED EMAIL
  await sendEmail(
    email,
    "Reset Password OTP",
    `Your OTP is ${otp}`
  );

  res.json({ message: "Reset OTP sent" });
};


// RESET PASSWORD
exports.resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.json({ message: "User not found" });

  if (user.resetOtp === otp && user.resetOtpExpiry > Date.now()) {
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    user.resetOtp = null;
    user.resetOtpExpiry = null;

    await user.save();

    res.json({ message: "Password reset successful" });
  } else {
    res.json({ message: "Invalid or expired OTP" });
  }
};