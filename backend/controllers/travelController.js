const Travel = require('../models/Travel');

// Create a travel
const createTravel = async (req, res) => {
  const { name, description, price, availableDates } = req.body;

  if (!name || !description || !price || !availableDates || availableDates.length === 0) {
    return res.status(400).json({ message: 'Name, description, price, and availableDates are required.' });
  }

  try {
    const newTravel = new Travel({
      name,
      description,
      price,
      availableDates,
    });
    await newTravel.save();
    return res.status(201).json(newTravel);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Get all travels
const getAllTravels = async (req, res) => {
  try {
    const travels = await Travel.find();
    return res.status(200).json(travels);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Get travel by ID
const getTravelById = async (req, res) => {
  const { id } = req.params;
  try {
    const travel = await Travel.findById(id);
    if (!travel) {
      return res.status(404).json({ message: 'Travel not found' });
    }
    return res.status(200).json(travel);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Update a travel by ID
const updateTravel = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, availableDates } = req.body;

  try {
    const updatedTravel = await Travel.findByIdAndUpdate(
      id,
      { name, description, price, availableDates },
      { new: true }
    );
    if (!updatedTravel) {
      return res.status(404).json({ message: 'Travel not found' });
    }
    return res.status(200).json(updatedTravel);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Delete a travel by ID
const deleteTravel = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTravel = await Travel.findByIdAndDelete(id);
    if (!deletedTravel) {
      return res.status(404).json({ message: 'Travel not found' });
    }
    return res.status(200).json({ message: 'Travel deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createTravel,
  getAllTravels,
  getTravelById,
  updateTravel,
  deleteTravel,
};
