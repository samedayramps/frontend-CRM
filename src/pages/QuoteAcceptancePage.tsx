import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Typography, Paper, Button, CircularProgress } from '@mui/material';
import { acceptQuote } from '../api/apiService';
import { ErrorMessage } from '../components/shared/ErrorMessage';

const QuoteAcceptancePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    console.log('QuoteAcceptancePage mounted');
    const acceptQuoteWithToken = async () => {
      console.log('Accepting quote...');
      const searchParams = new URLSearchParams(location.search);
      const token = searchParams.get('token');
      console.log('ID:', id, 'Token:', token);
      if (!id || !token) {
        setError('Invalid quote ID or token');
        setIsLoading(false);
        return;
      }

      try {
        await acceptQuote(id, token);
        setAccepted(true);
      } catch (err: any) {
        console.error('Error in acceptQuoteWithToken:', err);
        setError(err.message || 'Failed to accept quote');
      } finally {
        setIsLoading(false);
      }
    };

    acceptQuoteWithToken();
  }, [id, location.search]);

  if (isLoading) return <CircularProgress />;
  if (error) return (
    <Paper elevation={3} className="p-4">
      <Typography variant="h4" gutterBottom color="error">
        Error Accepting Quote
      </Typography>
      <ErrorMessage message={error} />
      <Typography variant="body1" gutterBottom>
        Please try again or contact support with the following information:
      </Typography>
      <Typography variant="body2">
        Quote ID: {id}
      </Typography>
      <Typography variant="body2">
        Error Time: {new Date().toISOString()}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate('/')}
        className="mt-4"
      >
        Return to Home
      </Button>
    </Paper>
  );

  return (
    <Paper elevation={3} className="p-4">
      <Typography variant="h4" gutterBottom>
        {accepted ? 'Quote Accepted' : 'Quote Acceptance'}
      </Typography>
      {accepted ? (
        <>
          <Typography>
            Thank you for accepting the quote. You will receive an email shortly with further instructions
            for payment and signing the agreement.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/')}
            className="mt-4"
          >
            Return to Home
          </Button>
        </>
      ) : (
        <Typography color="error">
          There was an issue accepting the quote. Please try again or contact support.
        </Typography>
      )}
    </Paper>
  );
};

export default QuoteAcceptancePage;