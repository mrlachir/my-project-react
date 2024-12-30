// routes/profile.js
const express = require('express');
const router = express.Router();
const { updateProfile } = require('../controllers/profileController');
const authMiddleware = require('../middleware/authenticateUser'); // assuming you have authentication middleware

// Update user profile info (PUT /profile)
router.put('/', authMiddleware, updateProfile);

module.exports = router;
