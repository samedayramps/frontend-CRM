// src/index.tsx

import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css'; // Tailwind CSS
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);