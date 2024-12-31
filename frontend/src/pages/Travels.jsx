import React, { useState, useEffect } from "react";
import API from "../utils/api";

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
      <h1>Available Travels</h1>

      {/* Search and Filter Form */}
      <form onSubmit={handleSearchAndFilter}>
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search by name or description"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Price Filter */}
        <div>
          <input
            type="number"
            placeholder="Min Price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
          <input
            type="number"
            placeholder="Max Price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>

        {/* Date Range Filter */}
        <div>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

        {/* Submit Button to apply search and filter */}
        <button type="submit">Search & Filter</button>
      </form>

      {/* Display Travels */}
      {travels.length > 0 ? (
        travels.map((travel) => (
          <div key={travel._id}>
            <h2>{travel.name}</h2>
            <p>{travel.description}</p>
            <p>Price: ${travel.price}</p>
            <p>Available Dates: {travel.availableDates.join(", ")}</p>
            {travel.image && (
              <img src={travel.image} alt={travel.name} width="100" /> // Display image if URL is provided
            )}
          </div>
        ))
      ) : (
        <p>No travels found</p>
      )}
    </div>
  );
};

export default Travels;
