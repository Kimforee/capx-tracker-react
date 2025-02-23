// src\components\Navbar.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track authentication state

  useEffect(() => {
    // Check for token in local storage to determine authentication state
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token); // Update state based on token presence
  }, []);

  const handleLogout = async () => {
    const refreshToken = localStorage.getItem('refresh_token'); // Retrieve refresh token
    const accessToken = localStorage.getItem('token'); // Retrieve access token

    if (!refreshToken || !accessToken) {
      console.error("No tokens available for logout");
      setIsAuthenticated(false); // Update state
      navigate('/login');
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/api/accounts/logout/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`, // Include the access token in Authorization header
        },
        body: JSON.stringify({
          refresh_token: refreshToken, // Include refresh token in body
        }),
      });

      if (response.ok) {
        localStorage.removeItem('token'); // Remove access token
        localStorage.removeItem('refresh_token'); // Remove refresh token
        setIsAuthenticated(false); // Update state to reflect logged-out status
        alert("Logout successful!");
        navigate('/login'); // Redirect to login page
      } else {
        if(refreshToken || accessToken) {
          localStorage.removeItem('token'); // Remove access token
          localStorage.removeItem('refresh_token'); // Remove refresh token 
        }
        console.error("Logout failed:", await response.json());
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <nav style={{ background: '#333', padding: '10px', color: 'white' }}>
      <ul
        style={{
          listStyleType: 'none',
          display: 'flex',
          justifyContent: 'space-around',
          margin: 0,
          padding: 0,
        }}
      >
        {/* Conditionally render links based on authentication */}
        {isAuthenticated ? (
          <>
            <li>
              <Link to="/home" style={{ color: 'white', textDecoration: 'none' }}>Dashboard</Link>
            </li>
            <li>
              <Link to="/add-stock" style={{ color: 'white', textDecoration: 'none' }}>Add Stock</Link>
            </li>
            <li>
              <Link to="/view-stocks" style={{ color: 'white', textDecoration: 'none' }}>View Stocks</Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'white',
                  textDecoration: 'underline',
                  cursor: 'pointer',
                }}
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>Login</Link>
            </li>
            <li>
              <Link to="/register" style={{ color: 'white', textDecoration: 'none' }}>Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
