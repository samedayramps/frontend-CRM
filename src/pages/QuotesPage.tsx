import React, { useEffect, useState } from 'react';
import { Typography, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { fetchQuotes } from '../api/apiService';
import { Quote } from '../types/Quote';
import EntityCard from '../components/shared/EntityCard';
import { LoadingSpinner } from '../components/shared/LoadingSpinner';
import { ErrorMessage } from '../components/shared/ErrorMessage';

const QuotesPage: React.FC = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadQuotes = async () => {
      try {
        const data = await fetchQuotes();
        setQuotes(data);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch quotes');
      } finally {
        setIsLoading(false);
      }
    };
    loadQuotes();
  }, []);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <Typography variant="h4">Quotes</Typography>
        <button
          onClick={() => navigate('/quotes/new')}
          className="btn-primary"
        >
          Create New Quote
        </button>
      </div>
      <Grid container spacing={2}>
        {quotes.map((quote) => (
          <Grid item xs={12} sm={6} md={4} key={quote._id}>
            <EntityCard
              id={quote._id}
              title={`Quote for ${quote.customerName}`}
              subtitle={`Status: ${quote.status}`}
              entityType="quote"
              onClick={() => navigate(`/quotes/${quote._id}`)}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default QuotesPage;