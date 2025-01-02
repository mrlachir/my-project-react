// Importing necessary modules
const jwt = require('jsonwebtoken'); // For verifying and decoding JWT tokens
const User = require('../models/User'); // User model to fetch user details from the database

// Middleware function to authenticate users
const authenticateUser = async (req, res, next) => {
  // Extract the token from the Authorization header and remove the 'Bearer ' prefix
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  // If no token is provided, return an unauthorized error response
  if (!token) {
    return res.status(401).json({ message: 'Authorization token is missing' });
  }

  try {
    // Verify the token using the secret key from the .env file
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user in the database using the ID from the decoded token
    req.user = await User.findById(decoded.id); 

    // If the user is not found in the database, return a not found error response
    if (!req.user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // If token and user are valid, proceed to the next middleware or route handler
    next();
  } catch (error) {
    // If there's an error in verifying the token, return an invalid token error response
    return res.status(401).json({ message: 'Invalid token' });
  }
};

// Export the middleware for use in other parts of the application
module.exports = authenticateUser;
