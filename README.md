Home Page :![image](https://github.com/user-attachments/assets/b6bf411c-12ca-491f-97cc-cd00fdd3f249)
Add Stock Page : ![image](https://github.com/user-attachments/assets/db62f4b9-5b66-41bf-adee-a5fba356b638)
Logout : ![image](https://github.com/user-attachments/assets/6bed62d7-5fa8-4174-8688-ce8f4ceb87e7)
Login : ![image](https://github.com/user-attachments/assets/cf9803ec-d4fb-418f-903b-f7022d9e5f8f)

Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance. The build is minified and the filenames include the hashes.

### For backend (if the deployed the api doesnt work or may the limit is reached for the postgres)
Visit this repo and clone and run localy (dont forget the migration) : https://github.com/Kimforee/capx-tracker

# CapX React Frontend
This is the frontend for **CapX**, a stock portfolio management application built using **React.js**. It allows users to add stocks to their portfolio, fetch real-time stock data, and track their investments.
---

## 🚀 Features

- 📈 **Fetch real-time stock data** from an external API
- 📊 **Display stock details** such as name, ticker, price change, and percentage change
- ➕ **Add stocks to portfolio** and manage investments
- 🔄 **Fallback mechanism** to display default stocks when API limits are reached
- 🎨 **Responsive UI** for better user experience

---

## Installation

### Clone the repository

```sh
git clone https://github.com/your-username/capx-tracker-react.git
cd capx-tracker-react
```

### Install dependencies

```sh
npm install
```
Modify this if the backend is hosted on a different server.

### Start the development server

```sh
npm start
```

The app will be available at `http://localhost:3000`.

---

## Usage

1. **Fetch Stocks:** The homepage fetches stock data from the backend.
2. **Select Stock:** Choose a stock from the list.
3. **Add to Portfolio:** Click "Add to Portfolio" to save it.

If the API limit is reached, default stock data will be displayed.

---

## Troubleshooting

- **API Not Responding?** Ensure the backend server is running.
- **Stock Data Not Loading?** Check API limits or network requests in browser dev tools (`F12` → Network).
- **CORS Issues?** Make sure the backend allows requests from the frontend.

---

## 📄 License

This project is licensed under the **MIT License**.

---
