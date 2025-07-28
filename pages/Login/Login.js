import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [role, setRole] = useState('doctor');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!username.trim() || !password.trim()) {
      setError('Username and password are required!');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, role }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(`Login successful! Welcome, ${data.user.username}`);

        localStorage.setItem('token', data.token); 
        localStorage.setItem('user', JSON.stringify(data.user)); 

        setTimeout(() => {
          switch (role) {
            case 'doctor':
              navigate('/DoctorDashboard');
              break;
            case 'nurse':
              navigate('/NurseDashboard');
              break;
            case 'patient':
              navigate('/PatientDashboard');
              break;
            case 'staff':
              navigate('/StaffDashboard');
              break;
            case 'admin':
              navigate('/AdminDashboard');
              break;
            case 'guardian':
              navigate('/GuardianDashboard');
              break;
            default:
              navigate('/');
          }
        }, 100);
      } else {
        setError(data.message || 'Login failed. Please try again.');
      }
    } catch (err) {
      setError('Server error. Please try again later.');
      console.error('Login error:', err);
    }
  };

  return (
    <div className="login-container" style={{ maxWidth: '500px', margin: '50px auto', textAlign: 'center' }}>
      <h2>{role.charAt(0).toUpperCase() + role.slice(1)} Login</h2>
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: '15px', textAlign: 'left' }}>
          <label htmlFor="role" style={{ display: 'block', marginBottom: '5px' }}>Role:</label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={{ width: '100%', padding: '8px', fontSize: '16px' }}
          >
            <option value="doctor">Doctor</option>
            <option value="nurse">Nurse</option>
            <option value="patient">Patient</option>
            <option value="staff">Staff</option>
            <option value="admin">Admin</option>
            <option value="guardian">Guardian</option>
          </select>
        </div>
        <div style={{ marginBottom: '15px', textAlign: 'left' }}>
          <label htmlFor="username" style={{ display: 'block', marginBottom: '5px' }}>Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ width: '100%', padding: '8px', fontSize: '16px' }}
            placeholder="Enter your username"
            required
          />
        </div>
        <div style={{ marginBottom: '15px', textAlign: 'left' }}>
          <label htmlFor="password" style={{ display: 'block', marginBottom: '5px' }}>Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '8px', fontSize: '16px' }}
            placeholder="Enter your password"
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}
        <button type="submit" style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
