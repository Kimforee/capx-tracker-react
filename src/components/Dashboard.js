// src\components\Dashboard.js
import React, { useEffect, useState } from 'react';
import { fetchPortfolioValue } from '../api';

const Dashboard = ({ token }) => {
  const [portfolio, setPortfolio] = useState(null);

  
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchPortfolioValue(token);
      setPortfolio(response.data);
    };
    fetchData();
  }, [token]);

  return (
    <div className="dashboard">
      <h2>Portfolio Dashboard</h2>
      {portfolio ? (
        <>
          <h4>Total Portfolio Value: ${portfolio.total_portfolio_value.toFixed(2)}</h4>
          <ul>
            {portfolio.stocks.map((stock) => (
              <li key={stock.ticker}>
                {stock.name} ({stock.ticker}): ${stock.value.toFixed(2)}
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Dashboard;
