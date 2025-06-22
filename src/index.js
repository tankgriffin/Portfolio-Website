import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/global.css'; // ✅ Import global styles
import App from './App';

// Suppress ResizeObserver loop errors (common React issue, harmless)
const resizeObserverErrDiv = document.getElementById('webpack-dev-server-client-overlay-div');
const resizeObserverErr = document.getElementById('webpack-dev-server-client-overlay');
if (resizeObserverErr) {
  resizeObserverErr.style.display = 'none';
}
if (resizeObserverErrDiv) {
  resizeObserverErrDiv.style.display = 'none';
}

// Global error handler for ResizeObserver
window.addEventListener('error', (e) => {
  if (e.message.includes('ResizeObserver loop')) {
    e.stopImmediatePropagation();
    e.preventDefault();
  }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
