const mongoose = require('mongoose');

// Define the travel schema
const travelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  availableDates: [Date],
  reviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Review' // Reference to the Review model
  }]
}, { timestamps: true });

// Create the travel model
const Travel = mongoose.model('Travel', travelSchema);

module.exports = Travel;
