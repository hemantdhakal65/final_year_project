import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Profile from './Profile';
import Alerts from './Alerts';
import Recommendations from './Recommendations';
import MessageSection from './MessageSection';
import './NurseDashboard.css';

const NurseDashboard = () => {
  const [activeSection, setActiveSection] = useState('Profile');
  const [alertCount, setAlertCount] = useState(0);

  const handleAlertUpdate = (newCount) => {
    setAlertCount(newCount);
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'Profile':
        return <Profile />;
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
    <div className="nurse-dashboard">
      <h2>Nurse Dashboard</h2>

      <nav className="nurse-dashboard-nav">
        <button onClick={() => setActiveSection('Profile')}>Profile</button>
        <button onClick={() => setActiveSection('Alerts')}>
          Alerts {alertCount > 0 && <span className="alert-badge">{alertCount}</span>}
        </button>
        <button onClick={() => setActiveSection('Recommendations')}>ViewRecommendations</button>
        <button onClick={() => setActiveSection('MessageSection')}>Chat Box</button>
      </nav>

      <div className="nurse-dashboard-content">
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

export default NurseDashboard;
