const AdminRequest = require("../models/AdminRequest");
const User = require("../models/user");
const sendEmail = require("../utils/sendEmail");

// 🟢 Request Admin
exports.requestAdmin = async (req, res) => {
  try {
    const userId = req.user.id;

    // user find
    const user = await User.findById(userId);
    if (!user) {
      return res.json({ message: "User not found" });
    }

    // check existing request
    let existing = await AdminRequest.findOne({ userId });

    if (existing) {
      existing.status = "pending";
      await existing.save();

      // 📧 mail bhej
      await sendEmail(
        "mobilemunjal@gmail.com",
        "Admin Access Request",
        `User ${user.email} requested admin access again`
      );

      return res.json({ message: "Request resent" });
    }

    // new request
    const request = new AdminRequest({ userId });
    await request.save();

    // 📧 mail bhej
    await sendEmail(
      "munjalrohit@gmail.com",
      "Admin Access Request",
      `User ${user.email} requested admin access`
    );

    res.json({ message: "Admin request sent" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};


// 🔥 Approve Admin
exports.approveAdmin = async (req, res) => {
  try {
    const { requestId } = req.body;

    const request = await AdminRequest.findById(requestId);

    if (!request) {
      return res.json({ message: "Request not found" });
    }

    // user ko admin bana
    await User.findByIdAndUpdate(request.userId, {
      role: "admin"
    });

    request.status = "approved";
    await request.save();

    res.json({ message: "User promoted to admin" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};