import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import ActiveUsers from './components/ActiveUsers';
import HospitalInfo from './components/HospitalInfo';
import HelpDesk from './components/HelpDesk';
import PharmacyInfo from './components/PharmacyInfo';
import hospitalLogo from '../../assets/Hospital_Logo.png'; 
import './MainDashboard.css'; 

const MainDashboard = () => {
  const [activeSection, setActiveSection] = useState('Profile'); 
  const navigate = useNavigate(); 


  const handleSignUPClick = () => {
    navigate('/Login'); 
  };


  const handleRegisterClick = () => {
    navigate('/PatientRegister'); 
  };


  const renderActiveSection = () => {
    switch (activeSection) {
      case 'ActiveUsers':
        return <ActiveUsers />;
      case 'HospitalInfo':
        return <HospitalInfo />;
      case 'HelpDesk':
        return <HelpDesk />;
      case 'PharmacyInfo':
        return <PharmacyInfo />;
      default:
        return <HospitalInfo />;
    }
  };

  return (
    <div className="main-dashboard">
      <h1>Welcome to ABC Hospital Private Limited</h1>

   
      <nav className="dashboard-nav">
        <button onClick={() => setActiveSection('ActiveUsers')}>Active Users</button>
        <button onClick={() => setActiveSection('HospitalInfo')}>Hospital Info</button>
        <button onClick={() => setActiveSection('HelpDesk')}>Help Desk</button>
        <button onClick={() => setActiveSection('PharmacyInfo')}>Pharmacy Info</button>
      </nav>

   
      <div className="dashboard-content">
        {activeSection === 'HospitalInfo' ? (
          <Routes>
            <Route path="/" element={<HospitalInfo />} />
          </Routes>
        ) : (
          renderActiveSection()
        )}
      </div>

     
      <img src={hospitalLogo} alt="Hospital Logo" className="hospital-logo" />

   
      <div className="button-container">
        <button className="Login-btn" onClick={handleSignUPClick}>
          Login
        </button>
        <button className="register-btn" onClick={handleRegisterClick}>
          Register
        </button>
      </div>
    </div>
  );
};

export default MainDashboard;
