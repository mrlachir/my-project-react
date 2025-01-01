import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/api"; // Adjust the path based on your file structure

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({}); // Clear previous errors (if any)
    setIsLoading(true); // Set loading state to true

    try {
      const response = await API.post("/auth/login", formData);
      const { token, user } = response.data;

      // Save token to localStorage
      localStorage.setItem("token", token);

      // Optionally, store the user's data (e.g., name, email)
      localStorage.setItem("user", JSON.stringify(user));

      // Redirect to the profile page (or dashboard)
      navigate("/profile");
    } catch (error) {
      setIsLoading(false); // Set loading state to false on error

      // Check if the error response exists and handle based on the status code
      if (error.response) {
        if (error.response.status === 401) {
          // If it's a 401 Unauthorized error (invalid credentials)
          setErrors({ server: "Invalid email or password." });
        } else {
          // Handle other errors returned from the server
          setErrors({
            server:
              error.response.data.message ||
              "An error occurred. Please try again later.",
          });
        }
      } else {
        // For any network or unexpected errors (e.g., no internet)
        setErrors({ server: "Something went wrong. Please try again later." });
      }
    }
  };
  return (
    <div>
      <style>
        {`
          .login-container {
            max-width: 400px;
            margin: 2rem auto;
            padding: 2rem;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }

          .login-title {
            text-align: center;
            color: #1a1a1a;
            font-size: 1.875rem;
            font-weight: 600;
            margin-bottom: 1.5rem;
          }

          .server-error {
            background-color: #fee2e2;
            color: #dc2626;
            padding: 0.75rem;
            border-radius: 4px;
            margin-bottom: 1rem;
            font-size: 0.875rem;
          }

          .form-group {
            margin-bottom: 1.5rem;
          }

          .form-label {
            display: block;
            color: #374151;
            font-size: 0.875rem;
            font-weight: 500;
            margin-bottom: 0.5rem;
          }

          .form-input {
            width: 100%;
            padding: 0.75rem;
            border: 1px solid #d1d5db;
            border-radius: 4px;
            font-size: 1rem;
            transition: border-color 0.15s ease-in-out;
          }

          .form-input:focus {
            outline: none;
            border-color: #2563eb;
            box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
          }

          .error-message {
            color: #dc2626;
            font-size: 0.75rem;
            margin-top: 0.25rem;
          }

          .submit-button {
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

          .submit-button:hover:not(:disabled) {
            background-color: #1d4ed8;
          }

          .submit-button:disabled {
            background-color: #93c5fd;
            cursor: not-allowed;
          }
        `}
      </style>

      <div className="login-container">
        <h1 className="login-title">Login</h1>
        {errors.server && (
          <div className="server-error">{errors.server}</div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="email">
              Email:
            </label>
            <input
              className="form-input"
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <p className="error-message">{errors.email}</p>
            )}
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="password">
              Password:
            </label>
            <input
              className="form-input"
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && (
              <p className="error-message">{errors.password}</p>
            )}
          </div>
          <button
            className="submit-button"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;