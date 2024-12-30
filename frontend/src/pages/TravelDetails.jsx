import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import API from "../utils/api";

const TravelDetails = () => {
  const { id } = useParams();
  const [travel, setTravel] = useState(null);

  useEffect(() => {
    const fetchTravel = async () => {
      try {
        const { data } = await API.get(`/travels/${id}`);
        setTravel(data);
      } catch (error) {
        console.error("Error fetching travel details:", error);
      }
    };
    fetchTravel();
  }, [id]);

  return (
    <div>
      {travel ? (
        <>
          <h1>{travel.destination}</h1>
          <p>{travel.info}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default TravelDetails;
