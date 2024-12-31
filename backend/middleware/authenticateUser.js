const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authenticateUser = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    console.error('Authorization token is missing');
    return res.status(401).json({ message: 'Authorization token is missing' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded Token:', decoded);

    // Fetch the user by ID
    req.user = await User.findById(decoded.id).select('-password'); // Exclude the password from user data
    console.log('User Retrieved:', req.user);

    if (!req.user) {
      console.error('User not found');
      return res.status(404).json({ message: 'User not found' });
    }

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error('Token verification failed:', error.message);
    return res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = authenticateUser;
