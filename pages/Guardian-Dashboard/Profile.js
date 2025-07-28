import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        console.log('User from localStorage:', user);

        const token = localStorage.getItem('token');
        console.log('Token from localStorage:', token);

        if (!user || !user.username) {
          throw new Error('User data not found in localStorage.');
        }

        const response = await axios.get(`http://localhost:5000/api/auth/user/${user.username}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.success) {
          setUserData(response.data.user);
        } else {
          throw new Error(response.data.message || 'Failed to fetch user data.');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
  const token = localStorage.getItem('token'); 

  if (!token) {
    console.error('No token found. User is not logged in.');
    return;
  }

  try {
    const response = await fetch('http://localhost:5000/api/auth/logout', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Logout failed');
    }

    const data = await response.json();
    console.log(data.message); 

    
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
    console.log('Token removed from localStorage.');
  } catch (error) {
    console.error('Error during logout:', error.message);
  }
};

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!userData) {
    return <p>No user data found.</p>;
  }

  return (
    <div className="profile">
      <h2>Profile</h2>
      <div>
        <p><strong>Username:</strong> {userData.username}</p>
        <p><strong>Email:</strong> {userData.email}</p>
        <p><strong>Phone:</strong> {userData.phone}</p>
        <p><strong>Role:</strong> {userData.role}</p>
      </div>
      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>
    </div>
  );
};

export default Profile;

