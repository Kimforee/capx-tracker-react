// src\pages\ViewStocks.js
import React, { useEffect, useState } from 'react';
import { fetchStocks } from '../api';
import StockTable from '../components/StockTable';

const ViewStocks = ({ token }) => {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchStocks(token);
        setStocks(response.data);
      } catch (error) {
        console.error('Error fetching stocks:', error);
      }
    };
    fetchData();
  }, [token]);

  // Define onStockDeleted to update the stock list after deletion
  const onStockDeleted = (id) => {
    setStocks(stocks.filter((stock) => stock.id !== id)); // Remove the stock with the deleted id
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>View All Stocks</h1>
      {/* Pass onStockDeleted function to StockTable */}
      <StockTable stocks={stocks} token={token} onStockDeleted={onStockDeleted} />
    </div>
  );
};

export default ViewStocks;
