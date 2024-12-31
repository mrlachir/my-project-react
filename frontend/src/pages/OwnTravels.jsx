import React, { useState, useEffect } from 'react';
import API from '../utils/api'; // Use your Axios instance

const OwnTravels = () => {
  const [travels, setTravels] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    startDate: '',
    endDate: '',
    imageURL: '', // Added field for image URL
  });
  const [editingTravelId, setEditingTravelId] = useState(null);
  const [error, setError] = useState(null); // For general errors
  const [successMessage, setSuccessMessage] = useState(null); // For success messages

  // Fetch only the user's travels
  useEffect(() => {
    API.get('/travels/owntravels') // Use the user-specific endpoint
      .then((response) => setTravels(response.data))
      .catch((err) => setError('Error fetching user travels.'));
  }, []);

  // Handle form submission for creating or updating travels
  const handleSave = (e) => {
    e.preventDefault();
    setError(null); // Reset error
    setSuccessMessage(null); // Reset success message

    if (
      !formData.name ||
      !formData.description ||
      !formData.price ||
      !formData.startDate ||
      !formData.endDate
    ) {
      setError('All fields are required.');
      return;
    }

    const endpoint = editingTravelId ? `/travels/${editingTravelId}` : '/travels';
    const method = editingTravelId ? API.put : API.post;

    method(endpoint, {
      ...formData,
      price: parseFloat(formData.price),
      availableDates: [formData.startDate, formData.endDate], // Combine start and end dates into an array
    })
      .then((response) => {
        if (editingTravelId) {
          setTravels(travels.map((t) => (t._id === editingTravelId ? response.data : t)));
          setSuccessMessage('Travel updated successfully!');
        } else {
          setTravels([...travels, response.data]);
          setSuccessMessage('Travel created successfully!');
        }
        setFormData({
          name: '',
          description: '',
          price: '',
          startDate: '',
          endDate: '',
          imageURL: '', // Clear the imageURL field
        });
        setEditingTravelId(null);
      })
      .catch((err) => {
        setError(err.response?.data?.message || 'Error saving travel.');
      });
  };

  // Handle deleting a travel
  const handleDelete = (id) => {
    setError(null); // Reset error
    setSuccessMessage(null); // Reset success message
    API.delete(`/travels/${id}`)
      .then(() => {
        setTravels(travels.filter((t) => t._id !== id));
        setSuccessMessage('Travel deleted successfully!');
      })
      .catch((err) => setError('Error deleting travel.'));
  };

  // Pre-fill form for editing
  const handleEdit = (travel) => {
    setEditingTravelId(travel._id);
    setFormData({
      name: travel.name,
      description: travel.description,
      price: travel.price.toString(),
      startDate: travel.availableDates[0],
      endDate: travel.availableDates[1],
      imageURL: travel.image || '', // Populate image URL if it exists
    });
  };

  return (
    <div>
      <h1>My Travels</h1>
      {error && <p className="error">{error}</p>} {/* Display errors */}
      {successMessage && <p className="success">{successMessage}</p>} {/* Display success messages */}

      <form onSubmit={handleSave}>
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          required
        />
        <label>Start Date:</label>
        <input
          type="date"
          value={formData.startDate}
          onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
          required
        />
        <label>End Date:</label>
        <input
          type="date"
          value={formData.endDate}
          onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Image URL"
          value={formData.imageURL}
          onChange={(e) => setFormData({ ...formData, imageURL: e.target.value })}
        />
        <button type="submit">{editingTravelId ? 'Update' : 'Create'}</button>
      </form>

      <ul>
        {travels.map((travel) => (
          <li key={travel._id}>
            <h3>{travel.name}</h3>
            <p>{travel.description}</p>
            <p>Price: ${travel.price}</p>
            <p>Available Dates: {travel.availableDates.join(' to ')}</p>
            {travel.image && (
              <img src={travel.image} alt={travel.name} width="100" /> // Display image if URL is provided
            )}
            <button onClick={() => handleEdit(travel)}>Edit</button>
            <button onClick={() => handleDelete(travel._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OwnTravels;
