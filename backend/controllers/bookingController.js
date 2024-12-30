const Booking = require('../models/Booking');
const Travel = require('../models/Travel');

// Function to create a booking
const createBooking = async (req, res) => {
  try {
    const { travelId, numberOfPeople, bookingDate } = req.body;

    // Check if travel exists
    const travel = await Travel.findById(travelId);
    if (!travel) {
      return res.status(404).json({ message: 'Travel not found' });
    }

    // Create a new booking
    const booking = new Booking({
      user: req.user.id, // User ID from JWT
      travel: travelId,
      numberOfPeople,
      bookingDate,
    });

    // Save the booking
    await booking.save();

    return res.status(201).json({
      message: 'Booking created successfully',
      booking,
    });
  } catch (err) {
    return res.status(500).json({ message: 'Error creating booking', error: err.message });
  }
};

// Function to get all bookings for the logged-in user
const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).populate('travel', 'name');

    return res.status(200).json({ bookings });
  } catch (err) {
    return res.status(500).json({ message: 'Error fetching bookings', error: err.message });
  }
};

// Function to update booking status (Cancelled, etc.)
const updateBookingStatus = async (req, res) => {
  try {
    const { bookingId } = req.params; // Get the booking ID from URL
    const { status } = req.body; // Get the status from the body

    // Check if the status is provided and valid
    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    // Find the booking by ID
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Update the status of the booking
    booking.status = status;

    // Save the updated booking
    await booking.save();

    return res.status(200).json({
      userId: booking.user,
      travelId: booking.travel,
      status: booking.status,
      totalPrice: booking.totalPrice
    });

  } catch (err) {
    return res.status(500).json({ message: 'Error updating booking status', error: err.message });
  }
};

module.exports = { createBooking, getUserBookings, updateBookingStatus };  // Ensure all functions are exported
