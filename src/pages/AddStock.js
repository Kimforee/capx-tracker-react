// src\pages\AddStock.js
import React, { useEffect, useState } from "react";
import { fetchRandomStocks, addStockToPortfolio } from "../api";

// Mapping tickers to company names
const tickerToName = {
  NFLX: "Netflix Inc.",
  AMZN: "Amazon Inc.",
  NVDA: "NVIDIA Corporation",
  TSLA: "Tesla Inc.",
  V: "Visa Inc.",
  AAPL: "Apple Inc.",
  MSFT: "Microsoft Corporation",
  GOOGL: "Alphabet Inc. (Google)",
  META: "Meta Platforms Inc.",
  "BRK.B": "Berkshire Hathaway Inc.",
};

// Define default stock data to display when API fails
const defaultStocks = [
  { name: "Apple Inc.", ticker: "AAPL", current_price: 150.75, previous_close: 148.75, change: "2.00", change_percent: "1.34%" },
  { name: "Tesla Inc.", ticker: "TSLA", current_price: 800, previous_close: 780, change: "20.00", change_percent: "2.56%" },
  { name: "Amazon Inc.", ticker: "AMZN", current_price: 1700, previous_close: 1650, change: "50.00", change_percent: "3.03%" },
  { name: "Google Inc.", ticker: "GOOGL", current_price: 1200, previous_close: 1180, change: "20.00", change_percent: "1.69%" },
  { name: "Microsoft Inc.", ticker: "MSFT", current_price: 200, previous_close: 195, change: "5.00", change_percent: "2.56%" },
];

const AddStock = () => {
  const [stocks, setStocks] = useState([]);
  const [selectedStock, setSelectedStock] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadStocks = async () => {
        try {
            const response = await fetchRandomStocks();
            console.log("API Response:", response); // Debug log

            // Access the data from the response object
            const stocksData = response.data || []; // Safely access the data field

            // Check if the response contains valid stock data
            if (Array.isArray(stocksData) && stocksData.length > 0) {
                const formattedStocks = stocksData.map((stock) => ({
                    ...stock,
                    name: tickerToName[stock.ticker] || stock.ticker, // Fallback to ticker if name is not mapped
                    quantity: 1, // Default quantity is 1
                }));
                setStocks(formattedStocks); // Update the state with the API response
            } else {
                throw new Error("Invalid response format or empty data.");
            }
        } catch (err) {
            console.error(err.message); // Log error details
            setError("API limit reached. Displaying default stocks.");
            setStocks(defaultStocks); // Fallback to default stocks
        } finally {
            setLoading(false);
        }
    };

    loadStocks();
}, []);
  

  const handleAddStock = async () => {
    if (!selectedStock) {
      alert("Please select a stock to add!");
      return;
    }

    try {
      // Prepare the data in the correct format
      const stockData = {
        name: selectedStock.name,
        ticker: selectedStock.ticker,
        quantity: selectedStock.quantity,
        buy_price: selectedStock.current_price, // Use the current price as the buy price
      };

      await addStockToPortfolio(stockData); // Call API to add stock
      alert("Stock added successfully!");
    } catch (err) {
      console.error("Error adding stock:", err);
      alert("Failed to add stock to portfolio.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Add Stock</h2>
      {loading && <p>Loading stocks...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && (
        <>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ border: "1px solid black", padding: "8px" }}>Name</th>
                <th style={{ border: "1px solid black", padding: "8px" }}>Ticker</th>
                <th style={{ border: "1px solid black", padding: "8px" }}>Current Price</th>
                <th style={{ border: "1px solid black", padding: "8px" }}>Previous Close</th>
                <th style={{ border: "1px solid black", padding: "8px" }}>Change</th>
                <th style={{ border: "1px solid black", padding: "8px" }}>Change (%)</th>
                <th style={{ border: "1px solid black", padding: "8px" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {stocks.map((stock) => (
                <tr key={stock.ticker}>
                  <td style={{ border: "1px solid black", padding: "8px" }}>{stock.name}</td>
                  <td style={{ border: "1px solid black", padding: "8px" }}>{stock.ticker}</td>
                  <td style={{ border: "1px solid black", padding: "8px" }}>${parseFloat(stock.current_price).toFixed(2)}</td>
                  <td style={{ border: "1px solid black", padding: "8px" }}>${parseFloat(stock.previous_close).toFixed(2)}</td>
                  <td style={{ border: "1px solid black", padding: "8px" }}>{parseFloat(stock.change).toFixed(2)}</td>
                  <td style={{ border: "1px solid black", padding: "8px" }}>{parseFloat(stock.change_percent).toFixed(2)}%</td>
                  <td style={{ border: "1px solid black", padding: "8px" }}>
                    <button onClick={() => setSelectedStock(stock)}>Select</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {selectedStock && (
            <div style={{ marginTop: "20px" }}>
              <h4>Selected Stock:</h4>
              <p>
                {selectedStock.name} ({selectedStock.ticker}) - Current Price: $ {parseFloat(selectedStock.current_price).toFixed(2)}
              </p>
              <button
                onClick={handleAddStock}
                style={{ padding: "10px 20px", cursor: "pointer" }}
              >
                Add to Portfolio
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AddStock;
