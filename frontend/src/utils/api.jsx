// Import the axios library for making HTTP requests
import axios from "axios";

// Create an axios instance with a base URL pointing to the backend server
const API = axios.create({
  baseURL: "http://localhost:5000", // Replace with your backend server's URL
});

// Use axios interceptors to modify requests before they are sent
// This interceptor adds a JWT token to the headers if it's available in localStorage
API.interceptors.request.use((config) => {
  // Retrieve the JWT token from the browser's localStorage
  const token = localStorage.getItem("token");
  
  // If a token exists, attach it to the Authorization header as a Bearer token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  // Return the modified config object to proceed with the request
  return config;
});

// Export the configured axios instance for use in other parts of the application
export default API;
