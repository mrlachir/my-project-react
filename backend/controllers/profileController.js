const User = require('../models/User');
const jwt = require('jsonwebtoken');

const getProfile = async (req, res) => {
  try {
    // Extract token from Authorization header
    const token = req.headers.authorization?.split(" ")[1]; // Extract token from 'Bearer token'

    if (!token) {
      console.error("No token provided.");
      return res.status(401).json({ message: "Unauthorized. No token provided." });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Token decoded:", decoded); // Check if the token decoding works

    // Find the user by ID from the decoded token
    const user = await User.findById(decoded.id).select("-password"); // Don't send the password back

    if (!user) {
      console.error("User not found.");
      return res.status(404).json({ message: "User not found." });
    }

    // Return the user profile data
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching profile data:", error); // Log detailed error
    res.status(500).json({ message: "Error fetching profile data." });
  }
};


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
        email: user.email,
      },
    });
  } catch (err) {
    return res.status(500).json({ message: 'Error updating profile', error: err.message });
  }
};

module.exports = { updateProfile,getProfile };
