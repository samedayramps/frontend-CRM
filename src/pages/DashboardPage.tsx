import React, { useEffect, useState } from 'react';
import { 
  Typography, 
  Grid, 
  Paper, 
  Button, 
  CircularProgress, 
  Table, 
  TableHead, 
  TableRow, 
  TableCell, 
  TableBody,
  TableContainer // Add this import
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { RentalRequest } from '../types/RentalRequest';
import { Quote } from '../types/Quote';
import { fetchRentalRequests, fetchQuotes } from '../api/apiService';

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();

  const [recentRentalRequests, setRecentRentalRequests] = useState<RentalRequest[]>([]);
  const [recentQuotes, setRecentQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [rentalRequests, quotes] = await Promise.all([
          fetchRentalRequests(),
          fetchQuotes(),
        ]);
        
        console.log('Rental Requests:', rentalRequests);
        console.log('Quotes:', quotes);
        
        setRecentRentalRequests(rentalRequests.slice(-5).reverse());
        setRecentQuotes(quotes.slice(-5).reverse());
      } catch (err: any) {
        console.error('Error fetching data:', err);
        setError(err.message || 'Failed to fetch data.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleRentalRequestClick = (id: string) => {
    navigate(`/rental-requests/${id}`);
  };

  const handleQuoteClick = (id: string) => {
    navigate(`/quotes/${id}`);
  };

  return (
    <div className="p-4">
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <Grid container spacing={3}>
          {/* Recent Rental Requests */}
          <Grid item xs={12} md={6}>
            <Paper elevation={3} style={{ padding: '16px' }}>
              <Typography variant="h6" gutterBottom>
                Recent Rental Requests
              </Typography>
              {recentRentalRequests.length > 0 ? (
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Customer Name</TableCell>
                        <TableCell>Install Address</TableCell>
                        <TableCell>Timeframe</TableCell>
                        <TableCell>Date</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {recentRentalRequests.map((request) => (
                        <TableRow 
                          key={request._id} 
                          onClick={() => handleRentalRequestClick(request._id)}
                          style={{ cursor: 'pointer' }}
                          hover
                        >
                          <TableCell>{`${request.customerInfo.firstName} ${request.customerInfo.lastName}`}</TableCell>
                          <TableCell>{request.installAddress}</TableCell>
                          <TableCell>{request.rampDetails.installTimeframe}</TableCell>
                          <TableCell>{new Date(request.createdAt || '').toLocaleDateString()}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                <Typography>No recent rental requests.</Typography>
              )}
            </Paper>
          </Grid>

          {/* Recent Quotes */}
          <Grid item xs={12} md={6}>
            <Paper elevation={3} style={{ padding: '16px' }}>
              <Typography variant="h6" gutterBottom>
                Recent Quotes
              </Typography>
              {recentQuotes.length > 0 ? (
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Customer</TableCell>
                        <TableCell>Total Upfront</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Created At</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {recentQuotes.map((quote) => (
                        <TableRow 
                          key={quote._id}
                          onClick={() => handleQuoteClick(quote._id)}
                          style={{ cursor: 'pointer' }}
                          hover
                        >
                          <TableCell>{quote.customerName}</TableCell>
                          <TableCell>${quote.pricingCalculations.totalUpfront.toFixed(2)}</TableCell>
                          <TableCell>{quote.status}</TableCell>
                          <TableCell>{quote.createdAt ? new Date(quote.createdAt).toLocaleDateString() : 'N/A'}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                <Typography>No recent quotes.</Typography>
              )}
            </Paper>
          </Grid>
        </Grid>
      )}

      <Grid container spacing={2} style={{ marginTop: '16px' }}>
        <Grid item xs={12} sm={6}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => navigate('/rental-requests')}
          >
            View All Rental Requests
          </Button>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            onClick={() => navigate('/quotes')}
          >
            Manage All Quotes
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default DashboardPage;