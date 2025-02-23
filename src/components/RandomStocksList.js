// src\components\RandomStocksList.js
import React, { useEffect, useState } from 'react';
import { fetchRandomStocks } from '../api';

const RandomStocksList = ({ onSelectStock }) => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getStocks = async () => {
      try {
        const response = await fetchRandomStocks();
        setStocks(response.data);
      } catch (err) {
        setError('Failed to fetch random stocks');
      } finally {
        setLoading(false);
      }
    };

    getStocks();
  }, []);

  if (loading) return <p>Loading stocks...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Random Stocks</h2>
      <ul>
        {stocks.map((stock) => (
          <li key={stock.ticker}>
            {stock.ticker}: ${stock.price.toFixed(2)}{' '}
            <button onClick={() => onSelectStock(stock)}>Add</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RandomStocksList;