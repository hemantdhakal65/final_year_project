import React, { useState } from 'react';
import Profile from './Profile';
import CreateAlert from './CreateAlert';
import ViewMonitoring from './ViewMonitoring';
import MessageSection from './MessageSection';
import './GuardianDashboard.css';

const GuardianDashboard = () => {
  const [activeSection, setActiveSection] = useState('Profile');
  const [alertCount, setAlertCount] = useState(0);

  const handleAlertUpdate = (newCount) => {
    setAlertCount(newCount);
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'Profile':
        return <Profile />;
      case 'ViewMonitoring':
        return <ViewMonitoring onAlertUpdate={handleAlertUpdate}/>;
      case 'CreateAlert':
        return <CreateAlert />;
      case 'MessageSection':
        return <MessageSection />;
      default:
        return <Profile />;
    }
  };

  return (
    <div className="guardian-dashboard">
      <h2>Guardian Dashboard</h2>

      <nav className="guardian-dashboard-nav">
        <button onClick={() => setActiveSection('Profile')}>Profile</button>
        <button onClick={() => setActiveSection('ViewMonitoring')}>
          View Monitoring {alertCount > 0 && <span className="alert-badge">{alertCount}</span>}
          </button>
        <button onClick={() => setActiveSection('CreateAlert')}>Create Alert</button>
        <button onClick={() => setActiveSection('MessageSection')}>Chat Box</button>
      </nav>

      <div className="guardian-dashboard-content">
        {renderActiveSection()}
      </div>
    </div>
  );
};

export default GuardianDashboard;
