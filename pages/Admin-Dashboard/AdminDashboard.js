import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import HospitalOverview from './HospitalOverview';
import UserManagement from './UserManagement';
import AppointmentManagement from './AppointmentManagement';
import Alerts from './Alerts';
import Reports from './Reports';
import SystemSettings from './SystemSettings';
import MessageSection from './MessageSection';
import Profile from './Profile';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('HospitalOverview'); 
  const [alertCount, setAlertCount] = useState(0);

  
  const handleAlertUpdate = (newCount) => {
    setAlertCount(newCount);
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'HospitalOverview':
        return <HospitalOverview />;
      case 'Profile':
        return <Profile />;
      case 'UserManagement':
        return <UserManagement />;
      case 'AppointmentManagement':
        return <AppointmentManagement />;
      case 'Alerts':
        return <Alerts onAlertUpdate={handleAlertUpdate} />;
      case 'MessageSection':
        return <MessageSection />;
      case 'Reports':
        return <Reports />;
      case 'SystemSettings':
        return <SystemSettings />;
      default:
        return <HospitalOverview />;
    }
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>

      <nav className="sidebar">
        <button onClick={() => setActiveSection('HospitalOverview')}>
          Hospital Overview
        </button>
        <button onClick={() => setActiveSection('Profile')}>
          Profile
        </button>
        <button onClick={() => setActiveSection('UserManagement')}>
          User Management
        </button>
        <button onClick={() => setActiveSection('AppointmentManagement')}>
          Manage Appointments
        </button>
        <button onClick={() => setActiveSection('Alerts')}>
          Alerts {alertCount > 0 && <span className="alert-badge">{alertCount}</span>}
        </button>
        <button onClick={() => setActiveSection('MessageSection')}>
          Chat Box
        </button>
        <button onClick={() => setActiveSection('Reports')}>
          Reports
        </button>
        <button onClick={() => setActiveSection('SystemSettings')}>
          System Settings
        </button>
      </nav>

      <div className="main-content">
        {activeSection === 'AppointmentManagement' ? (
          <Routes>
            <Route path="/" element={<AppointmentManagement />} />
          </Routes>
        ) : (
          renderActiveSection()
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
