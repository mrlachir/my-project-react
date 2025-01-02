import React, { useState, useEffect } from "react";
import API from "../utils/api";
import { Link } from "react-router-dom"; // For navigation links

const Travels = () => {
  const [travels, setTravels] = useState([]);
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    const fetchTravels = async () => {
      try {
        let queryParams = "";

        if (search) queryParams += `search=${search}&`;
        if (minPrice) queryParams += `minPrice=${minPrice}&`;
        if (maxPrice) queryParams += `maxPrice=${maxPrice}&`;
        if (startDate) queryParams += `startDate=${startDate}&`;
        if (endDate) queryParams += `endDate=${endDate}&`;

        queryParams = queryParams.slice(0, -1);

        const { data } = await API.get(`/travels?${queryParams}`);
        setTravels(data);
      } catch (error) {
        console.error("Error fetching travels:", error);
      }
    };

    fetchTravels();
  }, []);

  const handleSearchAndFilter = (e) => {
    e.preventDefault();

    const fetchTravels = async () => {
      try {
        let queryParams = "";

        if (search) queryParams += `search=${search}&`;
        if (minPrice) queryParams += `minPrice=${minPrice}&`;
        if (maxPrice) queryParams += `maxPrice=${maxPrice}&`;
        if (startDate) queryParams += `startDate=${startDate}&`;
        if (endDate) queryParams += `endDate=${endDate}&`;

        queryParams = queryParams.slice(0, -1);

        const { data } = await API.get(`/travels?${queryParams}`);
        setTravels(data);
      } catch (error) {
        console.error("Error fetching filtered travels:", error);
      }
    };

    fetchTravels();
  };

  return (
    <div className="travels-page">
      <style>
        {`
          .travels-page {
            background-color: #f9fafb;
            font-family: 'Arial', sans-serif;
            padding: 2rem;
          }

          .travels-title {
            color: #111827;
            font-size: 2.5rem;
            font-weight: bold;
            margin-bottom: 1.5rem;
            text-align: center;
          }

          .search-form {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            margin-bottom: 2rem;
            justify-content: center;
            background-color: #ffffff;
            padding: 0.75rem 1rem;
            border-radius: 50px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }

          .search-input, .filter-input {
            padding: 0.85rem;
            font-size: 1rem;
            border: 1px solid #d1d5db;
            border-radius: 50px;
            width: auto;
            transition: border-color 0.2s ease-in-out;
          }

          .search-input:focus, .filter-input:focus {
            border-color: #2563eb;
            box-shadow: 0 0 5px rgba(37, 99, 235, 0.5);
          }

          .search-button {
            padding: 0.85rem 2rem;
            font-size: 1rem;
            color: #fff;
            background-color: #2563eb;
            border: none;
            border-radius: 50px;
            cursor: pointer;
            transition: background-color 0.2s ease-in-out;
          }

          .search-button:hover {
            background-color: #1d4ed8;
          }

          .travels-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 1.5rem;
          }

          .travel-card {
            background-color: #fff;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            overflow: hidden;
            transition: transform 0.2s ease-in-out;
          }

          .travel-card:hover {
            transform: translateY(-8px);
          }

          .travel-image {
            width: 100%;
            height: 200px;
            object-fit: cover;
          }

          .travel-content {
            padding: 1rem;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          }

          .travel-title {
            font-size: 1.25rem;
            font-weight: bold;
            color: #111827;
            margin-bottom: 0.5rem;
          }

          .travel-description {
            font-size: 0.875rem;
            color: #6b7280;
            margin-bottom: 1rem;
          }

          .travel-footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          .travel-price {
            font-size: 1rem;
            font-weight: bold;
            color: #16a34a;
          }

          .view-details {
            padding: 0.5rem 1rem;
            font-size: 0.875rem;
            color: #fff;
            background-color: #2563eb;
            text-decoration: none;
            border-radius: 5px;
            transition: background-color 0.2s ease-in-out;
          }

          .view-details:hover {
            background-color: #1d4ed8;
          }

          .no-results {
            text-align: center;
            font-size: 1.125rem;
            color: #6b7280;
          }
        `}
      </style>

      <h1 className="travels-title">Discover Your Next Adventure</h1>

      <form className="search-form" onSubmit={handleSearchAndFilter}>
        <input
          className="search-input"
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <input
          className="filter-input"
          type="number"
          placeholder="Min"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
        <input
          className="filter-input"
          type="number"
          placeholder="Max"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />

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

        <button className="search-button" type="submit">
          Search
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
                <div>
                  <h2 className="travel-title">{travel.name}</h2>
                  <p className="travel-description">{travel.description}</p>
                </div>
                <div className="travel-footer">
                  <p className="travel-price">${travel.price}</p>
                  <Link to={`/travels/${travel._id}`} className="view-details">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="no-results">No travels found</p>
        )}
      </div>
    </div>
  );
};

export default Travels;
