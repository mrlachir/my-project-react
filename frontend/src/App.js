import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import Travels from "./pages/Travels";
import OwnTravels from "./pages/OwnTravels";
import TravelDetails from "./pages/TravelDetails";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/travels" element={<Travels />} />
        <Route path="/owntravels" element={<OwnTravels />} />
        <Route path="/travels/:id" element={<TravelDetails />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
