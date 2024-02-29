import './index.css';
import ButtonLink from '../Util/Buttons';
const NavigationBar = () => {
  return (
    <div>
      <nav className="navbar">
        <ul className="navbar-nav">
        <li className="nav-item">
          {ButtonLink("navBar", "/", 'Home')}
          {ButtonLink("navBar", "/available-dates", 'Available Dates')}
          {ButtonLink("navBar", "/search-appointments", 'Search Appointments')}
          {ButtonLink("navBar", "/work-days", 'New Work Day')}
          {ButtonLink("navBar", "/doctors", 'Doctors')}
          {ButtonLink("navBar", "/doctors-chart", 'Doctors Chart')}
          {ButtonLink("navBar", "/doctor-management", 'Doctor Management')}
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavigationBar;
