const express = require('express');
const { updateProfile } = require('../controllers/profileController');
const authenticateUser = require('../middleware/authenticateUser');

const router = express.Router();

// Route to update the user profile
router.patch('/', authenticateUser, updateProfile);

module.exports = router;
