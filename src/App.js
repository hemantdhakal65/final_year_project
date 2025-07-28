import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainDashboard from './pages/MainDashboard/MainDashboard';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';

import DoctorDashboard from './pages/Doctor-Dashboard/DoctorDashboard';
import NurseDashboard from './pages/Nurse-Dashboard/NurseDashboard';
import PatientDashboard from './pages/Patient-Dashboard/PatientDashboard';
import GuardianDashboard from './pages/Guardian-Dashboard/GuardianDashboard';
import StaffDashboard from './pages/Staff-Dashboard/StaffDashboard';
import AdminDashboard from './pages/Admin-Dashboard/AdminDashboard';
import RemoveUser from './pages/RemoveUser/RemoveUser';
import PatientRegister from './pages/PatientRegister/PatientRegister';

const App = () => {
  return (
    <Router>
      <Routes>
        
        <Route path="/" element={<MainDashboard />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/PatientRegister" element={<PatientRegister/>}/>

      
        <Route path="/doctordashboard" element={<DoctorDashboard />} />
        <Route path="/nursedashboard" element={<NurseDashboard />} />
        <Route path="/guardiandashboard" element={<GuardianDashboard />} />
        <Route path="/patientdashboard" element={<PatientDashboard />} />
        <Route path="/staffdashboard" element={<StaffDashboard/>}/>
        <Route path="/admindashboard" element={<AdminDashboard/>}/>
        <Route path="/RemoveUser" element={<RemoveUser/>}/>
        

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
