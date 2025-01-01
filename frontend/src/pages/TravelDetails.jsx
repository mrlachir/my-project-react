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
    }
  };

  return (
    <div>
      <style>
        {`
          .travel-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem;
          }

          .travel-header {
            margin-bottom: 2rem;
          }

          .travel-image {
            width: 100%;
            height: 400px;
            object-fit: cover;
            border-radius: 8px;
            margin-bottom: 1.5rem;
          }

          .travel-title {
            font-size: 2.5rem;
            color: #1a1a1a;
            margin-bottom: 1rem;
          }

          .travel-description {
            font-size: 1.125rem;
            color: #4b5563;
            line-height: 1.6;
            margin-bottom: 1.5rem;
          }

          .travel-price {
            font-size: 1.5rem;
            color: #2563eb;
            font-weight: 600;
            margin-bottom: 1.5rem;
          }

          .dates-list {
            list-style: none;
            padding: 0;
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 0.5rem;
            margin-bottom: 2rem;
          }

          .dates-list li {
            background-color: #f3f4f6;
            padding: 0.5rem 1rem;
            border-radius: 4px;
            text-align: center;
          }

          .section-title {
            font-size: 1.5rem;
            color: #1a1a1a;
            margin-bottom: 1.5rem;
            padding-bottom: 0.5rem;
            border-bottom: 2px solid #e5e7eb;
          }

          .booking-form {
            background-color: #ffffff;
            padding: 1.5rem;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            margin-bottom: 2rem;
          }

          .form-group {
            margin-bottom: 1rem;
          }

          .form-label {
            display: block;
            margin-bottom: 0.5rem;
            color: #374151;
            font-weight: 500;
          }

          .form-input {
            width: 100%;
            padding: 0.75rem;
            border: 1px solid #d1d5db;
            border-radius: 4px;
            font-size: 1rem;
          }

          .form-input:focus {
            outline: none;
            border-color: #2563eb;
            box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
          }

          .book-button {
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

          .book-button:hover {
            background-color: #1d4ed8;
          }

          .reviews-section {
            margin-bottom: 2rem;
          }

          .review-card {
            background-color: #ffffff;
            padding: 1.25rem;
            border-radius: 8px;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
            margin-bottom: 1rem;
          }

          .review-header {
            display: flex;
            justify-content: space-between;
            margin-bottom: 0.5rem;
          }

          .reviewer-name {
            font-weight: 600;
            color: #1a1a1a;
          }

          .review-rating {
            color: #2563eb;
          }

          .review-form {
            margin-top: 2rem;
          }

          .review-textarea {
            width: 100%;
            padding: 0.75rem;
            border: 1px solid #d1d5db;
            border-radius: 4px;
            min-height: 100px;
            margin-bottom: 1rem;
            font-family: inherit;
          }

          .rating-select {
            padding: 0.5rem;
            border: 1px solid #d1d5db;
            border-radius: 4px;
            margin-bottom: 1rem;
          }

          .submit-review-button {
            background-color: #2563eb;
            color: white;
            padding: 0.75rem 1.5rem;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            transition: background-color 0.15s ease-in-out;
          }

          .submit-review-button:hover {
            background-color: #1d4ed8;
          }

          .recommendations {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 1.5rem;
            margin-top: 2rem;
          }

          .recommendation-card {
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            overflow: hidden;
            transition: transform 0.2s ease-in-out;
          }

          .recommendation-card:hover {
            transform: translateY(-4px);
          }

          .recommendation-image {
            width: 100%;
            height: 200px;
            object-fit: cover;
          }

          .recommendation-content {
            padding: 1.25rem;
          }

          .recommendation-title {
            font-size: 1.25rem;
            color: #1a1a1a;
            margin-bottom: 0.5rem;
          }

          .recommendation-link {
            color: #2563eb;
            text-decoration: none;
            font-weight: 500;
            display: inline-block;
            margin-top: 1rem;
          }

          .recommendation-link:hover {
            text-decoration: underline;
          }

          .divider {
            height: 1px;
            background-color: #e5e7eb;
            margin: 2rem 0;
          }
        `}
      </style>

      {travel && (
        <div className="travel-container">
          <div className="travel-header">
            {travel.image && (
              <img src={travel.image} alt={travel.name} className="travel-image" />
            )}
            <h1 className="travel-title">{travel.name}</h1>
            <p className="travel-description">{travel.description}</p>
            <p className="travel-price">Price: ${travel.price}</p>
            <h3 className="section-title">Available Dates</h3>
            <ul className="dates-list">
              {travel.availableDates.map((date, index) => (
                <li key={index}>{new Date(date).toLocaleDateString()}</li>
              ))}
            </ul>
          </div>

          <div className="booking-form">
            <h3 className="section-title">Book Your Trip</h3>
            <div className="form-group">
              <label className="form-label">Start Date</label>
              <input
                className="form-input"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">End Date</label>
              <input
                className="form-input"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Number of People</label>
              <input
                className="form-input"
                type="number"
                min="1"
                value={numberOfPeople}
                onChange={(e) => setNumberOfPeople(e.target.value)}
              />
            </div>
            <button className="book-button" onClick={handleBooking}>
              Book Now
            </button>
          </div>

          <div className="reviews-section">
            <h3 className="section-title">Reviews</h3>
            <div>
              {reviews.length > 0 ? (
                reviews.map((review, index) => (
                  <div key={index} className="review-card">
                    <div className="review-header">
                      <span className="reviewer-name">
                        {review.user?.name || "You"}
                      </span>
                      <span className="review-rating">{review.rating} Stars</span>
                    </div>
                    <p>{review.comment}</p>
                  </div>
                ))
              ) : (
                <p>No reviews yet.</p>
              )}
            </div>

            <div className="review-form">
              <textarea
                className="review-textarea"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Write your review..."
              />
              <div className="form-group">
                <label className="form-label">Rating</label>
                <select
                  className="rating-select"
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
              <button className="submit-review-button" onClick={handleSubmitReview}>
                Submit Review
              </button>
            </div>
          </div>

          <div className="divider" />

          <div>
            <h3 className="section-title">Recommended Travels</h3>
            <div className="recommendations">
              {recommendedTravels.length > 0 ? (
                recommendedTravels.slice(0, 3).map((recommendedTravel) => (
                  <div key={recommendedTravel._id} className="recommendation-card">
                    {recommendedTravel.image && (
                      <img
                        src={recommendedTravel.image}
                        alt={recommendedTravel.name}
                        className="recommendation-image"
                      />
                    )}
                    <div className="recommendation-content">
                      <h2 className="recommendation-title">
                        {recommendedTravel.name}
                      </h2>
                      <p>{recommendedTravel.description}</p>
                      <p className="travel-price">${recommendedTravel.price}</p>
                      <Link
                        to={`/travels/${recommendedTravel._id}`}
                        className="recommendation-link"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <p>No recommendations available</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Travel;