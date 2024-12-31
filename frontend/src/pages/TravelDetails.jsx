import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../utils/api";

const Travel = () => {
  const { id } = useParams(); // Get the travel ID from the URL
  const [travel, setTravel] = useState(null);
  const [recommendedTravels, setRecommendedTravels] = useState([]);
  const [bookingDate, setBookingDate] = useState(""); // Selected date for booking
  const [reviewText, setReviewText] = useState(""); // Review text input
  const [rating, setRating] = useState(5); // Default rating (can be adjusted)
  const [reviews, setReviews] = useState([]);

  // Fetch travel info by ID
  useEffect(() => {
    const fetchTravel = async () => {
      try {
        const { data } = await API.get(`/travels/${id}`);
        setTravel(data);
      } catch (error) {
        console.error("Error fetching travel info:", error);
      }
    };
    fetchTravel();
  }, [id]);

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

  // Fetch reviews for the specific travel
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data } = await API.get(`/reviews/${id}`);
        setReviews(data.reviews || []);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    fetchReviews();
  }, [id]);

  // Add these new state variables at the top with your other useState declarations
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [numberOfPeople, setNumberOfPeople] = useState(1);

  // Update the handleBooking function
  const handleBooking = async () => {
    if (!startDate || !endDate || !numberOfPeople) {
      alert("Please fill in all booking details.");
      return;
    }

    const bookingData = {
      travelId: id,
      startDate: startDate,
      endDate: endDate,
      numberOfPeople: parseInt(numberOfPeople),
    };

    try {
      const response = await API.post("/bookings", bookingData);
      console.log("Booking response:", response);

      if (response.status === 201) {
        alert("Booking confirmed successfully!");
      } else {
        alert("Error confirming your booking.");
      }
    } catch (error) {
      console.error("Error booking the travel:", error);
      alert(error.response?.data?.message || "Error confirming your booking.");
    }
  };

  const fetchRecommendedTravels = async () => {
    try {
      const { data } = await API.get("/travels/recommended"); // Call the new backend route
      setRecommendedTravels(data);
    } catch (error) {
      console.error("Error fetching recommended travels:", error);
    }
  };

  // Handle review submission
  // const handleSubmitReview = async () => {
  //   if (!reviewText || rating === "") {
  //     alert("Please write a review and select a rating.");
  //     return;
  //   }

  //   const newReview = {
  //     travelId: id,
  //     rating,
  //     comment: reviewText,
  //   };

  //   try {
  //     const response = await API.post(`/reviews`, newReview);
  //     console.log("Review response:", response); // Debug the response

  //     if (response.status === 200) {
  //       setReviews([...reviews, response.data.review]);
  //       setReviewText(""); // Clear the review text
  //       setRating(5); // Reset rating to default
  //       alert("Review submitted successfully!");
  //     } else {
  //       alert("Failed to submit your review.");
  //     }
  //   } catch (error) {
  //     console.error("Error submitting review:", error);
  //     alert("Error submitting your review.");
  //   }
  // };
  const handleSubmitReview = async () => {
    if (!reviewText || rating === "") {
      alert("Please write a review and select a rating.");
      return;
    }
  
    const newReview = {
      travelId: id,
      rating,
      comment: reviewText,
    };
  
    console.log("Submitting review:", newReview); // Debugging
  
    try {
      const response = await API.post(`/reviews`, newReview);
      console.log("Review response:", response); // Debugging
  
      if (response.status === 200 || response.status === 201) {
        setReviews([...reviews, response.data.review]);
        setReviewText(""); // Clear the review text
        setRating(5); // Reset rating to default
        alert("Review submitted successfully!");
      } else {
        alert("Failed to submit your review.");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Error submitting your review.");
    }
  };

  return (
    <div>
      {travel && (
        <div>
          {/* Travel Info Section */}
          {travel.image && (
              <img src={travel.image} alt={travel.name} width="100" /> // Display image if URL is provided
            )}
          <h1>{travel.name}</h1>
          <p>{travel.description}</p>
          <p>Price: ${travel.price}</p>
          <h3>Available Dates:</h3>
          <ul>
            {travel.availableDates.map((date, index) => (
              <li key={index}>{new Date(date).toLocaleDateString()}</li>
            ))}
          </ul>
          <hr />

          {/* Booking Section */}
          {/* <div>
            <h3>Book Your Trip</h3>
            <input
              type="date"
              value={bookingDate}
              onChange={(e) => setBookingDate(e.target.value)}
            />
            <button onClick={handleBooking}>Book Now</button>
          </div>
          <hr /> */}
          {/* Booking Section */}
          <div>
            <h3>Book Your Trip</h3>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <div>
                <label>Start Date: </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div>
                <label>End Date: </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
              <div>
                <label>Number of People: </label>
                <input
                  type="number"
                  min="1"
                  value={numberOfPeople}
                  onChange={(e) => setNumberOfPeople(e.target.value)}
                />
              </div>
              <button onClick={handleBooking}>Book Now</button>
            </div>
          </div>
          {/* Review Section */}
          <div>
            <h3>Reviews</h3>
            <div>
              {reviews.length > 0 ? (
                reviews.map((review, index) => (
                  <div key={index} style={{ marginBottom: "10px" }}>
                    <p>
                    <strong>{review.user?.name || "You"}</strong> - {review.rating} Stars
                    </p>
                    <p>{review.comment}</p>
                  </div>
                ))
              ) : (
                <p>No reviews yet.</p>
              )}
            </div>
            <hr />

            {/* Review Form */}
            <div>
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Write your review..."
              />
              <div>
                <label>Rating: </label>
                <select
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                >
                  {[1, 2, 3, 4, 5].map((star) => (
                    <option key={star} value={star}>
                      {star} Star{star > 1 ? "s" : ""}
                    </option>
                  ))}
                </select>
              </div>
              <button onClick={handleSubmitReview}>Submit Review</button>
            </div>
          </div>
          <hr />
          {/* Recommended Travels */}
          <main style={styles.main}>
            <h1 style={styles.title}>Recommended Travels</h1>
            <div style={styles.recommendations}>
              {recommendedTravels.length > 0 ? (
                recommendedTravels.map((travel) => (
                  <div key={travel._id} style={styles.travelCard}>
                    {travel.image && (
              <img src={travel.image} alt={travel.name} width="100" /> // Display image if URL is provided
            )}
                    <h2>{travel.name}</h2>
                    <p>{travel.description}</p>
                    <p>Price: ${travel.price}</p>
                    <Link
                      to={`/travels/${travel._id}`}
                      style={styles.viewDetails}
                    >
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
      )}
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

export default Travel;
