// src\components\PortfolioMetrics.js
import React, { useEffect, useState } from 'react';
import { fetchPortfolioValue } from '../api';

const PortfolioMetrics = ({ token }) => {
  const [totalValue, setTotalValue] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchPortfolioValue(token);
        setTotalValue(response.data.total_value); // Assuming API response has `total_value`
      } catch (error) {
        console.error('Error fetching portfolio value:', error);
      }
    };

    fetchData();
  }, [token]);

  return (
    <div className="portfolio-metrics">
      <h3>Portfolio Metrics</h3>
      <p>Total Value: ${totalValue.toFixed(2)}</p>
    </div>
  );
};

export default PortfolioMetrics;
