import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './Css/theme.css';
import AuthContextProvider from './Context/AuthContext'

// Ensure theme is set on initial load and persists
const initializeTheme = () => {
  const theme = localStorage.getItem('theme') || 'light';
  document.body.setAttribute('data-theme', theme);
  document.documentElement.style.setProperty('color-scheme', theme);
  
  // Prevent flash of unstyled content
  document.documentElement.style.setProperty('--initial-color-scheme', theme);
};

// Initialize theme immediately
initializeTheme();

// Listen for storage changes (theme changes in other tabs)
window.addEventListener('storage', (e) => {
  if (e.key === 'theme') {
    initializeTheme();
  }
});

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
       <App />
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);