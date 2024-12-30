const express = require('express');
const { createBooking, getUserBookings, updateBookingStatus } = require('../controllers/bookingController'); // Ensure proper import
const authenticateUser = require('../middleware/authenticateUser'); // Authentication middleware

const router = express.Router();

// Route for creating a booking (POST)
router.post('/', authenticateUser, createBooking);

// Route for getting all bookings for the logged-in user (GET)
router.get('/', authenticateUser, getUserBookings);

// Route for updating the booking status (PATCH)
router.patch('/:bookingId', authenticateUser, updateBookingStatus);

module.exports = router;
