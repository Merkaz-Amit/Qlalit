import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavigationBar from './compenents/NavigationBar';
import Home from './pages/Home';
import NewAppointment from './pages/NewAppointment/';
import AvailableDates from './pages/FreeAppointmentsList/';
import SearchByName from './pages/SearchAppointmentByName/'
import ReactDOM from "react-dom";
const App = () => {
  return (
    <Router>
      <div>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/appointments" element={<AvailableDates />} />
          <Route path="/new-appointment" element={<NewAppointment />} />
		      <Route path="/search-appointments" element={<SearchByName />} />
        </Routes>
        <link rel = 'stylesheet' href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" />
        <favicon rel = 'favicon'/>
      </div>
    </Router>
  );
};
export default App;
ReactDOM.render(<App/>, document.getElementById("root"));
