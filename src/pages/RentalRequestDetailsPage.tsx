import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Paper, Button, Grid, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { fetchRentalRequest, createRentalRequest, updateRentalRequest, deleteRentalRequest } from '../api/apiService';
import { RentalRequest } from '../types/RentalRequest';
import { LoadingSpinner } from '../components/shared/LoadingSpinner';
import { ErrorMessage } from '../components/shared/ErrorMessage';
import RentalRequestForm from '../components/rental-requests/RentalRequestForm';

const RentalRequestDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [rentalRequest, setRentalRequest] = useState<RentalRequest | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const loadRentalRequest = async () => {
      if (id) {
        try {
          const data = await fetchRentalRequest(id);
          setRentalRequest(data);
        } catch (err: any) {
          setError(err.message || 'Failed to fetch rental request details');
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsEditing(true);
        setIsLoading(false);
      }
    };
    loadRentalRequest();
  }, [id]);

  const handleSave = async (requestData: Omit<RentalRequest, '_id' | 'createdAt' | 'updatedAt'>) => {
    setIsLoading(true);
    setError(null);
    try {
      if (id) {
        const updatedRequest = await updateRentalRequest(id, requestData);
        setRentalRequest(updatedRequest);
        setIsEditing(false);
      } else {
        const newRequestData: Omit<RentalRequest, '_id' | 'createdAt'> = {
          ...requestData,
          status: requestData.status || 'pending',
          updatedAt: new Date().toISOString()
        };
        await createRentalRequest(newRequestData);
        navigate('/rental-requests');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to save rental request');
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
        await deleteRentalRequest(id);
        navigate('/rental-requests');
      } catch (err: any) {
        setError(err.message || 'Failed to delete rental request');
      } finally {
        setIsLoading(false);
        setIsDeleting(false);
      }
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!rentalRequest && id) return <ErrorMessage message="Rental request not found" />;

  return (
    <div className="p-4">
      <Typography variant="h4" gutterBottom>
        {id ? 'Rental Request Details' : 'Create New Rental Request'}
      </Typography>
      <Paper elevation={3} className="p-4">
        {isEditing || !id ? (
          <RentalRequestForm
            rentalRequest={rentalRequest}
            onSave={handleSave}
            onCancel={handleCancelEdit}
          />
        ) : rentalRequest ? (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6">Customer Information</Typography>
              <Typography>Name: {`${rentalRequest.customerInfo.firstName} ${rentalRequest.customerInfo.lastName}`}</Typography>
              <Typography>Email: {rentalRequest.customerInfo.email}</Typography>
              <Typography>Phone: {rentalRequest.customerInfo.phone}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Ramp Details</Typography>
              <Typography>Install Address: {rentalRequest.installAddress}</Typography>
              <Typography>Install Timeframe: {rentalRequest.rampDetails.installTimeframe}</Typography>
              <Typography>Mobility Aids: {rentalRequest.rampDetails.mobilityAids.join(', ')}</Typography>
              {rentalRequest.rampDetails.knowRampLength && (
                <Typography>Ramp Length: {rentalRequest.rampDetails.rampLength} ft</Typography>
              )}
              {rentalRequest.rampDetails.knowRentalDuration && (
                <Typography>Rental Duration: {rentalRequest.rampDetails.rentalDuration} months</Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Status: {rentalRequest.status}</Typography>
            </Grid>
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
        onClick={() => navigate('/rental-requests')}
        className="mt-4"
      >
        Back to Rental Requests
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
    </div>
  );
};

export default RentalRequestDetailsPage;