import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import TransactionGrid from './components/TransactionGrid/TransactionGrid';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //<React.StrictMode>
    //<App />
    <TransactionGrid />
  //</React.StrictMode>
);

