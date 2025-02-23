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
    <form onSubmit={handleSubmit} className="stock-form">
      <div className="form-group">
        <label>Stock Name:</label>
        <input name="name" value={formData.name} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Ticker:</label>
        <input name="ticker" value={formData.ticker} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Quantity:</label>
        <input
          name="quantity"
          type="number"
          value={formData.quantity}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Buy Price:</label>
        <input
          name="buy_price"
          type="number"
          value={formData.buy_price}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Add Stock
      </button>
    </form>
  );
};

export default StockForm;

// import React, { useState } from 'react';
// import { addStock } from '../api';

// const StockForm = ({ token, onStockAdded }) => {
//   const [name, setName] = useState('');
//   const [ticker, setTicker] = useState('');
//   const [quantity, setQuantity] = useState('');
//   const [buyPrice, setBuyPrice] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const newStock = {
//         name,
//         ticker,
//         quantity: parseInt(quantity),
//         buy_price: parseFloat(buyPrice),
//       };

//       await addStock(newStock, token);
//       onStockAdded(); // Refresh the stock list after adding
//       setName('');
//       setTicker('');
//       setQuantity('');
//       setBuyPrice('');
//     } catch (error) {
//       console.error('Error adding stock:', error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="stock-form">
//       <input
//         type="text"
//         placeholder="Stock Name"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//         required
//       />
//       <input
//         type="text"
//         placeholder="Ticker Symbol"
//         value={ticker}
//         onChange={(e) => setTicker(e.target.value)}
//         required
//       />
//       <input
//         type="number"
//         placeholder="Quantity"
//         value={quantity}
//         onChange={(e) => setQuantity(e.target.value)}
//         required
//       />
//       <input
//         type="text"
//         placeholder="Buy Price"
//         value={buyPrice}
//         onChange={(e) => setBuyPrice(e.target.value)}
//         required
//       />
//       <button type="submit" className="btn btn-primary">
//         Add Stock
//       </button>
//     </form>
//   );
// };

// export default StockForm;
