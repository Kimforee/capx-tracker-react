// src/pages/Login.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/token/', formData);

      // Save tokens in localStorage
      localStorage.setItem('token', response.data.access); // Save access token
      localStorage.setItem('refresh_token', response.data.refresh); // Save refresh token
      navigate('/home'); // Navigate to home on success
      alert('Login successful!');
    } catch (error) {
      alert('Invalid credentials. Please try again.'); // Show alert for failed login
    }
  };

  return (
    <div className="login" style={{ maxWidth: '400px', margin: '0 auto', textAlign: 'center' }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            style={{ marginLeft: '10px', padding: '5px', width: '80%' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            style={{ marginLeft: '10px', padding: '5px', width: '80%' }}
          />
        </div>
        <button
          type="submit"
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Login
        </button>
      </form>
      <p style={{ marginTop: '15px' }}>
        Don't have an account ?{' '}
        <Link to="/register" style={{ color: '#007bff', textDecoration: 'none' }}>
          Sign Up
        </Link>
      </p>
    </div>
  );
};

export default Login;