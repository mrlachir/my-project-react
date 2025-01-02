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
            display: flex;
            flex-wrap: wrap;
            gap: 2rem;
            background: #ffffff;
            padding: 2rem;
            border-radius: 16px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            margin-bottom: 2rem;
          }

          .image-section {
            flex: 1;
            max-width: 100%;
          }

          .travel-image {
            width: 100%;
            height: 100%;
            max-height: 400px;
            object-fit: cover;
            border-radius: 12px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
          }

          .info-section {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            gap: 1rem;
          }

          .travel-title {
            font-size: 2rem;
            color: #1f2937;
            font-weight: bold;
            margin-bottom: 0.5rem;
          }

          .travel-description {
            font-size: 1rem;
            color: #6b7280;
            line-height: 1.5;
            margin-bottom: 1rem;
          }

          .travel-price {
            font-size: 1.5rem;
            color: #059669;
            font-weight: 600;
            padding: 0.5rem 1rem;
            background: #ecfdf5;
            border-radius: 8px;
            align-self: flex-start;
          }

          .dates-title {
            font-size: 1.3rem;
            color: #1f2937;
            margin-top: 1rem;
            font-weight: bold;
          }

          .dates-list {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
            padding: 0;
            margin: 0;
            list-style: none;
          }

          .dates-list li {
            background: #f9fafb;
            padding: 0.5rem 1rem;
            border-radius: 6px;
            font-size: 0.9rem;
            color: #4b5563;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          }

          /* Responsive Adjustments */
          @media (max-width: 1024px) {
            .travel-header {
              flex-direction: column;
              gap: 1.5rem;
            }

            .travel-image {
              max-height: 300px;
            }

            .travel-title {
              font-size: 1.8rem;
            }

            .travel-price {
              font-size: 1.3rem;
            }

            .dates-title {
              font-size: 1.2rem;
            }
          }


          /* Middle section: Reviews left, Booking right */
          .content-wrapper {
            display: flex;
            flex-wrap: wrap;
            gap: 2rem;
            margin-bottom: 2rem;
          }

          /* Reviews Section */
          .reviews-section {
            flex: 1;
            background: #ffffff;
            padding: 2rem;
            border-radius: 16px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          }

          .reviews-list {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
          }

          .review-card {
            background: #f9fafb;
            padding: 1.5rem;
            border-radius: 12px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
          }

          .review-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 0.75rem;
          }

          .reviewer-name {
            font-weight: bold;
            color: #1f2937;
          }

          .review-rating {
            color: #047857;
            background: #d1fae5;
            padding: 0.25rem 0.75rem;
            border-radius: 6px;
            font-size: 0.9rem;
            font-weight: bold;
          }

          .review-comment {
            color: #6b7280;
            line-height: 1.6;
          }

          /* Booking Form */
          .booking-form {
            flex: 1;
            background: #ffffff;
            padding: 2rem;
            border-radius: 16px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          }

          .section-title {
            font-size: 1.6rem;
            color: #1f2937;
            margin-bottom: 1rem;
            font-weight: bold;
          }

          .form-group {
            margin-bottom: 1.5rem;
          }

          .form-label {
            display: block;
            margin-bottom: 0.5rem;
            color: #374151;
            font-weight: medium;
          }

          .form-input {
            width: 100%;
            padding: 0.75rem;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            font-size: 1rem;
            transition: border-color 0.2s, box-shadow 0.2s;
          }

          .form-input:focus {
            border-color: #047857;
            outline: none;
            box-shadow: 0 0 0 3px rgba(4, 120, 87, 0.2);
          }

          .book-button {
            width: 100%;
            padding: 1rem;
            background: #047857;
            color: #ffffff;
            border: none;
            border-radius: 8px;
            font-size: 1.1rem;
            font-weight: bold;
            cursor: pointer;
            transition: background-color 0.2s, transform 0.2s;
          }

          .book-button:hover {
            background: #065f46;
            transform: translateY(-2px);
          }

          /* Review Form */
          .review-form {
            margin-top: 2rem;
            padding-top: 2rem;
            border-top: 1px solid #e5e7eb;
          }

          .review-textarea {
            width: 94%;
            padding: 1rem;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            // min-height: 40px;
            margin-bottom: 1rem;
            font-family: inherit;
            resize: vertical;
            transition: border-color 0.2s, box-shadow 0.2s;
          }

          .review-textarea:focus {
            border-color: #047857;
            outline: none;
            box-shadow: 0 0 0 3px rgba(4, 120, 87, 0.2);
          }

          .rating-select {
            width: 100%;
            padding: 0.75rem;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            margin-bottom: 1rem;
            font-size: 1rem;
            transition: border-color 0.2s, box-shadow 0.2s;
          }

          .rating-select:focus {
            border-color: #047857;
            outline: none;
            box-shadow: 0 0 0 3px rgba(4, 120, 87, 0.2);
          }

          .submit-review-button {
            background: #047857;
            color: #ffffff;
            padding: 0.75rem 1.5rem;
            border: none;
            border-radius: 8px;
            font-size: 1rem;
            font-weight: bold;
            cursor: pointer;
            transition: background-color 0.2s, transform 0.2s;
          }

          .submit-review-button:hover {
            background: #065f46;
            transform: translateY(-2px);
          }

          /* Responsive Adjustments */
          @media (max-width: 768px) {
            .content-wrapper {
              flex-direction: column;
            }

            .section-title {
              font-size: 1.4rem;
            }

            .book-button,
            .form-input {
              font-size: 1rem;
            }
          }

          /* Recommendations Section */
          .recommendations-section {
            background: #ffffff;
            padding: 2rem;
            border-radius: 16px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          }

          .recommendations {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 1.5rem;
          }

          .recommendation-card {
            background: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }

          .recommendation-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
          }

          .recommendation-image {
            width: 100%;
            height: 180px;
            object-fit: cover;
            border-bottom: 2px solid #e5e7eb;
          }

          .recommendation-content {
            padding: 1rem 1.5rem;
          }

          .recommendation-title {
            font-size: 1.4rem;
            color: #1f2937;
            margin-bottom: 0.75rem;
            font-weight: bold;
          }

          .recommendation-description {
            font-size: 0.95rem;
            color: #6b7280;
            line-height: 1.6;
            margin-bottom: 1rem;
          }

          .recommendation-price {
            font-size: 1.2rem;
            color: #047857;
            font-weight: bold;
            margin-bottom: 1rem;
          }

          .recommendation-link {
            display: inline-block;
            font-size: 1rem;
            font-weight: bold;
            color: #047857;
            text-decoration: none;
            background: #d1fae5;
            padding: 0.5rem 1rem;
            border-radius: 8px;
            transition: background-color 0.2s ease, color 0.2s ease;
          }

          .recommendation-link:hover {
            background: #047857;
            color: #ffffff;
          }

          /* Responsive Design */
          @media (max-width: 1024px) {
            .recommendations {
              grid-template-columns: repeat(2, 1fr);
            }

            .recommendation-image {
              height: 160px;
            }
          }

          @media (max-width: 768px) {
            .recommendations {
              grid-template-columns: 1fr;
            }

            .recommendation-content {
              padding: 1rem;
            }

            .recommendation-title {
              font-size: 1.2rem;
            }

            .recommendation-price {
              font-size: 1.1rem;
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
