const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  name: String,
  email: String,
  department: String,
  salary: Number,

  profilePic: String,

  workingHours: {
    start: String,
    end: String
  }

}, { timestamps: true });

module.exports = mongoose.model("Employee", employeeSchema);