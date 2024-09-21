import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Paper, Button, Grid, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { fetchCustomer, createCustomer, updateCustomer, deleteCustomer } from '../api/apiService';
import { Customer } from '../types/Customer';
import { LoadingSpinner } from '../components/shared/LoadingSpinner';
import { ErrorMessage } from '../components/shared/ErrorMessage';
import CustomerForm from '../components/customers/CustomerForm';

const CustomerDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const loadCustomer = async () => {
      if (id) {
        try {
          const data = await fetchCustomer(id);
          setCustomer(data);
        } catch (err: any) {
          setError(err.message || 'Failed to fetch customer details');
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsEditing(true);
        setIsLoading(false);
      }
    };
    loadCustomer();
  }, [id]);

  const handleSave = async (customerData: Omit<Customer, '_id' | 'createdAt' | 'updatedAt'>): Promise<void> => {
    setIsLoading(true);
    setError(null);
    try {
      if (id) {
        const updatedCustomer = await updateCustomer(id, customerData);
        setCustomer(updatedCustomer);
        setIsEditing(false);
      } else {
        await createCustomer(customerData);
        navigate('/customers');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to save customer');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = () => setIsEditing(true);
  const handleCancelEdit = () => setIsEditing(false);

  const handleDelete = async () => {
    if (id) {
      setIsLoading(true);
      setError(null);
      try {
        await deleteCustomer(id);
        navigate('/customers');
      } catch (err: any) {
        setError(err.message || 'Failed to delete customer');
      } finally {
        setIsLoading(false);
        setIsDeleting(false);
      }
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!customer && id) return <ErrorMessage message="Customer not found" />;

  return (
    <div className="p-4">
      <Typography variant="h4" gutterBottom>
        {id ? 'Customer Details' : 'Create New Customer'}
      </Typography>
      <Paper elevation={3} className="p-4">
        {isEditing || !id ? (
          <CustomerForm
            customer={customer}
            onSave={handleSave}
            onCancel={handleCancelEdit}
          />
        ) : customer ? (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6">Personal Information</Typography>
              <Typography>Name: {`${customer.firstName} ${customer.lastName}`}</Typography>
              <Typography>Email: {customer.email}</Typography>
              <Typography>Phone: {customer.phone}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Address</Typography>
              <Typography>{customer.installAddress}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Mobility Aids</Typography>
              <Typography>{customer.mobilityAids.join(', ')}</Typography>
            </Grid>
            {customer.notes && (
              <Grid item xs={12}>
                <Typography variant="h6">Notes</Typography>
                <Typography>{customer.notes}</Typography>
              </Grid>
            )}
            <Grid item xs={12}>
              <Button variant="contained" color="primary" onClick={handleEdit} className="mr-2">
                Edit
              </Button>
              <Button variant="contained" color="secondary" onClick={() => setIsDeleting(true)}>
                Delete
              </Button>
            </Grid>
          </Grid>
        ) : null}
      </Paper>
      <Button
        variant="outlined"
        color="primary"
        onClick={() => navigate('/customers')}
        className="mt-4"
      >
        Back to Customers
      </Button>

      <Dialog
        open={isDeleting}
        onClose={() => setIsDeleting(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this customer? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDeleting(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="secondary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CustomerDetailsPage;