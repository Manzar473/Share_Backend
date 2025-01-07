const express = require("express");
const {
  signup,
  login,
  getProfile,
  updateProfile,
  getAllUsers,
  toggleBlockStatus
} = require("../controllers/userController"); // Controller functions
const authenticateToken = require("../middleware/authMiddleware");
const upload = require("../multer");

const router = express.Router();

// Signup API
router.post("/signup", signup);

// Login API
router.post("/login", login);

router.post(
  "/update-profile",
  authenticateToken,
  upload.single("image"),
  updateProfile
);

router.get("/profile", authenticateToken, getProfile);
router.get("/all-users", authenticateToken, getAllUsers);
router.get("/block-status/:userId", authenticateToken, toggleBlockStatus);

module.exports = router;
