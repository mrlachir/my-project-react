import React, { useState, useEffect } from "react";
import API from "../utils/api";
import { Link } from "react-router-dom"; // For navigation links (e.g., to the travels page)

const Home = () => {
  const [recommendedTravels, setRecommendedTravels] = useState([]);
  useEffect(() => {
    const fetchRecommendedTravels = async () => {
      try {
        // Fetch recommended travels, you can modify this logic to fetch based on recommendations
        const { data } = await API.get("/travels"); // Get all travels, modify based on your backend
        setRecommendedTravels(data.slice(0, 5)); // Display only the top 5 as recommendations
      } catch (error) {
        console.error("Error fetching recommended travels:", error);
      }
    };

    fetchRecommendedTravels();
  }, []);

  const fetchRecommendedTravels = async () => {
    try {
      const { data } = await API.get("/travels/recommended"); // Call the new backend route
      setRecommendedTravels(data);
    } catch (error) {
      console.error("Error fetching recommended travels:", error);
    }
  };

  return (
    <div>

      {/* Main Section with Recommendations */}
      <main style={styles.main}>
        <h1 style={styles.title}>Recommended Travels</h1>
        
        <div style={styles.recommendations}>
          {recommendedTravels.length > 0 ? (
            recommendedTravels.map((travel) => (
              <div key={travel._id} style={styles.travelCard}>
                <h2>{travel.name}</h2>
                {travel.image && (
              <img src={travel.image} alt={travel.name} width="100" /> // Display image if URL is provided
            )}
                <p>{travel.description}</p>
                <p>Price: ${travel.price}</p>
                <Link to={`/travels/${travel._id}`} style={styles.viewDetails}>View Details</Link>
              </div>
            ))
          ) : (
            <p>No recommendations available</p>
          )}
        </div>
      </main>
    </div>
  );
};

// Styles (you can customize this as per your needs)
const styles = {
  main: {
    padding: "20px",
  },
  title: {
    fontSize: "28px",
    marginBottom: "20px",
  },
  recommendations: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "20px",
  },
  travelCard: {
    backgroundColor: "#f4f4f4",
    padding: "15px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  viewDetails: {
    color: "#007bff",
    textDecoration: "none",
  },
};

export default Home;
