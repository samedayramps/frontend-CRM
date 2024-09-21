import React, { useState, useEffect } from 'react';
import { Typography, Grid, TextField, InputAdornment, Button } from '@mui/material';
import { Search } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { fetchQuotes } from '../api/apiService';
import { Quote } from '../types/Quote';
import EntityCard from '../components/shared/EntityCard';
import { LoadingSpinner } from '../components/shared/LoadingSpinner';
import { ErrorMessage } from '../components/shared/ErrorMessage';

const QuotesPage: React.FC = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [filteredQuotes, setFilteredQuotes] = useState<Quote[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const loadQuotes = async () => {
      try {
        const data = await fetchQuotes();
        setQuotes(data);
        setFilteredQuotes(data);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch quotes');
      } finally {
        setIsLoading(false);
      }
    };
    loadQuotes();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredQuotes(
      quotes.filter((quote) =>
        quote.customerName.toLowerCase().includes(query)
      )
    );
  };

  const handleCardClick = (id: string) => {
    navigate(`/quotes/${id}`);
  };

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="p-4">
      <Typography variant="h4" gutterBottom>
        Quotes
      </Typography>
      <div className="flex justify-between mb-4">
        <TextField
          placeholder="Search quotes"
          value={searchQuery}
          onChange={handleSearch}
          variant="outlined"
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/quotes/new')}
        >
          Create Quote
        </Button>
      </div>
      <Grid container spacing={3}>
        {filteredQuotes.map((quote) => (
          <Grid item xs={12} sm={6} md={4} key={quote._id}>
            <EntityCard
              id={quote._id}
              title={quote.customerName}
              subtitle={`Total: $${quote.pricingCalculations.totalUpfront.toFixed(2)} | Status: ${quote.status}`}
              entityType="quote"
              onClick={() => handleCardClick(quote._id)}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default QuotesPage;