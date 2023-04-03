import React from 'react';
import { Link } from 'react-router-dom';
import "./header.css"
const header = () => {
  return (
    <header className="header">
  <nav className="navbar">
    <div className="logo">
      <img src="logo.png" alt="e-learning logo" />
      <h1>E-Learning</h1>
    </div>
    <ul className="nav-links">
      <li className="nav-item">
        <Link to="/" className="nav-link">Home</Link>
      </li>
      <li className="nav-item">
        <Link to="/courses" className="nav-link">Courses</Link>
      </li>
      <li className="nav-item">
        <Link to="/login" className="nav-link">Login</Link>
      </li>
      <li className="nav-item">
        <Link to="/register" className="nav-link">Register</Link>
      </li>
      <li className="nav-item">
        <Link to="/profile" className="nav-link">Profile</Link>
      </li>
      <li className="nav-item">
        <Link to="/admin" className="nav-link">Admin Panel</Link>
      </li>
    </ul>
  </nav>
</header>
  );
};

export default header;