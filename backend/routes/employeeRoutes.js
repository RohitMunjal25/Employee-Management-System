const express = require("express");
const router = express.Router();

const employeeController = require("../controllers/employeeController");
const authMiddleware = require("../middleware/authmiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const upload = require("../utils/multer");

// ADD EMPLOYEE (ADMIN ONLY)
router.post(
  "/add",
  authMiddleware,
  adminMiddleware,
  upload.single("profilePic"),
  employeeController.addEmployee
);

// GET ALL
router.get("/", authMiddleware, employeeController.getEmployees);

module.exports = router;