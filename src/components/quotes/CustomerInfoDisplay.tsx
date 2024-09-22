import React from 'react';
import { Typography, Paper, Grid } from '@mui/material';
import { Customer } from '../../types/Customer';

interface CustomerInfoDisplayProps {
  customer: Customer;
  distance: number;
}

const CustomerInfoDisplay: React.FC<CustomerInfoDisplayProps> = ({ customer, distance }) => {
  return (
    <Paper elevation={3} style={{ padding: '16px', marginBottom: '16px' }}>
      <Typography variant="h6" gutterBottom>Customer Information</Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography><strong>Name:</strong> {customer.firstName} {customer.lastName}</Typography>
          <Typography><strong>Email:</strong> {customer.email}</Typography>
          <Typography><strong>Phone:</strong> {customer.phone}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography><strong>Install Address:</strong></Typography>
          <Typography>{customer.installAddress}</Typography>
          <Typography><strong>Distance:</strong> {distance.toFixed(2)} miles</Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default CustomerInfoDisplay;