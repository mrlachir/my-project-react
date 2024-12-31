const express = require('express');
const { getProfile, updateProfile } = require('../controllers/profileController');
const authenticateUser = require('../middleware/authenticateUser'); // Middleware for authentication

const router = express.Router();

// Get user profile (GET)
router.get('/', authenticateUser, getProfile);

// Update user profile (PATCH)
router.patch('/', authenticateUser, updateProfile);

module.exports = router;
