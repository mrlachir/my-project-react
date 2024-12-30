const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const travelRoutes = require('./routes/travel');
const reviewRoutes = require('./routes/review'); // Add this line
const bookingRoutes = require('./routes/booking'); // add booking routes here
// server.js
const profileRoutes = require('./routes/profile'); // add profile routes here
dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/travels', travelRoutes);
app.use('/reviews', reviewRoutes); // Add this line to handle reviews
app.use('/bookings', bookingRoutes); // add the booking routes
app.use('/profile', profileRoutes); // add profile routes

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
  .catch((err) => console.error(err));
