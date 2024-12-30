const Review = require('../models/Review');
const Travel = require('../models/Travel');

const createReview = async (req, res) => {
  try {
    const { travelId, rating, comment } = req.body;

    // Check if the travel exists
    const travel = await Travel.findById(travelId);
    if (!travel) {
      return res.status(404).json({ message: 'Travel not found' });
    }

    // Create a new review
    const review = new Review({
      user: req.user.id, // The user ID from the JWT token (authenticated user)
      travel: travelId,  // The travel ID passed in the request body
      rating,
      comment,
    });

    // Save the review
    await review.save();

    // Add the review to the travel document's reviews array
    travel.reviews.push(review._id); // Push the new review ID into the reviews array
    await travel.save(); // Save the updated travel document

    return res.status(201).json({
      message: 'Review created successfully',
      review,
    });
  } catch (err) {
    return res.status(500).json({ message: 'Error creating review', error: err.message });
  }
};

const getReviewsByTravel = async (req, res) => {
  try {
    const travelId = req.params.id;
    const reviews = await Review.find({ travel: travelId }).populate('user', 'name');

    return res.status(200).json({ reviews });
  } catch (err) {
    return res.status(500).json({ message: 'Error fetching reviews', error: err.message });
  }
};

module.exports = { createReview, getReviewsByTravel };
