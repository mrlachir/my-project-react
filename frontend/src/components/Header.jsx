import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Define styles object
  const styles = {
    header: {
      backgroundColor: '#ffffff',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
    },
    navContainer: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '1rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      '@media (max-width: 768px)': {
        flexDirection: 'column',
        padding: '1rem 0',
      },
    },
    brandLink: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      color: '#2563eb',
      textDecoration: 'none',
      transition: 'color 0.3s ease',
    },
    navLinks: {
      display: 'flex',
      alignItems: 'center',
      gap: '2rem',
      '@media (max-width: 768px)': {
        flexDirection: 'column',
        gap: '1rem',
        width: '100%',
        padding: '0 1rem',
      },
    },
    navLink: {
      color: '#4b5563',
      textDecoration: 'none',
      fontWeight: 500,
      transition: 'color 0.3s ease',
      position: 'relative',
      padding: '0.5rem 0',
      '&:hover': {
        color: '#2563eb',
      },
    },
    authLink: {
      color: '#2563eb',
      fontWeight: 600,
      textDecoration: 'none',
    },
    logoutBtn: {
      background: 'none',
      border: '2px solid #ef4444',
      color: '#ef4444',
      padding: '0.5rem 1rem',
      borderRadius: '0.375rem',
      fontWeight: 500,
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      '&:hover': {
        backgroundColor: '#ef4444',
        color: 'white',
      },
      '@media (max-width: 768px)': {
        width: '100%',
        marginTop: '0.5rem',
      },
    },
  };

  // Helper function to merge hover styles
  const getHoverStyle = (baseStyle, hoverStyle) => ({
    ...baseStyle,
    ':hover': hoverStyle,
  });

  return (
    <header style={styles.header}>
      <nav style={styles.navContainer}>
        <div>
          <Link 
            to="/" 
            style={{
              ...styles.brandLink,
              ':hover': { color: '#1d4ed8' }
            }}
          >
            TravelMate
          </Link>
        </div>
        <div style={styles.navLinks}>
          <Link 
            to="/" 
            style={{
              ...styles.navLink,
              ':hover': { color: '#2563eb' }
            }}
          >
            Home
          </Link>
          <Link 
            to="/travels" 
            style={styles.navLink}
          >
            Travels
          </Link>
          {isLoggedIn ? (
            <>
              <Link to="/profile" style={styles.navLink}>
                Profile
              </Link>
              <Link to="/owntravels" style={styles.navLink}>
                My Travels
              </Link>
              <button 
                onClick={handleLogout} 
                style={{
                  ...styles.logoutBtn,
                  ':hover': {
                    backgroundColor: '#ef4444',
                    color: 'white',
                  }
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" style={styles.navLink}>
                Login
              </Link>
              <Link to="/register" style={styles.authLink}>
                Register
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;