// src\pages\Home.js
import React, { useEffect, useState, useCallback } from 'react';
import { fetchStocks } from '../api';
import Dashboard from '../components/Dashboard';
import StockForm from '../components/StockForm';
import StockTable from '../components/StockTable';

const Home = ({ token }) => {
  const [stocks, setStocks] = useState([]);

  // Wrap fetchData in useCallback to stabilize its reference
  const fetchData = useCallback(async () => {
    try {
      const response = await fetchStocks(token);
      setStocks(response.data);
    } catch (error) {
      console.error('Error fetching stocks:', error);
    }
  }, [token]); // Dependencies for useCallback

  useEffect(() => {
    fetchData();
  }, [fetchData]); // Dependencies for useEffect

  return (
    <div className="home-container" style={{ padding: '20px', backgroundColor: '#f4f4f4', minHeight: '100vh' }}>
      <div className="dashboard-section" style={{ marginBottom: '20px', padding: '20px', background: 'white', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
        <Dashboard token={token} useMockOnFailure={true} />
      </div>
      <div className="stock-form-section" style={{ marginBottom: '20px', padding: '20px', background: 'white', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
        <h3 style={{ marginBottom: '15px', textAlign: 'center', color: '#333' }}>Add a New Stock</h3>
        <StockForm token={token} onStockAdded={fetchData} />
      </div>
      <div className="stock-table-section" style={{ padding: '20px', background: 'white', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
        <StockTable stocks={stocks} token={token} onStockDeleted={fetchData} />
      </div>
    </div>
  );
};

export default Home;
