const express = require('express');
const {
  createTravel,
  getOwnTravels,
  updateTravel,
  deleteTravel,
} = require('../controllers/travelController');
const authenticateUser = require('../middleware/authenticateUser');

const router = express.Router();

router.get('/', authenticateUser, getOwnTravels); // Fetch user's own travels
router.post('/', authenticateUser, createTravel); // Create a new travel
router.put('/:id', authenticateUser, updateTravel); // Update user's travel
router.delete('/:id', authenticateUser, deleteTravel); // Delete user's travel

module.exports = router;
