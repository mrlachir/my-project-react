const express = require('express');
const {
  createTravel,
  getAllTravels,
  getTravelById,
  updateTravel,
  deleteTravel,
} = require('../controllers/travelController');

const router = express.Router();

router.post('/', createTravel); // Create a travel
router.get('/', getAllTravels); // Get all travels
router.get('/:id', getTravelById); // Get a specific travel by ID
router.put('/:id', updateTravel); // Update a travel by ID
router.delete('/:id', deleteTravel); // Delete a travel by ID

module.exports = router;
