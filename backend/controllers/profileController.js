// controllers/profileController.js
const User = require('../models/User');

const updateProfile = async (req, res) => {
  try {
    // Fetch the user from the database using the decoded ID from the JWT
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update the user details
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    
    // Save the updated user information
    await user.save();

    return res.status(200).json({
      message: 'Profile updated successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (err) {
    return res.status(500).json({ message: 'Error updating profile', error: err.message });
  }
};

module.exports = { updateProfile };
