import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// Get the root DOM element
const rootElement = document.getElementById("root");

// Create a root and render the App component
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
