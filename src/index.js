import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavigationBar from './compenents/NavigationBar';
import Home from './pages/Home';
import AppointmentForm from './pages/NewAppointment/';
import AvailableDates from './pages/FreeAppointmentsList/';
import SearchByName from './pages/SearchAppointmentByName/';
import WorkDaysForm from './pages/WorkingDates/';
import DoctorsList from './pages/Doctors/';
import AppointmentsByDoctorChart from './pages/Charts';
import ReactDOM from "react-dom";
const App = () => {
  return (
    <Router>
      <div>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/available-dates" element={<AvailableDates />} />
          <Route path="/new-appointment" element={<AppointmentForm />} />
		      <Route path="/search-appointments" element={<SearchByName />} />
          <Route path="/work-days" element={<WorkDaysForm />} />
          <Route path="/doctors" element={<DoctorsList />} />
          <Route path="/doctors-chart" element={<AppointmentsByDoctorChart />} />

        </Routes>
        <link rel = 'stylesheet' href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" />
        <favicon rel = 'favicon'/>
      </div>
    </Router>
  );
};
export default App;
ReactDOM.render(<App/>, document.getElementById("root"));
