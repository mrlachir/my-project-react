const express = require('express'); // Import Express framework for building server
const mongoose = require('mongoose'); // Import Mongoose to interact with MongoDB
const cors = require('cors'); // Import CORS to handle cross-origin requests
const dotenv = require('dotenv'); // Import dotenv to manage environment variables
const bodyParser = require('body-parser'); // Import body-parser to parse incoming request bodies

// Importing route files
const authRoutes = require('./routes/auth'); // Routes for authentication (login/register)
const travelRoutes = require('./routes/travel'); // Routes for travel packages
const reviewRoutes = require('./routes/review'); // Routes for reviews
const bookingRoutes = require('./routes/booking'); // Routes for bookings
const profileRoutes = require('./routes/profile'); // Routes for user profiles

dotenv.config(); // Load environment variables from .env file

const app = express(); // Initialize the Express application
app.use(cors()); // Enable CORS for all incoming requests
app.use(bodyParser.json()); // Parse JSON bodies in incoming requests

// Mounting routes
app.use('/auth', authRoutes); // Routes for authentication (e.g., /auth/register, /auth/login)
app.use('/travels', travelRoutes); // Routes for travel package operations (e.g., /travels)
app.use('/reviews', reviewRoutes); // Routes for handling reviews (e.g., /reviews)
app.use('/bookings', bookingRoutes); // Routes for managing bookings (e.g., /bookings)
app.use('/profile', profileRoutes); // Routes for user profile management (e.g., /profile)

const PORT = process.env.PORT || 5000; // Use PORT from .env or default to 5000

// Connect to MongoDB using the MONGO_URI from .env
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => 
    // Start the server only after successfully connecting to the database
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  )
  .catch((err) => console.error(err)); // Log any connection errors
