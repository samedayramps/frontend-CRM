// src/theme.ts

import { createTheme } from '@mui/material/styles';

// Example: Customizing primary and secondary colors
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Customize as needed
    },
    secondary: {
      main: '#dc004e', // Customize as needed
    },
  },
  // Add more theme customizations if necessary
});

export default theme;