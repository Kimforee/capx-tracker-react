import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/api';

// Helper function to get the token from localStorage
const getAuthToken = () => {
  const token = localStorage.getItem('token');
  return token ? `Bearer ${token}` : null; // Return the token if available, else null
};

// Configure axios instance with default headers
const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

// Add a request interceptor to include the token dynamically
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers['Authorization'] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// API calls
export const login = (credentials) => axiosInstance.post('/token/', credentials);

  export const fetchStocks = () => axiosInstance.get('/stocks/');

export const addStock = (stock) => axiosInstance.post('/stocks/', stock);

export const deleteStock = (id) => axiosInstance.delete(`/stocks/${id}/`);

export const fetchPortfolioValue = () => axiosInstance.get('/portfolio/value/');

export const fetchRandomStocks = () => axiosInstance.get('/stocks/random/');

export const addStockToPortfolio = async (stock) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("User is not authenticated. Token missing.");
  }

  try {
    const response = await axios.post(
      `${BASE_URL}/stocks/`,  // Make sure this is correct
      {
        name: stock.name,
        ticker: stock.ticker,
        quantity: stock.quantity,  // Should match the request payload
        buy_price: stock.buy_price, // Should match the request payload
      },
      {
        headers: { Authorization: `Bearer ${token}` }, // Ensure token is passed correctly
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding stock:", error);
    throw new Error(error.response?.data?.detail || "Failed to add stock to portfolio.");
  }
};
