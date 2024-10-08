import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Paper, Grid, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Snackbar } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Send as SendIcon, Work as WorkIcon } from '@mui/icons-material';
import { fetchQuote, updateQuote, deleteQuote, fetchCustomers, createQuote, sendQuoteEmail, createJobFromQuote } from '../api/apiService';
import { Quote, NewQuote } from '../types/Quote';
import { Customer } from '../types/Customer';
import { LoadingSpinner } from '../components/shared/LoadingSpinner';
import { ErrorMessage } from '../components/shared/ErrorMessage';
import QuoteForm from '../components/quotes/QuoteForm';

const QuoteDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [quote, setQuote] = useState<Quote | NewQuote | null>(null);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isCreatingJob, setIsCreatingJob] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        const [quoteData, customersData] = await Promise.all([
          id ? fetchQuote(id) : Promise.resolve(null),
          fetchCustomers()
        ]);
        if (quoteData) {
          setQuote(quoteData);
        } else if (!id) {
          // Initialize a new quote when creating
          setQuote({
            customerId: '',
            customerName: '',
            rampConfiguration: { components: [], totalLength: 0 },
            pricingCalculations: {
              deliveryFee: 0,
              installFee: 0,
              monthlyRentalRate: 0,
              totalUpfront: 0,
              distance: 0,
              warehouseAddress: '',
            },
            status: 'draft',
            paymentStatus: 'pending',
            agreementStatus: 'pending',
            installAddress: '',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          });
          setIsEditing(true);
        }
        setCustomers(customersData);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch data');
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, [id]);

  const handleSave = async (quoteData: NewQuote) => {
    setIsLoading(true);
    setError(null);
    try {
      console.log('Saving quote data:', quoteData);
      if (id) {
        const updatedQuote = await updateQuote(id, quoteData);
        setQuote(updatedQuote);
        setIsEditing(false);
      } else {
        console.log('Creating new quote with data:', quoteData);
        const createdQuote = await createQuote(quoteData);
        console.log('New quote created:', createdQuote);
        navigate(`/quotes/${createdQuote._id}`);
      }
    } catch (err: any) {
      console.error('Error saving quote:', err);
      setError(err.message || 'Failed to save quote');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (id) {
      setIsLoading(true);
      setError(null);
      try {
        await deleteQuote(id);
        navigate('/quotes');
      } catch (err: any) {
        setError(err.message || 'Failed to delete quote');
      } finally {
        setIsLoading(false);
        setIsDeleting(false);
      }
    }
  };

  const handleSendQuote = async () => {
    if (id) {
      console.log(`Attempting to send quote with ID: ${id}`);
      setIsSending(true);
      setError(null);
      try {
        console.log('Calling sendQuoteEmail API...');
        await sendQuoteEmail(id);
        console.log('Quote email sent successfully');
        
        // Update the quote status locally
        setQuote(prevQuote => {
          if (prevQuote) {
            console.log(`Updating quote status from ${prevQuote.status} to 'sent'`);
            return { ...prevQuote, status: 'sent' };
          }
          return null;
        });
        
        console.log('Quote status updated locally');
      } catch (err: any) {
        console.error('Error in handleSendQuote:', err);
        setError(err.message || 'Failed to send quote email');
      } finally {
        setIsSending(false);
        console.log('Send quote process completed');
      }
    } else {
      console.warn('Attempted to send quote without a valid ID');
    }
  };

  const handleCreateJob = async () => {
    if (id) {
      setIsCreatingJob(true);
      setError(null);
      try {
        const job = await createJobFromQuote(id);
        setSnackbarMessage('Job created successfully');
        setSnackbarOpen(true);
        // Optionally navigate to the new job's details page
        navigate(`/jobs/${job._id}`);
      } catch (err: any) {
        console.error('Error creating job:', err);
        setError(err.message || 'Failed to create job');
        setSnackbarMessage('Failed to create job');
        setSnackbarOpen(true);
      } finally {
        setIsCreatingJob(false);
      }
    }
  };

  const renderStatus = (label: string, status: string) => (
    <Typography>
      <strong>{label}:</strong> {status.charAt(0).toUpperCase() + status.slice(1)}
    </Typography>
  );

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!quote && id) return <ErrorMessage message="Quote not found" />;

  return (
    <div className="p-4">
      <Typography variant="h4" gutterBottom>
        {id ? 'Quote Details' : 'Create New Quote'}
      </Typography>
      <Paper elevation={3} className="p-4">
        {(isEditing || !id) ? (
          <QuoteForm
            quote={quote as NewQuote}
            customers={customers}
            onSave={handleSave}
            onCancel={() => id ? setIsEditing(false) : navigate('/quotes')}
          />
        ) : quote && '_id' in quote ? (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6">Customer: {quote.customerName || 'N/A'}</Typography>
              {renderStatus('Quote Status', quote.status)}
              {renderStatus('Payment Status', quote.paymentStatus)}
              {renderStatus('Agreement Status', quote.agreementStatus)}
              <Typography>Total Upfront: ${quote.pricingCalculations.totalUpfront.toFixed(2)}</Typography>
              <Typography>Monthly Rental Rate: ${quote.pricingCalculations.monthlyRentalRate.toFixed(2)}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Ramp Configuration</Typography>
              {quote.rampConfiguration.components.map((component, index) => (
                <Typography key={index}>
                  {component.type === 'ramp' ? 'Ramp' : 'Landing'}: 
                  {component.length}ft x {component.quantity}
                  {component.width ? ` (${component.width}ft wide)` : ''}
                </Typography>
              ))}
              <Typography>Total Length: {quote.rampConfiguration.totalLength}ft</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Installation Address</Typography>
              <Typography>{quote.installAddress}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Pricing Details</Typography>
              <Typography>Delivery Fee: ${quote.pricingCalculations.deliveryFee.toFixed(2)}</Typography>
              <Typography>Install Fee: ${quote.pricingCalculations.installFee.toFixed(2)}</Typography>
              <Typography>Distance: {quote.pricingCalculations.distance.toFixed(2)} miles</Typography>
            </Grid>
            <Grid item xs={12}>
              <IconButton 
                onClick={() => setIsEditing(true)} 
                color="primary" 
                aria-label="edit quote"
              >
                <EditIcon />
              </IconButton>
              <IconButton 
                onClick={() => setIsDeleting(true)}
                color="secondary"
                aria-label="delete quote"
              >
                <DeleteIcon />
              </IconButton>
              <IconButton
                onClick={handleSendQuote}
                color="primary"
                aria-label="send quote"
                disabled={isSending || (quote && '_id' in quote && quote.status !== 'draft')}
              >
                <SendIcon />
              </IconButton>
              <IconButton
                onClick={handleCreateJob}
                color="primary"
                aria-label="create job"
                disabled={isCreatingJob || (quote && '_id' in quote && quote.status !== 'accepted')}
              >
                <WorkIcon />
              </IconButton>
            </Grid>
          </Grid>
        ) : null}
      </Paper>
      <button
        onClick={() => navigate('/quotes')}
        className="btn-primary mt-4"
      >
        Back to Quotes
      </button>

      <Dialog
        open={isDeleting}
        onClose={() => setIsDeleting(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this quote? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <button onClick={() => setIsDeleting(false)} className="btn-secondary">
            Cancel
          </button>
          <button onClick={handleDelete} className="btn-primary">
            Delete
          </button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
    </div>
  );
};

export default QuoteDetailsPage;