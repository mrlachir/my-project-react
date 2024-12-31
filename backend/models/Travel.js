const mongoose = require('mongoose');

const travelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  availableDates: [Date],
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Review', // Reference to the Review model
    },
  ],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  image: { type: String }, // New field for storing image URL or path
}, { timestamps: true });

const Travel = mongoose.model('Travel', travelSchema);

module.exports = Travel;
