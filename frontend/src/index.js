import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App.js';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/style.css';

axios.defaults.withCredentials = true;

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);