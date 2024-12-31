import React, { useState, useEffect } from 'react';
import API from '../utils/api';

const OwnTravels = () => {
  const [travels, setTravels] = useState([]);
  const [formData, setFormData] = useState({ name: '', description: '', price: '', startDate: '', endDate: '' });
  const [editingTravelId, setEditingTravelId] = useState(null);

  // Fetch all travels
  useEffect(() => {
    API.get('/travels') // Fetch travels using the backend endpoint
      .then((response) => setTravels(response.data))
      .catch((err) => console.error('Error fetching travels:', err));
  }, []);

  // Handle form submission for creating or updating travels
  const handleSave = (e) => {
    e.preventDefault();

    // Validate form data
    if (!formData.name || !formData.description || !formData.price || !formData.startDate || !formData.endDate) {
      console.error('All fields are required.');
      return;
    }

    const endpoint = editingTravelId ? `/travels/${editingTravelId}` : '/travels';
    const method = editingTravelId ? 'put' : 'post';

    API[method](endpoint, {
      ...formData,
      price: parseFloat(formData.price),
      availableDates: [formData.startDate, formData.endDate], // Combine start and end dates into an array
    })
      .then((response) => {
        if (editingTravelId) {
          setTravels(travels.map((t) => (t._id === editingTravelId ? response.data : t)));
        } else {
          setTravels([...travels, response.data]);
        }
        setFormData({ name: '', description: '', price: '', startDate: '', endDate: '' });
        setEditingTravelId(null);
      })
      .catch((err) => console.error('Error saving travel:', err));
  };

  // Handle deleting a travel
  const handleDelete = (id) => {
    API.delete(`/travels/${id}`)
      .then(() => setTravels(travels.filter((t) => t._id !== id)))
      .catch((err) => console.error('Error deleting travel:', err));
  };

  // Pre-fill form for editing
  const handleEdit = (travel) => {
    setEditingTravelId(travel._id);
    setFormData({
      name: travel.name,
      description: travel.description,
      price: travel.price.toString(),
      startDate: travel.availableDates[0], // Extract the start date
      endDate: travel.availableDates[1], // Extract the end date
    });
  };

  return (
    <div>
      <h1>My Travels</h1>
      <form onSubmit={handleSave}>
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
        />
        <label>Start Date:</label>
        <input
          type="date"
          value={formData.startDate}
          onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
        />
        <label>End Date:</label>
        <input
          type="date"
          value={formData.endDate}
          onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
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
            <button onClick={() => handleEdit(travel)}>Edit</button>
            <button onClick={() => handleDelete(travel._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OwnTravels;
