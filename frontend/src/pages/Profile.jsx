import React, { useEffect, useState } from 'react';
import axios from '../utils/api'; // Assume this is your configured Axios instance
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState({});
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  // Fetch user profile
  useEffect(() => {
    axios.get('/profile')
      .then(response => setUser(response.data))
      .catch(err => console.error('Error fetching profile:', err));
  }, []);

  // Handle form submission
  const handleUpdate = (e) => {
    e.preventDefault();
    axios.patch('/profile', formData)
      .then(response => {
        setUser(response.data.user);
        setEditing(false);
      })
      .catch(err => console.error('Error updating profile:', err));
  };

  // Logout user
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove JWT from storage
    navigate('/login'); // Redirect to login page
  };

  return (
    <div>
      <h1>Profile</h1>
      {!editing ? (
        <div>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <button onClick={() => setEditing(true)}>Edit Profile</button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <form onSubmit={handleUpdate}>
          <label>
            Name:
            <input
              type="text"
              value={formData.name || user.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              value={formData.email || user.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </label>
          <button type="submit">Save</button>
          <button type="button" onClick={() => setEditing(false)}>Cancel</button>
        </form>
      )}
    </div>
  );
};

export default Profile;
