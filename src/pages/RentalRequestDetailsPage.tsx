import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Paper, Button, Grid, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from '@mui/material';
import { Delete as DeleteIcon, PersonAdd as PersonAddIcon } from '@mui/icons-material';
import { fetchRentalRequest, createCustomerFromRentalRequest, deleteRentalRequest } from '../api/apiService';
import { RentalRequest } from '../types/RentalRequest';
import { Customer } from '../types/Customer';

const RentalRequestDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [rentalRequest, setRentalRequest] = useState<RentalRequest | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [creatingCustomer, setCreatingCustomer] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const loadRentalRequest = async () => {
      try {
        if (id) {
          const data = await fetchRentalRequest(id);
          setRentalRequest(data);
        }
      } catch (err: any) {
        setError(err.message || 'Failed to fetch rental request');
      } finally {
        setLoading(false);
      }
    };
    loadRentalRequest();
  }, [id]);

  const handleCreateCustomer = async () => {
    if (!id) return;
    setCreatingCustomer(true);
    try {
      const newCustomer: Customer = await createCustomerFromRentalRequest(id);
      // Navigate to the new customer's details page
      navigate(`/customers/${newCustomer._id}`);
    } catch (err: any) {
      setError(err.message || 'Failed to create customer');
    } finally {
      setCreatingCustomer(false);
    }
  };

  const handleDelete = async () => {
    if (!id) return;
    setIsDeleting(true);
    try {
      await deleteRentalRequest(id);
      navigate('/rental-requests');
    } catch (err: any) {
      setError(err.message || 'Failed to delete rental request');
    } finally {
      setIsDeleting(false);
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!rentalRequest) return <Typography>Rental request not found</Typography>;

  return (
    <Paper elevation={3} className="p-4">
      <Typography variant="h4" gutterBottom>Rental Request Details</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography><strong>Customer Name:</strong> {rentalRequest.customerInfo.firstName} {rentalRequest.customerInfo.lastName}</Typography>
          <Typography><strong>Email:</strong> {rentalRequest.customerInfo.email}</Typography>
          <Typography><strong>Phone:</strong> {rentalRequest.customerInfo.phone}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography><strong>Install Address:</strong> {rentalRequest.installAddress}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography><strong>Install Timeframe:</strong> {rentalRequest.rampDetails.installTimeframe}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography><strong>Mobility Aids:</strong> {rentalRequest.rampDetails.mobilityAids.join(', ')}</Typography>
        </Grid>
        {/* Only render additional notes if the property exists */}
        {'additionalNotes' in rentalRequest && (
          <Grid item xs={12}>
            <Typography><strong>Additional Notes:</strong> {rentalRequest.additionalNotes || 'None'}</Typography>
          </Grid>
        )}
        <Grid item xs={12}>
          <IconButton
            onClick={handleCreateCustomer}
            color="primary"
            aria-label="create customer"
            disabled={creatingCustomer}
          >
            <PersonAddIcon />
          </IconButton>
          <IconButton
            onClick={() => setIsDeleting(true)}
            color="secondary"
            aria-label="delete rental request"
          >
            <DeleteIcon />
          </IconButton>
        </Grid>
      </Grid>

      <Dialog
        open={isDeleting}
        onClose={() => setIsDeleting(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this rental request? This action cannot be undone.
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
    </Paper>
  );
};

export default RentalRequestDetailsPage;