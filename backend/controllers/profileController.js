const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Utility function for error response
const errorResponse = (res, statusCode, message) => res.status(statusCode).json({ message });

// Get user profile
const getProfile = async (req, res) => {
  try {
    // Extract token from Authorization header
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return errorResponse(res, 401, 'Unauthorized. No token provided.');

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user by ID from the decoded token
    const user = await User.findById(decoded.id).select('-password'); // Exclude password field
    if (!user) return errorResponse(res, 404, 'User not found.');

    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching profile data:', error);
    errorResponse(res, 500, 'Error fetching profile data.');
  }
};

// Update user profile
const updateProfile = async (req, res) => {
  try {
    const { name, email, profileInfo } = req.body;

    // Find the user by ID from the token middleware
    const user = await User.findById(req.user.id);
    if (!user) return errorResponse(res, 404, 'User not found.');

    // Update user details
    if (name) user.name = name;
    if (email) user.email = email;
    if (profileInfo) {
      user.profileInfo = {
        ...user.profileInfo,
        ...profileInfo, // Merge profileInfo fields
      };
    }

    // Save updated user
    await user.save();

    res.status(200).json({
      message: 'Profile updated successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        profileInfo: user.profileInfo,
      },
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    errorResponse(res, 500, 'Error updating profile.');
  }
};

module.exports = { getProfile, updateProfile };
