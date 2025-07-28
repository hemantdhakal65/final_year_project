import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ActiveUsers = () => {
  const [activeUserCounts, setActiveUserCounts] = useState({
    doctors: 0,
    nurses: 0,
    patients: 0,
    staff: 0,
  });

  useEffect(() => {
    const fetchActiveUserCounts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/auth/active-users');
        setActiveUserCounts(response.data.activeUserCounts);
      } catch (error) {
        console.error('Error fetching active user counts:', error);
      }
    };

 
    fetchActiveUserCounts();

 
    const interval = setInterval(fetchActiveUserCounts, 10000);

  
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="dashboard-card">
      <h3>Active Users</h3>
      <p>Doctors: {activeUserCounts.doctors}</p>
      <p>Nurses: {activeUserCounts.nurses}</p>
      <p>Patients: {activeUserCounts.patients}</p>
      <p>Staff: {activeUserCounts.staff}</p>
    </div>
  );
};

export default ActiveUsers;