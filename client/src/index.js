import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from "./redux/store"
// import dotenv from 'dotenv';
// import axios from 'axios';
// axios.defaults.baseURL = process.env.REACT_APP_API || 'http://localhost:3001';
// dotenv.config(); 

ReactDOM.render(
  <Provider store={store}>
  <BrowserRouter>
    <App />
    </BrowserRouter>,
  </Provider>,
  document.getElementById('root')
);

