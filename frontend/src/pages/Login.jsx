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
    setErrors({}); // Clear previous errors
    setIsLoading(true);

    try {
      const response = await API.post("/auth/login", formData);
      const { token, user } = response.data;

      // Save token to localStorage or a secure cookie
      localStorage.setItem("token", token);

      // Redirect to the profile or home page
      navigate("/profile");
    } catch (error) {
      setIsLoading(false);

      if (error.response && error.response.status === 401) {
        setErrors({ server: "Invalid email or password." });
      } else if (error.response) {
        setErrors({ server: error.response.data.message });
      } else {
        setErrors({ server: "Something went wrong. Please try again later." });
      }
    }
  };

  return (
    <div>
      <h1>Login</h1>
      {errors.server && <p style={{ color: "red" }}>{errors.server}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
