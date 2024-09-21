import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Typography, Paper, Button, CircularProgress, Link } from '@mui/material';
import { acceptQuote } from '../api/apiService';
import { ErrorMessage } from '../components/shared/ErrorMessage';

interface AcceptanceResponse {
  message: string;
  paymentLink: string;
  signatureLink: string;
}

const QuoteAcceptancePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [acceptanceData, setAcceptanceData] = useState<AcceptanceResponse | null>(null);

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
        const response = await acceptQuote(id, token);
        setAcceptanceData(response);
      } catch (err: any) {
        console.error('Error in acceptQuoteWithToken:', err);
        if (err.message.includes('Invalid or expired acceptance token')) {
          setError('The acceptance link has expired. Please contact support for assistance.');
        } else {
          setError(err.message || 'Failed to accept quote');
        }
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
        If you continue to experience issues, please contact our support team with the following information:
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
        Quote Accepted
      </Typography>
      {acceptanceData ? (
        <>
          <Typography>
            {acceptanceData.message}
          </Typography>
          <Typography variant="h6" gutterBottom className="mt-4">
            Next Steps:
          </Typography>
          <Typography>
            1. <Link href={acceptanceData.paymentLink} target="_blank" rel="noopener noreferrer">Make your payment</Link>
          </Typography>
          <Typography>
            2. <Link href={acceptanceData.signatureLink} target="_blank" rel="noopener noreferrer">Sign the agreement</Link>
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
          There was an issue processing the quote acceptance. Please try again or contact support.
        </Typography>
      )}
    </Paper>
  );
};

export default QuoteAcceptancePage;