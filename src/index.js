import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './styles/theme.css';
import App from './App';
import { applyTheme, getPreferredTheme } from './utils/theme';

const preferred = getPreferredTheme();
if (preferred) applyTheme(preferred);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

