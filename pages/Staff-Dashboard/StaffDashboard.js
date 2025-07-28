import React, { useState } from 'react';
import Profile from './Profile';
import MessageSection from './MessageSection';
import './StaffDashboard.css';

const StaffDashboard = () => {
  const [activeSection, setActiveSection] = useState('Profile'); 

  
  const renderActiveSection = () => {
    switch (activeSection) {
      case 'Profile':
        return <Profile />;
      case 'MessageSection':
        return <MessageSection />;
      default:
        return <Profile />;
    }
  };

  return (
    <div className="staff-dashboard">
      <h2>Staff Dashboard</h2>

    
      <nav className="staff-dashboard-nav">
        <button onClick={() => setActiveSection('Profile')}>Profile</button>
        <button onClick={() => setActiveSection('MessageSection')}>Chat Box</button>
      </nav>

    
      <div className="staff-dashboard-content">
        {renderActiveSection()}
      </div>
    </div>
  );
};

export default StaffDashboard;
