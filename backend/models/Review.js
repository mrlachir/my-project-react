const mongoose = require('mongoose');

// Define the review schema
const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  },
  travel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Travel', // Reference to the Travel model
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
    required: true,
  },
}, { timestamps: true });

// Create the review model
const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
