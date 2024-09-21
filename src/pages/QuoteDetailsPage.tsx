import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Paper, Button, Grid, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { fetchQuote, createQuote, updateQuote, deleteQuote, fetchCustomers } from '../api/apiService';
import { Quote } from '../types/Quote';
import { Customer } from '../types/Customer';
import { LoadingSpinner } from '../components/shared/LoadingSpinner';
import { ErrorMessage } from '../components/shared/ErrorMessage';
import QuoteForm from '../components/quotes/QuoteForm';

const QuoteDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [quote, setQuote] = useState<Quote | null>(null);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const customersData = await fetchCustomers();
        setCustomers(customersData);

        if (id) {
          const quoteData = await fetchQuote(id);
          setQuote(quoteData);
        } else {
          setIsEditing(true);
        }
      } catch (err: any) {
        setError(err.message || 'Failed to fetch data');
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, [id]);

  const handleSave = async (quoteData: Omit<Quote, '_id' | 'createdAt' | 'updatedAt'>): Promise<void> => {
    setIsLoading(true);
    setError(null);
    try {
      if (id) {
        const updatedQuote = await updateQuote(id, quoteData);
        setQuote(updatedQuote);
        setIsEditing(false);
      } else {
        const newQuoteData: Omit<Quote, '_id'> = {
          ...quoteData,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        await createQuote(newQuoteData);
        navigate('/quotes');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to save quote');
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

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!quote && id) return <ErrorMessage message="Quote not found" />;

  return (
    <div className="p-4">
      <Typography variant="h4" gutterBottom>
        {id ? 'Quote Details' : 'Create New Quote'}
      </Typography>
      <Paper elevation={3} className="p-4">
        {isEditing || !id ? (
          <QuoteForm
            quote={quote}
            customers={customers}
            onSave={handleSave}
            onCancel={handleCancelEdit}
          />
        ) : quote ? (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6">Customer Name</Typography>
              <Typography>{quote.customerName}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Total Upfront</Typography>
              <Typography>${quote.pricingCalculations.totalUpfront.toFixed(2)}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6">Monthly Rental Rate</Typography>
              <Typography>${quote.pricingCalculations.monthlyRentalRate.toFixed(2)}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Ramp Configuration</Typography>
              <Typography>
                {quote.rampConfiguration.components.map((component, index) => (
                  <span key={index}>
                    {component.type}: {component.length}ft
                    {component.width ? ` x ${component.width}ft` : ''}
                    {index < quote.rampConfiguration.components.length - 1 ? ', ' : ''}
                  </span>
                ))}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Status</Typography>
              <Typography>{quote.status}</Typography>
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
        onClick={() => navigate('/quotes')}
        className="mt-4"
      >
        Back to Quotes
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
            Are you sure you want to delete this quote? This action cannot be undone.
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

export default QuoteDetailsPage;