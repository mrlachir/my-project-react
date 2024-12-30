import React, { useState, useEffect } from "react";
import API from "../utils/api";

const Travels = () => {
  const [travels, setTravels] = useState([]);

  useEffect(() => {
    const fetchTravels = async () => {
      try {
        const { data } = await API.get("/travels");
        setTravels(data);
      } catch (error) {
        console.error("Error fetching travels:", error);
      }
    };
    fetchTravels();
  }, []);

  return (
    <div>
      <h1>Available Travels</h1>
      {travels.map((travel) => (
        <div key={travel._id}>
          <h2>{travel.name}</h2>
          <p>{travel.price}</p>
        </div>
      ))}
    </div>
  );
};

export default Travels;
