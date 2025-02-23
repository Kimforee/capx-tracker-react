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
    <div className="home">
      <Dashboard token={token} />
      <StockForm token={token} onStockAdded={fetchData} />
      <StockTable stocks={stocks} token={token} onStockDeleted={fetchData} />
    </div>
  );
};

export default Home;
