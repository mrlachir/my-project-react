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
      <style>
        {`
          .hero-section {
            position: relative;
            height: 24rem;
          }

          .hero-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          .hero-overlay {
            position: absolute;
            inset: 0;
            background-color: rgba(0, 0, 0, 0.5);
          }

          .hero-content {
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 1.5rem;
          }

          .hero-title {
            font-size: 2.25rem;
            color: white;
            font-weight: bold;
            margin-bottom: 1rem;
          }

          @media (min-width: 768px) {
            .hero-title {
              font-size: 3.75rem;
            }
          }

          .hero-description {
            font-size: 1.25rem;
            color: #e5e5e5;
            margin-bottom: 2rem;
            max-width: 42rem;
          }

          .explore-button {
            background-color: #2563eb;
            color: white;
            padding: 0.75rem 2rem;
            border-radius: 0.5rem;
            font-size: 1.125rem;
            font-weight: 600;
            text-decoration: none;
            display: inline-block;
            transition: background-color 0.3s ease;
          }

          .explore-button:hover {
            background-color: #1d4ed8;
          }

          .main-content {
            padding: 1.25rem;
          }

          .main-title {
            font-size: 1.75rem;
            margin-bottom: 1.25rem;
          }

          .recommendations-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            gap: 1.25rem;
          }

          .travel-card {
            background-color: #f4f4f4;
            padding: 0.9375rem;
            border-radius: 0.5rem;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          }

          .travel-card img {
            width: 100%;
            height: auto;
            border-radius: 0.25rem;
            margin: 0.5rem 0;
          }

          .travel-card h2 {
            margin: 0.5rem 0;
            font-size: 1.25rem;
          }

          .travel-card p {
            margin: 0.5rem 0;
            color: #4b5563;
          }

          .view-details {
            color: #2563eb;
            text-decoration: none;
            display: inline-block;
            margin-top: 0.5rem;
          }

          .view-details:hover {
            text-decoration: underline;
          }
        `}
      </style>

      <div className="hero-section">
        <img
          src="https://fly-over-the-world-media.s3.amazonaws.com/uploads/experiences/637634a008732-63d65965d9f75_1280_720.jpg"
          alt="Travel destination"
          className="hero-image"
        />
        <div className="hero-overlay">
          <div className="hero-content">
            <h1 className="hero-title">
              Discover Your Next Adventure
            </h1>
            <p className="hero-description">
              Explore breathtaking destinations and create unforgettable memories with our curated travel experiences.
            </p>
            <Link to="/travels" className="explore-button">
              Explore All Destinations
            </Link>
          </div>
        </div>
      </div>

      <main className="main-content">
        <h1 className="main-title">Recommended Travels</h1>
        
        <div className="recommendations-grid">
          {recommendedTravels.length > 0 ? (
            recommendedTravels.map((travel) => (
              <div key={travel._id} className="travel-card">
                {travel.image && (
                  <img src={travel.image} alt={travel.name} />
                )}
                <h2>{travel.name}</h2>
                <p>{travel.description}</p>
                <p>Price: ${travel.price}</p>
                <Link to={`/travels/${travel._id}`} className="view-details">
                  View Details
                </Link>
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

export default Home;