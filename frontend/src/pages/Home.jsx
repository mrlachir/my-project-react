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
    <div className="home-container">
      <style>
        {`
          .home-container {
            min-height: 100vh;
            background: linear-gradient(to bottom, #f8f9fa, #ffffff);
          }

          /* Hero Section */
          .hero {
            position: relative;
            height: 100vh;
            width: 100%;
            overflow: hidden;
          }

          .hero-image {
            position: absolute;
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          .hero-overlay {
            position: absolute;
            inset: 0;
            background: rgba(0, 0, 0, 0.4);
          }

          .hero-content {
            position: relative;
            z-index: 2;
            height: 100%;
            display: flex;
            align-items: center;
            padding: 0 2rem;
            max-width: 1200px;
            margin: 0 auto;
          }

          .hero-text {
            max-width: 800px;
            color: white;
          }

          .hero-title {
            font-size: 4rem;
            font-weight: 800;
            margin-bottom: 1.5rem;
            line-height: 1.1;
          }

          .hero-title span {
            display: block;
            background: linear-gradient(to right, #60a5fa, #34d399);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }

          .hero-description {
            font-size: 1.25rem;
            color: rgba(255, 255, 255, 0.9);
            margin-bottom: 2rem;
            max-width: 600px;
          }

          .hero-button {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            background: white;
            color: #111827;
            padding: 1rem 2rem;
            border-radius: 9999px;
            font-weight: 600;
            text-decoration: none;
            transition: background-color 0.3s ease;
          }

          .hero-button:hover {
            background: #f3f4f6;
          }

          /* Main Content */
          .main-content {
            max-width: 1200px;
            margin: 0 auto;
            padding: 4rem 2rem;
          }

          .section-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 3rem;
          }

          .section-title {
            font-size: 2rem;
            font-weight: 700;
            color: #111827;
          }

          .view-all {
            color: #2563eb;
            text-decoration: none;
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 0.5rem;
          }

          .view-all:hover {
            color: #1d4ed8;
          }

          .travel-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 2rem;
          }

          .travel-card {
            background: white;
            border-radius: 1rem;
            overflow: hidden;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 
                        0 2px 4px -1px rgba(0, 0, 0, 0.06);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }

          .travel-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
                        0 4px 6px -2px rgba(0, 0, 0, 0.05);
          }

          .card-image-container {
            position: relative;
            height: 200px;
            overflow: hidden;
          }

          .card-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.3s ease;
          }

          .travel-card:hover .card-image {
            transform: scale(1.05);
          }

          .card-rating {
            position: absolute;
            top: 1rem;
            right: 1rem;
            background: rgba(255, 255, 255, 0.9);
            backdrop-filter: blur(4px);
            padding: 0.25rem 0.75rem;
            border-radius: 9999px;
            display: flex;
            align-items: center;
            gap: 0.25rem;
            font-weight: 500;
          }

          .card-content {
            padding: 1.5rem;
          }

          .card-location {
            color: #6b7280;
            font-size: 0.875rem;
            margin-bottom: 0.5rem;
            display: flex;
            align-items: center;
            gap: 0.25rem;
          }

          .card-title {
            font-size: 1.25rem;
            font-weight: 700;
            color: #111827;
            margin-bottom: 0.5rem;
          }

          .card-description {
            color: #6b7280;
            margin-bottom: 1rem;
          }

          .card-footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          .card-price {
            font-size: 1.5rem;
            font-weight: 700;
            color: #111827;
          }

          .card-button {
            background: #2563eb;
            color: white;
            padding: 0.5rem 1rem;
            border-radius: 0.5rem;
            text-decoration: none;
            font-weight: 500;
            transition: background-color 0.3s ease;
          }

          .card-button:hover {
            background: #1d4ed8;
          }

          @media (max-width: 768px) {
            .hero-title {
              font-size: 3rem;
            }

            .travel-grid {
              grid-template-columns: 1fr;
            }

            .section-header {
              flex-direction: column;
              align-items: flex-start;
              gap: 1rem;
            }
          }
        `}
      </style>

      <div className="hero">
        <img
          src="https://fly-over-the-world-media.s3.amazonaws.com/uploads/experiences/637634a008732-63d65965d9f75_1280_720.jpg"
          alt="Travel destination"
          className="hero-image"
        />
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Discover Your Next
              <span>Adventure</span>
            </h1>
            <p className="hero-description">
              Explore breathtaking destinations and create unforgettable
              memories with our curated travel experiences.
            </p>
            <Link to="/travels" className="hero-button">
              Explore All Destinations
              <span>→</span>
            </Link>
          </div>
        </div>
      </div>

      <main className="main-content">
        <div className="section-header">
          <h2 className="section-title">Recommended Destinations</h2>
          <Link to="/travels" className="view-all">
            View all
            <span>→</span>
          </Link>
        </div>

        <div className="travel-grid">
          {recommendedTravels.slice(0, 3).map((travel) => (
            <div key={travel._id} className="travel-card">
              <div className="card-image-container">
                <img
                  src={travel.image}
                  alt={travel.name}
                  className="card-image"
                />
              </div>
              <div className="card-content">
                <h3 className="card-title">{travel.name}</h3>
                <p className="card-description">{travel.description}</p>
                <div className="card-footer">
                  <span className="card-price">${travel.price}</span>
                  <Link to={`/travels/${travel._id}`} className="card-button">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;
