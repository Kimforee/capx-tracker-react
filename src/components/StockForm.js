// src\components\StockForm.js
import React, { useState } from 'react';
import { addStock } from '../api';

const StockForm = ({ token, onStockAdded }) => {
  const [formData, setFormData] = useState({ name: '', ticker: '', quantity: 1, buy_price: 0 });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addStock(formData, token);
    onStockAdded();
    setFormData({ name: '', ticker: '', quantity: 1, buy_price: 0 });
  };

  return (
    <form onSubmit={handleSubmit} className="stock-form" style={{ display: 'flex', flexDirection: 'column', gap: '15px', padding: '20px' }}>
      <div className="form-group" style={{ display: 'flex', flexDirection: 'column' }}>
        <label style={{ marginBottom: '5px', fontWeight: 'bold' }}>Stock Name:</label>
        <input name="name" value={formData.name} onChange={handleChange} required style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }} />
      </div>
      <div className="form-group" style={{ display: 'flex', flexDirection: 'column' }}>
        <label style={{ marginBottom: '5px', fontWeight: 'bold' }}>Ticker:</label>
        <input name="ticker" value={formData.ticker} onChange={handleChange} required style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }} />
      </div>
      <div className="form-group" style={{ display: 'flex', flexDirection: 'column' }}>
        <label style={{ marginBottom: '5px', fontWeight: 'bold' }}>Quantity:</label>
        <input name="quantity" type="number" value={formData.quantity} onChange={handleChange} required style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }} />
      </div>
      <div className="form-group" style={{ display: 'flex', flexDirection: 'column' }}>
        <label style={{ marginBottom: '5px', fontWeight: 'bold' }}>Buy Price:</label>
        <input name="buy_price" type="number" value={formData.buy_price} onChange={handleChange} required style={{ padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }} />
      </div>
      <button type="submit" className="btn btn-primary" style={{ padding: '10px', borderRadius: '6px', backgroundColor: '#007bff', color: 'white', border: 'none', cursor: 'pointer' }}>
        Add Stock
      </button>
    </form>
  );
};

export default StockForm;