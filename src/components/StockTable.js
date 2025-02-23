// src\components\StockTable.js
import React from 'react';
import { deleteStock } from '../api';

// Mapping tickers to stock names
const tickerToNameMap = {
  AAPL: "Apple Inc.",
  AMZN: "Amazon.com Inc.",
  NFLX: "Netflix Inc.",
  V: "Visa Inc.",
  META: "Meta Platforms Inc.",
  GOOGL: "Alphabet Inc.",
  TSLA: "Tesla Inc.",
  NVDA: "NVIDIA Corporation",
  MSFT: "Microsoft Corporation",
  BRK_B: "Berkshire Hathaway Inc."
};

const StockTable = ({ stocks, token, onStockDeleted }) => {
  const handleDelete = async (id) => {
    try {
      await deleteStock(id, token); // Call delete API
      onStockDeleted(id); // Update stock list in the parent component
    } catch (error) {
      console.error("Failed to delete stock:", error);
    }
  };

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Ticker</th>
          <th>Current Price</th>
          <th>Previous Close</th>
          <th>Change</th>
          <th>Change (%)</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {stocks.map((stock) => (
          <tr key={stock.id}>
            {/* Map ticker to a name or show "N/A" if unavailable */}
            <td>{tickerToNameMap[stock.ticker] || "N/A"}</td>
            <td>{stock.ticker || "Unknown"}</td>
            <td>
              $
              {typeof parseFloat(stock.current_price) === "number"
                ? parseFloat(stock.current_price).toFixed(2)
                : "N/A"}
            </td>
            <td>
              $
              {typeof parseFloat(stock.previous_close) === "number"
                ? parseFloat(stock.previous_close).toFixed(2)
                : "N/A"}
            </td>
            <td>{stock.change || "N/A"}</td>
            <td>{stock.change_percent || "N/A"}</td>
            <td>
              <button
                className="btn btn-danger"
                onClick={() => handleDelete(stock.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default StockTable;
