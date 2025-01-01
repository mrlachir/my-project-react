import React, { useState, useEffect } from "react";
import API from "../utils/api";
import { Link } from "react-router-dom"; // For navigation links (e.g., to the travels page)

const Travels = () => {
  const [travels, setTravels] = useState([]);
  const [search, setSearch] = useState(""); // Search query state
  const [minPrice, setMinPrice] = useState(""); // Min price filter state
  const [maxPrice, setMaxPrice] = useState(""); // Max price filter state
  const [startDate, setStartDate] = useState(""); // Start date filter state
  const [endDate, setEndDate] = useState(""); // End date filter state

  useEffect(() => {
    const fetchTravels = async () => {
      try {
        // Build the query params based on the filter states
        let queryParams = "";

        if (search) queryParams += `search=${search}&`;
        if (minPrice) queryParams += `minPrice=${minPrice}&`;
        if (maxPrice) queryParams += `maxPrice=${maxPrice}&`;
        if (startDate) queryParams += `startDate=${startDate}&`;
        if (endDate) queryParams += `endDate=${endDate}&`;

        // Remove the trailing "&" from query params
        queryParams = queryParams.slice(0, -1);

        // Make the API call with the dynamic query parameters
        const { data } = await API.get(`/travels?${queryParams}`);
        setTravels(data);
      } catch (error) {
        console.error("Error fetching travels:", error);
      }
    };

    fetchTravels();
  }, []); // Initially fetch all travels

  const handleSearchAndFilter = (e) => {
    e.preventDefault(); // Prevent default form submission

    // Refetch travels with the filters applied
    const fetchTravels = async () => {
      try {
        let queryParams = "";

        if (search) queryParams += `search=${search}&`;
        if (minPrice) queryParams += `minPrice=${minPrice}&`;
        if (maxPrice) queryParams += `maxPrice=${maxPrice}&`;
        if (startDate) queryParams += `startDate=${startDate}&`;
        if (endDate) queryParams += `endDate=${endDate}&`;

        queryParams = queryParams.slice(0, -1); // Clean up the query string

        const { data } = await API.get(`/travels?${queryParams}`);
        setTravels(data);
      } catch (error) {
        console.error("Error fetching filtered travels:", error);
      }
    };

    fetchTravels();
  };

  return (
    <div>
      <style>
        {`
          .travels-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem;
          }

          .travels-title {
            color: #1a1a1a;
            font-size: 2.25rem;
            font-weight: 600;
            margin-bottom: 2rem;
            text-align: center;
          }

          .search-form {
            background-color: #ffffff;
            padding: 1.5rem;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            margin-bottom: 2rem;
          }

          .search-input {
            width: 100%;
            padding: 0.75rem;
            border: 1px solid #d1d5db;
            border-radius: 4px;
            font-size: 1rem;
            margin-bottom: 1rem;
          }

          .filters-container {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 1rem;
            margin-bottom: 1rem;
          }

          .filter-group {
            display: flex;
            gap: 0.5rem;
          }

          .filter-input {
            flex: 1;
            padding: 0.75rem;
            border: 1px solid #d1d5db;
            border-radius: 4px;
            font-size: 0.875rem;
          }

          .search-button {
            width: 100%;
            padding: 0.75rem;
            background-color: #2563eb;
            color: white;
            border: none;
            border-radius: 4px;
            font-size: 1rem;
            font-weight: 500;
            cursor: pointer;
            transition: background-color 0.15s ease-in-out;
          }

          .search-button:hover {
            background-color: #1d4ed8;
          }

          .travels-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 1.5rem;
          }

          .travel-card {
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            overflow: hidden;
            transition: transform 0.2s ease-in-out;
          }

          .travel-card:hover {
            transform: translateY(-4px);
          }

          .travel-image {
            width: 100%;
            height: 200px;
            object-fit: cover;
          }

          .travel-content {
            padding: 1.25rem;
          }

          .travel-title {
            font-size: 1.25rem;
            font-weight: 600;
            color: #1a1a1a;
            margin-bottom: 0.5rem;
          }

          .travel-description {
            color: #4b5563;
            font-size: 0.875rem;
            margin-bottom: 1rem;
            line-height: 1.5;
          }

          .travel-price {
            font-weight: 600;
            color: #2563eb;
            margin-bottom: 0.5rem;
          }

          .travel-dates {
            font-size: 0.875rem;
            color: #6b7280;
          }

          .no-results {
            text-align: center;
            color: #6b7280;
            font-size: 1.125rem;
            padding: 2rem;
          }

          input:focus {
            outline: none;
            border-color: #2563eb;
            box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
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

      <div className="travels-container">
        <h1 className="travels-title">Available Travels</h1>

        <form className="search-form" onSubmit={handleSearchAndFilter}>
          <input
            className="search-input"
            type="text"
            placeholder="Search by name or description"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="filters-container">
            <div className="filter-group">
              <input
                className="filter-input"
                type="number"
                placeholder="Min Price"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
              />
              <input
                className="filter-input"
                type="number"
                placeholder="Max Price"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </div>

            <div className="filter-group">
              <input
                className="filter-input"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <input
                className="filter-input"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>

          <button className="search-button" type="submit">
            Search & Filter
          </button>
        </form>

        <div className="travels-grid">
          {travels.length > 0 ? (
            travels.map((travel) => (
              <div key={travel._id} className="travel-card">
                {travel.image && (
                  <img 
                    src={travel.image} 
                    alt={travel.name} 
                    className="travel-image"
                  />
                )}
                <div className="travel-content">
                  <h2 className="travel-title">{travel.name}</h2>
                  <p className="travel-description">{travel.description}</p>
                  <p className="travel-price">Price: ${travel.price}</p>
                  <p className="travel-dates">
                    Available Dates: {travel.availableDates.map(date => new Date(date).toISOString().split('T')[0]).join(" to ")}
                  </p>
                  
                  <Link to={`/travels/${travel._id}`} className="view-details">
                  View Details
                </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="no-results">No travels found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Travels;