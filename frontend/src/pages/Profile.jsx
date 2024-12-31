import React, { useEffect, useState } from 'react';
import axios from '../utils/api'; // Assume this is your configured Axios instance
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState({});
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [passwordForm, setPasswordForm] = useState({ oldPassword: '', newPassword: '' });
  const [passwordUpdating, setPasswordUpdating] = useState(false);
  const navigate = useNavigate();

  // Fetch user profile
  useEffect(() => {
    axios.get('/profile')
      .then(response => setUser(response.data))
      .catch(err => console.error('Error fetching profile:', err));
  }, []);

  // Handle profile update
  const handleUpdate = (e) => {
    e.preventDefault();
    axios.patch('/profile', formData)
      .then(response => {
        setUser(response.data.user);
        setEditing(false);
      })
      .catch(err => console.error('Error updating profile:', err));
  };

  // Handle password update
  const handlePasswordUpdate = (e) => {
    e.preventDefault();
    axios.patch('/profile/password', passwordForm)
      .then(() => {
        alert('Password updated successfully!');
        setPasswordUpdating(false);
        setPasswordForm({ oldPassword: '', newPassword: '' });
      })
      .catch(err => console.error('Error updating password:', err));
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
          <button onClick={() => setPasswordUpdating(true)}>Update Password</button>
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

      {passwordUpdating && (
        <form onSubmit={handlePasswordUpdate}>
          <h2>Update Password</h2>
          <label>
            Old Password:
            <input
              type="password"
              value={passwordForm.oldPassword}
              onChange={(e) => setPasswordForm({ ...passwordForm, oldPassword: e.target.value })}
              required
            />
          </label>
          <label>
            New Password:
            <input
              type="password"
              value={passwordForm.newPassword}
              onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
              required
            />
          </label>
          <button type="submit">Update Password</button>
          <button type="button" onClick={() => setPasswordUpdating(false)}>Cancel</button>
        </form>
      )}
    </div>
  );
};

export default Profile;
