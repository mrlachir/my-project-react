import React, { useEffect, useState } from 'react';
import axios from '../utils/api'; // Assume this is your configured Axios instance
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState({});
  const [bookings, setBookings] = useState([]); // State for user's bookings
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [passwordForm, setPasswordForm] = useState({ oldPassword: '', newPassword: '' });
  const [passwordUpdating, setPasswordUpdating] = useState(false);
  const [error, setError] = useState(null); // General error message
  const [passwordError, setPasswordError] = useState(null); // Password update error
  const navigate = useNavigate();

  // Fetch user profile and bookings
  useEffect(() => {
    // Fetch user profile
    axios
      .get('/profile')
      .then((response) => setUser(response.data))
      .catch((err) => setError('Failed to fetch profile. Please try again.'));

    // Fetch user's bookings
    axios
      .get('/bookings')
      .then((response) => setBookings(response.data.bookings))
      .catch((err) => setError('Failed to fetch bookings. Please try again.'));
  }, []);

  // Handle profile update
  const handleUpdate = (e) => {
    e.preventDefault();
    setError(null); // Reset error
    axios
      .patch('/profile', formData)
      .then((response) => {
        setUser(response.data.user);
        setEditing(false);
        alert('Profile updated successfully!');
      })
      .catch((err) => {
        setError('Failed to update profile. Please try again.');
        console.error('Error updating profile:', err);
      });
  };

  // Handle password update
  const handlePasswordUpdate = (e) => {
    e.preventDefault();
    setPasswordError(null); // Reset password error
    axios
      .patch('/profile/password', passwordForm)
      .then(() => {
        alert('Password updated successfully!');
        setPasswordUpdating(false);
        setPasswordForm({ oldPassword: '', newPassword: '' });
      })
      .catch((err) => {
        if (err.response?.status === 400) {
          setPasswordError('New password too short.');
        } else if (err.response?.status === 401) {
          setPasswordError('Old password is incorrect.');
        } else if (err.response?.status === 500) {
          setPasswordError('An internal server error occurred. Please try again later.');
        } else {
          setPasswordError('Failed to update password. Please try again.');
        }
        console.error('Error updating password:', err);
      });
  };

  // Handle cancel booking
  const handleCancelBooking = (bookingId) => {
    axios
      .patch(`/bookings/${bookingId}`, { status: 'Cancelled' }) // Update booking status to "Cancelled"
      .then(() => {
        setBookings(bookings.filter((booking) => booking._id !== bookingId));
        alert('Booking cancelled successfully.');
      })
      .catch((err) => {
        setError('Failed to cancel booking. Please try again.');
        console.error('Error canceling booking:', err);
      });
  };

  // Logout user
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove JWT from storage
    navigate('/login'); // Redirect to login page
  };

  return (
    <div>
      <h1>Profile</h1>
      {error && <p className="error">{error}</p>} {/* Display general errors */}
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
          {passwordError && <p className="error">{passwordError}</p>} {/* Display password-specific errors */}
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

      <h2>My Bookings</h2>
      <ul>
      {bookings
  .filter((booking) => booking.status !== 'Cancelled') // Filter out cancelled bookings
  .map((booking) => (
    <li key={booking._id}>
      <p><strong>Travel:</strong> {booking.travel.name}</p>
      <p><strong>Total Price:</strong> ${booking.totalPrice}</p>
      <p><strong>Status:</strong> {booking.status}</p>
      <p><strong>Dates:</strong> {new Date(booking.startDate).toLocaleDateString()} to {new Date(booking.endDate).toLocaleDateString()}</p>
      <button onClick={() => handleCancelBooking(booking._id)}>Cancel Booking</button>
    </li>
  ))}

      </ul>
    </div>
  );
};

export default Profile;
