import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavigationBar from './compenents/NavigationBar';
import Home from './Home';
import NewAppointment from './newAppointment';
import Appointments from './Appointments';
import SearchByName from './searchAppointmentByName'
import EnhancedTable from './searchAppointments';
import ReactDOM from "react-dom";
const App = () => {
  return (
    <Router>
      <div>
        
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/newappointment" element={<NewAppointment />} />
		      <Route path="/searchbyname" element={<SearchByName />} />
          <Route path="/searchAppointments" element={<EnhancedTable />} />
        </Routes>
        <link rel = 'stylesheet' href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" />
        <favicon rel = 'favicon'/>
        <title title='Oshri'/>
      </div>
    </Router>
    
  );
};

export default App;
ReactDOM.render(<App />, document.getElementById("root"));
