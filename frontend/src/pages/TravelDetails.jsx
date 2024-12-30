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

  // // Handle booking
  // const handleBooking = async () => {
  //   if (!bookingDate) {
  //     alert("Please select a date.");
  //     return;
  //   }
  //   try {
  //     const bookingData = {
  //       travelId: id,
  //       bookingDate,
  //     };
  //     // Make a POST request to the backend to create a booking
  //     await API.post("/bookings", bookingData);
  //     alert(`Booking confirmed for ${bookingDate}`);
  //   } catch (error) {
  //     console.error("Error booking the travel:", error);
  //     alert("Error confirming your booking.");
  //   }
  // };
  // Handle booking
const handleBooking = async () => {
  if (!bookingDate) {
    alert("Please select a date.");
    return;
  }
  
  const bookingData = {
    travelId: id,  // Ensure the travelId is correct
    bookingDate: bookingDate,  // Check if bookingDate is formatted correctly
  };

  try {
    // Make a POST request to the backend to create a booking
    const response = await API.post("/bookings", bookingData);
    console.log("Booking response:", response);  // Debug the response

    if (response.status === 200) {
      alert(`Booking confirmed for ${bookingDate}`);
    } else {
      alert("Error confirming your booking.");
    }
  } catch (error) {
    console.error("Error booking the travel:", error);
    alert("Error confirming your booking.");
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

  // // Handle review submission
  // const handleSubmitReview = async () => {
  //   if (!reviewText || rating === "") {
  //     alert("Please write a review and select a rating.");
  //     return;
  //   }
  //   try {
  //     const newReview = {
  //       travelId: id,
  //       rating,
  //       comment: reviewText,
  //     };
  //     // Send the new review to the backend
  //     const { data } = await API.post(`/reviews`, newReview);
  //     // Update the reviews state with the new review
  //     setReviews([...reviews, data.review]);
  //     // Clear the form fields
  //     setReviewText("");
  //     setRating(5);
  //   } catch (error) {
  //     console.error("Error submitting review:", error);
  //   }
  // };
  // Handle review submission
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

  try {
    const response = await API.post(`/reviews`, newReview);
    console.log("Review response:", response);  // Debug the response

    if (response.status === 200) {
      setReviews([...reviews, response.data.review]);
      setReviewText("");  // Clear the review text
      setRating(5);  // Reset rating to default
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
          <div>
            <h3>Book Your Trip</h3>
            <input
              type="date"
              value={bookingDate}
              onChange={(e) => setBookingDate(e.target.value)}
            />
            <button onClick={handleBooking}>Book Now</button>
          </div>
          <hr />

          {/* Review Section */}
          <div>
            <h3>Reviews</h3>
            <div>
              {reviews.length > 0 ? (
                reviews.map((review, index) => (
                  <div key={index} style={{ marginBottom: "10px" }}>
                    <p>
                      <strong>{review.user.name}</strong> - {review.rating}{" "}
                      Stars
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
