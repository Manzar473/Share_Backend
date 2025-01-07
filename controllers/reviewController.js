const Review = require("../models/review");

const createReview = async (req, res) => {
    const { reviewFor, message, rating } = req.body;

    try {
        const newReview = new Review({
            reviewBy: req.user.id, // Extracted from middleware
            reviewFor,
            message,
            rating
        });
        const savedReview = await newReview.save();
        res.status(201).json({ message: 'Review has been submitted!', review: savedReview });
    } catch (error) {
        res.status(500).json({ message: 'Error while submitting review', error: error.message });
    }
};

const getReviewsByUserFor = async (req, res) => {
    const { userId } = req.params;

    try {
        const reviews = await Review.find({ reviewFor: userId })
            .populate('reviewBy', 'username email area contact city image')
            .sort({ createdAt: -1 });
        res.status(200).json({ message: 'Reviews fetched successfully.', reviews });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching reviews.', error: error.message });
    }
};

const deleteReview = async (req, res) => {
    const { reviewId } = req.params;

    try {
        await Review.findByIdAndDelete(reviewId);
        res.status(200).json({ message: 'Review deleted successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting review.', error: error.message });
    }
};

const updateReview = async (req, res) => {
    const { reviewId } = req.params;
    const { message, rating } = req.body;

    try {
        const updatedReview = await Review.findByIdAndUpdate(
            reviewId,
            { message, rating },
            { new: true } // Return the updated document
        );
        res.status(200).json({ message: 'Review updated successfully.', review: updatedReview });
    } catch (error) {
        res.status(500).json({ message: 'Error updating review.', error: error.message });
    }
};


module.exports = {
    createReview,
    getReviewsByUserFor,
    deleteReview,
    updateReview
}
