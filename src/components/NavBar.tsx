import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link as RouterLink, Link } from 'react-router-dom';

const NavBar: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Ramp Rental App
        </Typography>
        <Button color="inherit" component={RouterLink} to="/">
          Dashboard
        </Button>
        <Button color="inherit" component={RouterLink} to="/rental-requests">
          Rental Requests
        </Button>
        <Button color="inherit" component={RouterLink} to="/quotes">
          Quotes
        </Button>
        <Button color="inherit" component={RouterLink} to="/customers">
          Customers
        </Button>
        <Button color="inherit" component={Link} to="/settings">
          Settings
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;