import React, { useEffect, useState } from 'react';
import { Typography, Grid, TextField, InputAdornment, Button } from '@mui/material';
import { Search } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { fetchRentalRequests } from '../api/apiService';
import { RentalRequest } from '../types/RentalRequest';
import EntityCard from '../components/shared/EntityCard';
import { LoadingSpinner } from '../components/shared/LoadingSpinner';
import { ErrorMessage } from '../components/shared/ErrorMessage';

const RentalRequestsPage: React.FC = () => {
  const [rentalRequests, setRentalRequests] = useState<RentalRequest[]>([]);
  const [filteredRequests, setFilteredRequests] = useState<RentalRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const loadRentalRequests = async () => {
      try {
        const data = await fetchRentalRequests();
        setRentalRequests(data);
        setFilteredRequests(data);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch rental requests');
      } finally {
        setIsLoading(false);
      }
    };
    loadRentalRequests();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredRequests(
      rentalRequests.filter((request) =>
        `${request.customerInfo.firstName} ${request.customerInfo.lastName}`.toLowerCase().includes(query)
      )
    );
  };

  const handleCardClick = (id: string) => {
    navigate(`/rental-requests/${id}`);
  };

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="p-4">
      <Typography variant="h4" gutterBottom>
        Rental Requests
      </Typography>
      <div className="flex justify-between mb-4">
        <TextField
          placeholder="Search rental requests"
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
          onClick={() => navigate('/rental-requests/new')}
        >
          Create Rental Request
        </Button>
      </div>
      <Grid container spacing={3}>
        {filteredRequests.map((request) => (
          <Grid item xs={12} sm={6} md={4} key={request._id}>
            <EntityCard
              id={request._id}
              title={`${request.customerInfo.firstName} ${request.customerInfo.lastName}`}
              subtitle={`Status: ${request.status}`}
              entityType="rentalRequest"
              onClick={() => handleCardClick(request._id)}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default RentalRequestsPage;