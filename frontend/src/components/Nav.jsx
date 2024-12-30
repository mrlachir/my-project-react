import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => (
  <nav>
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/travels">Travels</Link></li>
      <li><Link to="/profile">Profile</Link></li>
      <li><Link to="/login">Login</Link></li>
      <li><Link to="/register">Register</Link></li>
    </ul>
  </nav>
);

export default Nav;
