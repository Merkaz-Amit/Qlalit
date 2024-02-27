import { Link } from 'react-router-dom';
import './NavigationBar.css';
const NavigationBar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/available-dates" className="nav-link">Available Dates</Link>
          <Link to="/search-appointments" className="nav-link">Search Appointments</Link>
          <Link to="/work-days" className="nav-link">New Work Day</Link>
          <Link to="/doctors" className="nav-link">Doctors</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavigationBar;
