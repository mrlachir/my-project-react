const mongoose = require('mongoose');

// Define the schema for the Booking model
const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model
      required: true,
    },
    travel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Travel', // Reference to the Travel model
      required: true,
    },
    numberOfPeople: {
      type: Number,
      required: true,
    },
    bookingDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ['Pending', 'Confirmed', 'Cancelled'], // Possible statuses
      default: 'Pending', // Default status when booking is created
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
  }
);

// Create and export the Booking model
const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;
