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
      <style>
        {`
          .profile-container {
            max-width: 800px;
            margin: 0 auto;
            padding: 2rem;
          }

          .page-title {
            color: #1a1a1a;
            font-size: 2rem;
            font-weight: 600;
            margin-bottom: 2rem;
          }

          .error-message {
            background-color: #fee2e2;
            color: #dc2626;
            padding: 0.75rem;
            border-radius: 4px;
            margin-bottom: 1rem;
          }

          .profile-section {
            background-color: white;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            padding: 1.5rem;
            margin-bottom: 2rem;
          }

          .profile-info {
            margin-bottom: 1.5rem;
          }

          .info-row {
            display: flex;
            margin-bottom: 0.75rem;
          }

          .info-label {
            font-weight: 600;
            width: 100px;
            color: #374151;
          }

          .info-value {
            color: #1a1a1a;
          }

          .button-group {
            display: flex;
            gap: 1rem;
            margin-top: 1.5rem;
          }

          .primary-button {
            background-color: #2563eb;
            color: white;
            padding: 0.5rem 1rem;
            border-radius: 4px;
            border: none;
            font-weight: 500;
            cursor: pointer;
            transition: background-color 0.15s;
          }

          .primary-button:hover {
            background-color: #1d4ed8;
          }

          .secondary-button {
            background-color: #9ca3af;
            color: white;
            padding: 0.5rem 1rem;
            border-radius: 4px;
            border: none;
            font-weight: 500;
            cursor: pointer;
            transition: background-color 0.15s;
          }

          .secondary-button:hover {
            background-color: #6b7280;
          }

          .danger-button {
            background-color: #dc2626;
            color: white;
            padding: 0.5rem 1rem;
            border-radius: 4px;
            border: none;
            font-weight: 500;
            cursor: pointer;
            transition: background-color 0.15s;
          }

          .danger-button:hover {
            background-color: #b91c1c;
          }

          .form-group {
            margin-bottom: 1rem;
          }

          .form-label {
            display: block;
            font-weight: 500;
            margin-bottom: 0.5rem;
            color: #374151;
          }

          .form-input {
            width: 100%;
            padding: 0.75rem;
            border: 1px solid #d1d5db;
            border-radius: 4px;
            font-size: 1rem;
            transition: border-color 0.15s;
          }

          .form-input:focus {
            outline: none;
            border-color: #2563eb;
            box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
          }

          .bookings-section {
            margin-top: 2rem;
          }

          .section-title {
            font-size: 1.5rem;
            color: #1a1a1a;
            margin-bottom: 1.5rem;
          }

          .bookings-list {
            list-style: none;
            padding: 0;
          }

          .booking-card {
            background-color: white;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            padding: 1.5rem;
            margin-bottom: 1rem;
          }

          .booking-info {
            margin-bottom: 0.5rem;
          }

          .booking-label {
            font-weight: 600;
            color: #374151;
            margin-right: 0.5rem;
          }

          .booking-status {
            display: inline-block;
            padding: 0.25rem 0.75rem;
            border-radius: 9999px;
            font-size: 0.875rem;
            font-weight: 500;
            background-color: #dbeafe;
            color: #1e40af;
          }
        `}
      </style>

      <div className="profile-container">
        <h1 className="page-title">Profile</h1>
        {error && <p className="error-message">{error}</p>}

        <div className="profile-section">
          {!editing ? (
            <div>
              <div className="profile-info">
                <div className="info-row">
                  <span className="info-label">Name:</span>
                  <span className="info-value">{user.name}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Email:</span>
                  <span className="info-value">{user.email}</span>
                </div>
              </div>
              <div className="button-group">
                <button className="primary-button" onClick={() => setEditing(true)}>
                  Edit Profile
                </button>
                <button className="secondary-button" onClick={() => setPasswordUpdating(true)}>
                  Update Password
                </button>
                <button className="danger-button" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleUpdate}>
              <div className="form-group">
                <label className="form-label">Name:</label>
                <input
                  className="form-input"
                  type="text"
                  value={formData.name || user.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Email:</label>
                <input
                  className="form-input"
                  type="email"
                  value={formData.email || user.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div className="button-group">
                <button className="primary-button" type="submit">Save</button>
                <button className="secondary-button" type="button" onClick={() => setEditing(false)}>
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>

        {passwordUpdating && (
          <div className="profile-section">
            <form onSubmit={handlePasswordUpdate}>
              <h2 className="section-title">Update Password</h2>
              {passwordError && <p className="error-message">{passwordError}</p>}
              <div className="form-group">
                <label className="form-label">Old Password:</label>
                <input
                  className="form-input"
                  type="password"
                  value={passwordForm.oldPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, oldPassword: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">New Password:</label>
                <input
                  className="form-input"
                  type="password"
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                  required
                />
              </div>
              <div className="button-group">
                <button className="primary-button" type="submit">Update Password</button>
                <button className="secondary-button" type="button" onClick={() => setPasswordUpdating(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="bookings-section">
          <h2 className="section-title">My Bookings</h2>
          <ul className="bookings-list">
            {bookings
              .filter((booking) => booking.status !== 'Cancelled')
              .map((booking) => (
                <li key={booking._id} className="booking-card">
                  <div className="booking-info">
                    <span className="booking-label">Travel:</span>
                    {booking.travel.name}
                  </div>
                  <div className="booking-info">
                    <span className="booking-label">Total Price:</span>
                    ${booking.totalPrice}
                  </div>
                  <div className="booking-info">
                    <span className="booking-label">Status:</span>
                    <span className="booking-status">{booking.status}</span>
                  </div>
                  <div className="booking-info">
                    <span className="booking-label">Dates:</span>
                    {new Date(booking.startDate).toLocaleDateString()} to{' '}
                    {new Date(booking.endDate).toLocaleDateString()}
                  </div>
                  <div className="button-group">
                    <button
                      className="danger-button"
                      onClick={() => handleCancelBooking(booking._id)}
                    >
                      Cancel Booking
                    </button>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Profile;