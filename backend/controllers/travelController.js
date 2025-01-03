const Travel = require('../models/Travel');

// Create a travel
// const createTravel = async (req, res) => {
//   const { name, description, price, availableDates } = req.body;

//   if (!name || !description || !price || !availableDates || availableDates.length === 0) {
//     return res.status(400).json({ message: 'Name, description, price, and availableDates are required.' });
//   }

//   try {
//     const newTravel = new Travel({
//       name,
//       description,
//       price,
//       availableDates,
//       createdBy: req.user.id, // Associate the travel with the logged-in user
//     });
//     await newTravel.save();
//     return res.status(201).json(newTravel);
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// };

// // Get all travels with search and filter
// const getAllTravels = async (req, res) => {
//   const { search, minPrice, maxPrice, startDate, endDate } = req.query; // Extract query parameters

//   try {
//     let query = {};

//     // Search by name or description (case-insensitive)
//     if (search) {
//       query.$or = [
//         { name: { $regex: search, $options: 'i' } },  // Name search
//         { description: { $regex: search, $options: 'i' } }  // Description search
//       ];
//     }

//     // Filter by price range if both minPrice and maxPrice are provided
//     if (minPrice && maxPrice) {
//       query.price = { $gte: Number(minPrice), $lte: Number(maxPrice) };
//     }

//     // Filter by available dates (if provided)
//     if (startDate && endDate) {
//       query.availableDates = { 
//         $gte: new Date(startDate), // Start date filter
//         $lte: new Date(endDate)    // End date filter
//       };
//     }

//     // Fetch travels based on query
//     const travels = await Travel.find(query);

//     return res.status(200).json(travels);
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// };
// Get all travels with filters

const createTravel = async (req, res) => {
  try {
    // Parse fields from req.body
    const { name, description, price, availableDates, imageURL } = req.body;

    // Validate required fields
    if (!name || !description || !price || !availableDates || availableDates.length === 0) {
      return res.status(400).json({ message: 'Name, description, price, and availableDates are required.' });
    }

    // Parse availableDates if it's a JSON string
    let parsedAvailableDates;
    try {
      parsedAvailableDates = Array.isArray(availableDates)
        ? availableDates
        : JSON.parse(availableDates); // Parse availableDates if it's a JSON string
    } catch (err) {
      return res.status(400).json({ message: 'Invalid format for availableDates. Must be an array or a JSON array.' });
    }

    // Create a new travel document
    const newTravel = new Travel({
      name,
      description,
      price: parseFloat(price), // Ensure price is stored as a number
      availableDates: parsedAvailableDates,
      createdBy: req.user.id, // Associate the travel with the logged-in user
      image: imageURL || null, // Use imageURL if provided
    });

    // Save the document to the database
    await newTravel.save();

    return res.status(201).json(newTravel);
  } catch (error) {
    console.error('Error creating travel:', error.message); // Log detailed error for debugging
    return res.status(500).json({ message: 'Error creating travel.' });
  }
};

const getAllTravels = async (req, res) => {
  try {
    const { search, minPrice, maxPrice, startDate, endDate } = req.query;

    let filterConditions = {};

    if (search) {
      filterConditions.$or = [
        { name: { $regex: search, $options: "i" } }, // Search by name
        { description: { $regex: search, $options: "i" } } // Search by description
      ];
    }

    if (minPrice) {
      filterConditions.price = { ...filterConditions.price, $gte: minPrice };
    }

    if (maxPrice) {
      filterConditions.price = { ...filterConditions.price, $lte: maxPrice };
    }

    if (startDate && endDate) {
      filterConditions.availableDates = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }

    const travels = await Travel.find(filterConditions);

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

// Get recommended travels (for example, top 5 most popular or rated)
const getRecommendedTravels = async (req, res) => {
  try {
    // Example: Fetching top 5 most popular (or highly rated) travels
    const recommendedTravels = await Travel.find().sort({ price: 1 }).limit(5); // Adjust based on your logic (e.g., sort by rating, price, etc.)
    return res.status(200).json(recommendedTravels);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getUserTravels = async (req, res) => {
  try {
    const travels = await Travel.find({ createdBy: req.user.id }); // Filter travels by user ID
    res.status(200).json(travels);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user travels.' });
  }
};



module.exports = {
  createTravel,
  getAllTravels,
  getTravelById,
  updateTravel,
  deleteTravel,
  getRecommendedTravels,
  getUserTravels,
};
