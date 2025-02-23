// src\App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AddStock from './pages/AddStock';
import ViewStocks from './pages/ViewStocks';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  const token = localStorage.getItem('token');

  return (
    <Router>
      {/* <AuthProvider> */}
      <div className="min-h-screen bg-gray-50">
        {/* showing navbar only if the user is authenticated */}
        {token && <Navbar />}
        <Routes>
          {token ? (
            // Protected routes for logged-in users
            <>
              <Route path="/home" element={<Home />} />
              <Route path="/add-stock" element={<AddStock />} />
              <Route path="/view-stocks" element={<ViewStocks />} />
            </>
          ) : (
            // Public routes for unauthenticated users
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </>
          )}
        </Routes>
      </div>
      {/* </AuthProvider> */}
    </Router>
  );
}

export default App;
