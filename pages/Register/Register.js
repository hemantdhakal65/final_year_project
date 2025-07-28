import React, { useState } from "react";
 
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
    role: "doctor", 
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
  
   
    if (!formData.username.trim() || !formData.phone.trim()) {
      alert("Username and phone are required!");
      return;
    }
  
    setLoading(true);
  
   
    console.log(formData);
  
    fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert("Registration Successful");
          setFormData({ username: "", email: "", password: "", phone: "", role: "doctor" });
          setTimeout(() => navigate('/adminDashboard'), 1000); 

        } else {
          alert(`Registration Failed: ${data.message || "Something went wrong"}`);
        }
      })
      .catch(() => alert("Failed to register. Please try again later."))
      .finally(() => setLoading(false));
  };
  
  return (
    <div className="login-container" style={{ maxWidth: '500px', margin: '50px auto', textAlign: 'center' }}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px', textAlign: 'left' }}>
          <label htmlFor="role" style={{ display: 'block', marginBottom: '5px' }}>Role:</label>
          <select
            id="role"
            value={formData.role}
            onChange={handleChange}
            name="role"
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
            name="username"
            value={formData.username}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', fontSize: '16px' }}
            placeholder="Enter your username"
            required
          />
        </div>
        <div style={{ marginBottom: '15px', textAlign: 'left' }}>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', fontSize: '16px' }}
            placeholder="Enter your email"
            required
          />
        </div>
        <div style={{ marginBottom: '15px', textAlign: 'left' }}>
          <label htmlFor="password" style={{ display: 'block', marginBottom: '5px' }}>Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', fontSize: '16px' }}
            placeholder="Enter your password"
            required
          />
        </div>
        <div style={{ marginBottom: '15px', textAlign: 'left' }}>
          <label htmlFor="phone" style={{ display: 'block', marginBottom: '5px' }}>Phone Number:</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', fontSize: '16px' }}
            placeholder="Enter your phone number"
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}
        <button type="submit" style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }} disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
};


export default Register;
