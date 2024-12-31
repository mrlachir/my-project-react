const express = require('express');
const { updateProfile, getProfile, updatePassword } = require('../controllers/profileController');
const authenticateUser = require('../middleware/authenticateUser');

const router = express.Router();

router.get('/', authenticateUser, getProfile);
router.patch('/', authenticateUser, updateProfile);
router.patch('/password', authenticateUser, updatePassword); // Ensure this route exists

module.exports = router;
