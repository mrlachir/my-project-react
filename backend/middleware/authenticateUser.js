// // middleware/authenticateUser.js

// const jwt = require('jsonwebtoken');

// const authenticateUser = (req, res, next) => {
//   // Getting the token from the Authorization header
//   const token = req.header('Authorization')?.replace('Bearer ', ''); // Remove 'Bearer ' prefix
  
//   if (!token) {
//     return res.status(401).json({ message: 'No token, authorization denied' });
//   }

//   try {
//     // Verifying the token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     // Attaching the user data to the request object
//     req.user = decoded;
//     next();
//   } catch (err) {
//     return res.status(401).json({ message: 'Token is not valid' });
//   }
// };

// module.exports = authenticateUser;
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authenticateUser = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ message: 'Authorization token is missing' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id); // Attach the user to the request object

    if (!req.user) {
      return res.status(404).json({ message: 'User not found' });
    }

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = authenticateUser;
