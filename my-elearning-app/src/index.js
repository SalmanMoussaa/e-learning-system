import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Routes, Route } from "react-router-dom";
import Home from './pages/home';
import Dashboard from './pages/dashboard/dashboard';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  </BrowserRouter>
);

reportWebVitals();
