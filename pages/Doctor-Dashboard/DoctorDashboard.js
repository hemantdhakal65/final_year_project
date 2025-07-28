import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Profile from './Profile';
import Appointments from './Appointments';
import Alerts from './Alerts';
import Recommendations from './Recommendations';
import MessageSection from './MessageSection';
import './DoctorDashboard.css';

const DoctorDashboard = () => {
  const [activeSection, setActiveSection] = useState('Profile');
  const [alertCount, setAlertCount] = useState(0);

  const handleAlertUpdate = (newCount) => {
    setAlertCount(newCount);
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'Profile':
        return <Profile />;
      case 'Appointments':
        return <Appointments />;
      case 'Alerts':
        return <Alerts onAlertUpdate={handleAlertUpdate} />;
      case 'Recommendations':
        return <Recommendations />;
      case 'MessageSection':
        return <MessageSection />;
      default:
        return <Profile />;
    }
  };

  return (
    <div className="doctor-dashboard">
      <h2>Doctor Dashboard</h2>

      <nav className="doctor-dashboard-nav">
        <button onClick={() => setActiveSection('Profile')}>Profile</button>
        <button onClick={() => setActiveSection('Appointments')}>View Appointments</button>
        <button onClick={() => setActiveSection('Alerts')}>
          Alerts {alertCount > 0 && <span className="alert-badge">{alertCount}</span>}
        </button>
        <button onClick={() => setActiveSection('Recommendations')}>Recommendations</button>
        <button onClick={() => setActiveSection('MessageSection')}>Chat Box</button>
      </nav>

      <div className="doctor-dashboard-content">
        {activeSection === 'MessageSection' ? (
          <Routes>
            <Route path="/" element={<MessageSection setActiveSection={setActiveSection} />} />
          </Routes>
        ) : (
          renderActiveSection()
        )}
      </div>
    </div>
  );
};

export default DoctorDashboard;
