const Review = require('../models/Review');
const Travel = require('../models/Travel');

// Create a new review
const createReview = async (req, res) => {
  try {
    const { travelId, rating, comment } = req.body;

    // Check if the travel exists
    const travel = await Travel.findById(travelId);
    if (!travel) {
      return res.status(404).json({ message: 'Travel not found' });
    }

    // Create the review
    const review = new Review({
      user: req.user.id,  // Assuming user ID is from the authenticated JWT token
      travel: travelId,
      rating,
      comment,
    });

    // Save the review
    await review.save();

    // Add the review to the travel's reviews array
    travel.reviews.push(review._id);
    await travel.save();

    return res.status(201).json({
      message: 'Review created successfully',
      review,
    });
  } catch (err) {
    return res.status(500).json({ message: 'Error creating review', error: err.message });
  }
};

// Get all reviews for a specific travel
const getReviewsByTravel = async (req, res) => {
  try {
    const travelId = req.params.id;
    const reviews = await Review.find({ travel: travelId }).populate('user', 'name'); // Populate user info

    return res.status(200).json({ reviews });
  } catch (err) {
    return res.status(500).json({ message: 'Error fetching reviews', error: err.message });
  }
};

module.exports = { createReview, getReviewsByTravel };
