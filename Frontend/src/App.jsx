/*
//import logo from './logo.svg';
//import './App.css';
import React from 'react';
import pt from './patient.jsx';
//import './components/styles.css';

function App() {
  return (
    <div className="pt">
          <pt />
    </div>
  );
}
export default App;
*/

/*
import React from 'react';
//import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//import LoginForm from 'C:/Users/Kaaviya/Desktop/React/Hospital/src/components/login.jsx';
//import Patient from './components/patient.jsx';
import Pt from './components/pt.jsx';
//import Dashboard from './components/dashboard.jsx';
//<Route path="/dashboard" element={<Dashboard />} />
const App = () => {
  return (
    <div className="Pt">
          <Pt />
    </div>
  );
};
export default App;
*/

// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LoginForm from './components/login.jsx';
import Dashboard from './components/dashboard.jsx';
import PatientPage from './components/patient.jsx';
import AdminDashboard from './components/admin.jsx';
import DoctorPage from './components/doctor.jsx';

//import ServerPage from './components/admin.jsx'
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<LoginForm />}/> 
        <Route path="/doctor" element={<DoctorPage />}/>
        <Route path="/patient" element={<PatientPage />}/>
        <Route path="/admin" element={<AdminDashboard />}/>
       {/* <Route path = "/admin" element={<ServerPage/>}/>  */}
      </Routes>
    </Router>
  );
};

export default App;

