const mongoose = require("mongoose");

// Define the product schema
const reviewSchema = new mongoose.Schema(
  {
    reviewBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    reviewFor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
  },
  { timestamps: true }
);

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
