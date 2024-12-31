import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  // Check if the user is logged in
  const isLoggedIn = !!localStorage.getItem("token");

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove the token
    navigate("/login"); // Redirect to login page
  };

  return (
    <header>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/travels">Travels</Link>
        {isLoggedIn ? (
          <>
            <Link to="/profile">Profile</Link>
            <Link to="/owntravels">My Travels</Link>
            <button onClick={handleLogout} style={{ background: "none", border: "none", color: "blue", cursor: "pointer" }}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
