import React from 'react';
import { Link } from 'react-router-dom';
import './NavigationBar.css'; // Import CSS file for styling

const NavigationBar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/appointments" className="nav-link">Free Appointments</Link>
          <Link to="/searchappointments" className="nav-link">Search Appointments</Link>
		  <Link to="/searchbyname" className='nav-link'>Search Appointments By Name</Link>

        </li>
      </ul>
    </nav>
  );
};

export default NavigationBar;
