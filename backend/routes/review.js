const express = require('express');
const { createReview, getReviewsByTravel } = require('../controllers/reviewController');
const authenticateUser = require('../middleware/authenticateUser');

const router = express.Router();

// Route for creating a review. It requires authentication
router.post('/', authenticateUser, createReview); // Create a review
router.get('/:id', getReviewsByTravel); // Get all reviews for a specific travel by ID

module.exports = router;
