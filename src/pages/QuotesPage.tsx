import React, { useState, useEffect } from 'react';
import { Typography, Button, Grid } from '@mui/material';
import { useLocation } from 'react-router-dom';
import QuoteForm from '../components/quotes/QuoteForm';
import { Quote } from '../types/Quote';
import { Customer } from '../types/Customer';
import { fetchQuotes, createQuote, updateQuote, deleteQuote, fetchCustomers } from '../api/apiService';
import { LoadingSpinner } from '../components/shared/LoadingSpinner';
import { ErrorMessage } from '../components/shared/ErrorMessage';
import QuoteCard from '../components/quotes/QuoteCard';

const QuotesPage: React.FC = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    fetchQuotesData();
    fetchCustomersData();
  }, []);

  useEffect(() => {
    if (location.state && (location.state as any).customer) {
      const customer = (location.state as any).customer as Customer;
      setSelectedQuote({
        _id: '',
        customerId: customer._id,
        customerName: `${customer.firstName} ${customer.lastName}`,
        rampConfiguration: {
          components: [],
          totalLength: 0,
        },
        pricingCalculations: {
          deliveryFee: 0,
          installFee: 0,
          monthlyRentalRate: 0,
          totalUpfront: 0,
          distance: 0,
        },
        status: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
      setIsFormOpen(true);
    }
  }, [location.state]);

  const fetchQuotesData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchQuotes();
      setQuotes(data);
    } catch (error: any) {
      setError(error.message || 'Failed to fetch quotes.');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCustomersData = async () => {
    try {
      const data = await fetchCustomers();
      setCustomers(data);
    } catch (error: any) {
      setError(error.message || 'Failed to fetch customers.');
    }
  };

  const handleCreateQuote = async (quoteData: Quote) => {
    try {
      const { _id, ...newQuoteData } = quoteData; // Remove _id for creation
      const createdQuote = await createQuote(newQuoteData);
      setQuotes(prevQuotes => [...prevQuotes, createdQuote]);
      setIsFormOpen(false);
    } catch (error: any) {
      setError(`Failed to create quote: ${error.message}`);
    }
  };

  const handleUpdateQuote = async (quoteData: Quote) => {
    try {
      const updatedQuote = await updateQuote(quoteData._id, quoteData);
      setQuotes(quotes.map(quote => quote._id === updatedQuote._id ? updatedQuote : quote));
      setSelectedQuote(null);
      setIsFormOpen(false);
    } catch (error: any) {
      setError(`Failed to update quote: ${error.message}`);
    }
  };

  const handleDeleteQuote = async (quoteId: string) => {
    try {
      await deleteQuote(quoteId);
      setQuotes(quotes.filter(quote => quote._id !== quoteId));
      if (selectedQuote && selectedQuote._id === quoteId) {
        setSelectedQuote(null);
      }
    } catch (error: any) {
      setError(`Failed to delete quote: ${error.message}`);
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="p-4">
      <Typography variant="h4" gutterBottom>
        Quotes
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setIsFormOpen(true)}
        style={{ marginBottom: '20px' }}
      >
        Create New Quote
      </Button>
      {isFormOpen ? (
        <QuoteForm
          quote={selectedQuote}
          customers={customers}
          onSave={selectedQuote ? handleUpdateQuote : handleCreateQuote}
          onCancel={() => {
            setIsFormOpen(false);
            setSelectedQuote(null);
          }}
        />
      ) : (
        <Grid container spacing={2}>
          {quotes.map((quote) => (
            <Grid item xs={12} sm={6} md={4} key={quote._id}>
              <QuoteCard
                quote={quote}
                onEdit={() => {
                  setSelectedQuote(quote);
                  setIsFormOpen(true);
                }}
                onDelete={() => handleDeleteQuote(quote._id)}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default QuotesPage;