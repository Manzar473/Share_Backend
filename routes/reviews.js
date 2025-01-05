const express = require("express");
const {
  createReview,
  deleteReview,
  getReviewsByUserFor,
  updateReview,
} = require("../controllers/reviewController");
const authenticateToken = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authenticateToken, createReview); // Create review
router.get("/user/:userId", authenticateToken, getReviewsByUserFor); // Get reviews for a user
router.delete("/:reviewId", authenticateToken, deleteReview); // Delete a review
router.put("/:reviewId", authenticateToken, updateReview); // Update a review

module.exports = router;
