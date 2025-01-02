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
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  background-color: #f8fafc;
}

/* Top section: Image left, Info right */
.travel-header {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  background: white;
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  margin-bottom: 2rem;
}

.image-section {
  width: 99%;
}

.travel-image {
  width: 99%;
  height: 500px;
  object-fit: cover;
  border-radius: 15px;
}

.info-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.travel-title {
  font-size: 2.5rem;
  color: #111827;
  font-weight: 700;
}

.travel-description {
  font-size: 1.1rem;
  color: #4b5563;
  line-height: 1.6;
}

.travel-price {
  font-size: 1.8rem;
  color: #0f766e;
  font-weight: 600;
  padding: 0.5rem 1rem;
  background: #f0fdfa;
  border-radius: 10px;
  display: inline-block;
}

.dates-title {
  font-size: 1.5rem;
  color: #111827;
  margin-top: 1rem;
}

.dates-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  list-style: none;
  padding: 0;
}

.dates-list li {
  background: #f3f4f6;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 0.9rem;
}

/* Middle section: Reviews left, Booking right */
.content-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 2rem;
}

/* Reviews Section */
.reviews-section {
  background: white;
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.reviews-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.review-card {
  background: #f8fafc;
  padding: 1.5rem;
  border-radius: 12px;
}

.review-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.reviewer-name {
  font-weight: 600;
  color: #111827;
}

.review-rating {
  color: #0f766e;
  background: #f0fdfa;
  padding: 0.25rem 0.75rem;
  border-radius: 6px;
}

.review-comment {
  color: #4b5563;
  line-height: 1.5;
}

/* Booking Form */
.booking-form {
  background: white;
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.section-title {
  font-size: 1.8rem;
  color: #111827;
  margin-bottom: 1.5rem;
  font-weight: 600;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-label {
  display: block;
  margin-bottom: 0.5rem;
  color: #374151;
  font-weight: 500;
}

.form-input {
  width: 99%;
  padding: 0.75rem;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.2s;
}

.form-input:focus {
  border-color: #0f766e;
  outline: none;
  box-shadow: 0 0 0 3px rgba(15, 118, 110, 0.1);
}

.book-button {
  width: 99%;
  padding: 1rem;
  background: #0f766e;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.book-button:hover {
  background: #115e59;
  transform: translateY(-2px);
}

/* Review Form */
.review-form {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #e5e7eb;
}

.review-textarea {
  width: 99%;
  padding: 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  min-height: 120px;
  margin-bottom: 1rem;
  font-family: inherit;
  resize: vertical;
  transition: all 0.2s;
}

.review-textarea:focus {
  border-color: #0f766e;
  outline: none;
  box-shadow: 0 0 0 3px rgba(15, 118, 110, 0.1);
}

.rating-select {
  width: 99%;
  padding: 0.75rem;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  margin-bottom: 1rem;
  transition: all 0.2s;
}

.submit-review-button {
  background: #0f766e;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.submit-review-button:hover {
  background: #115e59;
  transform: translateY(-2px);
}

/* Recommendations Section */
.recommendations-section {
  background: white;
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.recommendations {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.recommendation-card {
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s;
}

.recommendation-card:hover {
  transform: translateY(-5px);
}

.recommendation-image {
  width: 99%;
  height: 200px;
  object-fit: cover;
}

.recommendation-content {
  padding: 1.5rem;
}

.recommendation-title {
  font-size: 1.3rem;
  color: #111827;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.recommendation-description {
  color: #4b5563;
  margin-bottom: 1rem;
  line-height: 1.5;
}

.recommendation-price {
  color: #0f766e;
  font-weight: 600;
  font-size: 1.2rem;
  margin-bottom: 1rem;
}

.recommendation-link {
  display: inline-block;
  color: #0f766e;
  text-decoration: none;
  font-weight: 600;
  padding: 0.5rem 1rem;
  background: #f0fdfa;
  border-radius: 8px;
  transition: all 0.2s;
}

.recommendation-link:hover {
  background: #0f766e;
  color: white;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .travel-header,
  .content-wrapper {
    grid-template-columns: 1fr;
  }
  
  .recommendations {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .travel-image {
    height: 400px;
  }
}

@media (max-width: 768px) {
  .travel-container {
    padding: 1rem;
  }
  
  .recommendations {
    grid-template-columns: 1fr;
  }
  
  .travel-title {
    font-size: 2rem;
  }
}
        `}
      </style>

      {travel && (
        <div className="travel-container">
          {/* Top section: Image left, Info right */}
          <div className="travel-header">
            <div className="image-section">
              {travel.image && (
                <img
                  src={travel.image}
                  alt={travel.name}
                  className="travel-image"
                />
              )}
            </div>
            <div className="info-section">
              <h1 className="travel-title">{travel.name}</h1>
              <p className="travel-description">{travel.description}</p>
              <p className="travel-price">Price: ${travel.price}</p>
              <h3 className="dates-title">Available Dates</h3>
              <ul className="dates-list">
                {travel.availableDates.map((date, index) => (
                  <li key={index}>{new Date(date).toLocaleDateString()}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Middle section: Reviews left, Booking right */}
          <div className="content-wrapper">
            {/* Reviews Section */}
            <div className="reviews-section">
              <h3 className="section-title">Reviews</h3>
              <div className="reviews-list">
                {reviews.length > 0 ? (
                  reviews.map((review, index) => (
                    <div key={index} className="review-card">
                      <div className="review-header">
                        <span className="reviewer-name">
                          {review.user?.name || "Anonymous"}
                        </span>
                        <span className="review-rating">
                          {review.rating} Stars
                        </span>
                      </div>
                      <p className="review-comment">{review.comment}</p>
                    </div>
                  ))
                ) : (
                  <p className="no-reviews">No reviews yet.</p>
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
                <button
                  className="submit-review-button"
                  onClick={handleSubmitReview}
                >
                  Submit Review
                </button>
              </div>
            </div>

            {/* Booking Section */}
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
          </div>

          {/* Bottom section: Recommendations */}
          <div className="recommendations-section">
            <h3 className="section-title">Recommended Travels</h3>
            <div className="recommendations">
              {recommendedTravels.length > 0 ? (
                recommendedTravels.slice(0, 3).map((recommendedTravel) => (
                  <div
                    key={recommendedTravel._id}
                    className="recommendation-card"
                  >
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
                      <p className="recommendation-description">
                        {recommendedTravel.description}
                      </p>
                      <p className="recommendation-price">
                        ${recommendedTravel.price}
                      </p>
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
                <p className="no-recommendations">
                  No recommendations available
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Travel;
