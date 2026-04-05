const express = require("express");
const router = express.Router();

const adminController = require("../controllers/adminController");

const authMiddleware = require("../middleware/authmiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
console.log("authMiddleware:", authMiddleware);
console.log("adminMiddleware:", adminMiddleware);
console.log("controller:", adminController);

// request admin
router.post(
  "/request-admin",
  authMiddleware,
  adminController.requestAdmin
);

// approve (only admin)
router.post(
  "/approve-admin",
  authMiddleware,
  adminMiddleware,
  adminController.approveAdmin
);

module.exports = router;