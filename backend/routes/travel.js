const express = require('express');
const {
  createTravel,
  getAllTravels,
  getTravelById,
  updateTravel,
  deleteTravel,
  getRecommendedTravels,
  getUserTravels, // Import the new controller function
} = require('../controllers/travelController');

const authenticateUser = require('../middleware/authenticateUser'); // Ensure the user is authenticated
const upload = require('../middleware/upload'); // Import multer configuration

const router = express.Router();

router.post('/', authenticateUser, createTravel); // Create a travel
router.post('/', authenticateUser, upload.single('image'), createTravel); // Add upload middleware

router.get('/', getAllTravels); // Get all travels (with search and filter)
router.get('/owntravels', authenticateUser, getUserTravels); // Get user-specific travels
// router.get('/owntravels', authenticateUser, getUserTravels); // Fetch user-specific travels

router.get('/:id', getTravelById); // Get a specific travel by ID
router.put('/:id', authenticateUser, updateTravel); // Update a travel by ID
router.delete('/:id', authenticateUser, deleteTravel); // Delete a travel by ID
router.get('/recommended', getRecommendedTravels); // Fetch recommended travels

module.exports = router;
