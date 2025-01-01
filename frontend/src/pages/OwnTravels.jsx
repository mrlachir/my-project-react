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
    <div style={styles.container}>
      <h1 style={styles.title}>My Travels</h1>
      {error && <p style={styles.error}>{error}</p>}
      {successMessage && <p style={styles.success}>{successMessage}</p>}

      <div style={styles.formContainer}>
        <form onSubmit={handleSave} style={styles.form}>
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            style={styles.input}
          />
          <input
            type="text"
            placeholder="Description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            required
            style={styles.input}
          />
          <input
            type="number"
            placeholder="Price"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            required
            style={styles.input}
          />
          <label style={styles.label}>Start Date:</label>
          <input
            type="date"
            value={formData.startDate}
            onChange={(e) =>
              setFormData({ ...formData, startDate: e.target.value })
            }
            required
            style={styles.input}
          />
          <label style={styles.label}>End Date:</label>
          <input
            type="date"
            value={formData.endDate}
            onChange={(e) =>
              setFormData({ ...formData, endDate: e.target.value })
            }
            required
            style={styles.input}
          />
          <input
            type="text"
            placeholder="Image URL"
            value={formData.imageURL}
            onChange={(e) =>
              setFormData({ ...formData, imageURL: e.target.value })
            }
            style={styles.input}
          />
          <button type="submit" style={styles.button}>
            {editingTravelId ? "Update" : "Create"}
          </button>
        </form>
      </div>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Description</th>
            <th style={styles.th}>Price</th>
            <th style={styles.th}>Available Dates</th>
            <th style={styles.th}>Image</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {travels.map((travel) => (
            <tr key={travel._id}>
              <td style={styles.td}>{travel.name}</td>
              <td style={styles.td}>{travel.description}</td>
              <td style={styles.td}>${travel.price}</td>
              <td style={styles.td}>
  {travel.availableDates.map(date => new Date(date).toISOString().split('T')[0]).join(" to ")}
</td>              <td style={styles.td}>
                {travel.image && (
                  <img
                    src={travel.image}
                    alt={travel.name}
                    style={styles.image}
                  />
                )}
              </td>
              <td style={styles.td}>
                <button
                  onClick={() => handleEdit(travel)}
                  style={styles.button}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(travel._id)}
                  style={styles.button}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// CSS-in-JS Styles
const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    textAlign: "center",
    color: "#333",
  },
  error: {
    color: "red",
    textAlign: "center",
  },
  success: {
    color: "green",
    textAlign: "center",
  },
  formContainer: {
    maxWidth: "400px",
    margin: "0 auto",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  label: {
    fontWeight: "bold",
  },
  button: {
    padding: "10px",
    fontSize: "16px",
    backgroundColor: "#007BFF",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    margin: "0 5px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
  },
  th: {
    border: "1px solid #ddd",
    padding: "10px",
    textAlign: "left",
    backgroundColor: "#f4f4f4",
  },
  td: {
    border: "1px solid #ddd",
    padding: "10px",
  },
  image: {
    width: "100px",
    borderRadius: "4px",
  },
};

export default OwnTravels;