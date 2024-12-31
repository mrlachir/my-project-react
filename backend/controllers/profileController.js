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


const bcrypt = require('bcryptjs');

const updatePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    console.error('Missing old or new password.');
    return res.status(400).json({ message: 'Both old and new passwords are required.' });
  }

  try {
    console.log('User ID:', req.user.id); // Log user ID from the middleware
    const user = await User.findById(req.user.id);
    if (!user) {
      console.error('User not found:', req.user.id);
      return res.status(404).json({ message: 'User not found.' });
    }

    console.log('Old Password:', oldPassword); // Log old password
    console.log('Stored Password (hashed):', user.password); // Log stored password

    // Verify old password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    console.log('Password Match:', isMatch);
    if (!isMatch) {
      console.error('Old password does not match for user:', req.user.id);
      return res.status(401).json({ message: 'Old password is incorrect.' });
    }

    // Hash and update new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    console.log('New Hashed Password:', hashedPassword);
    user.password = hashedPassword;
    await user.save();

    console.log('Password updated successfully for user:', req.user.id);
    res.status(200).json({ message: 'Password updated successfully.' });
  } catch (error) {
    console.error('Error updating password:', error.message); // Log detailed error
    res.status(500).json({ message: 'Error updating password.' });
  }
};


module.exports = { getProfile, updateProfile, updatePassword };
