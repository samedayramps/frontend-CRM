import React, { useEffect, useState } from 'react';
import { Typography, Grid, TextField, InputAdornment, Button } from '@mui/material';
import { Search } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { fetchCustomers } from '../api/apiService';
import { Customer } from '../types/Customer';
import EntityCard from '../components/shared/EntityCard';
import { LoadingSpinner } from '../components/shared/LoadingSpinner';
import { ErrorMessage } from '../components/shared/ErrorMessage';

const CustomersPage: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const loadCustomers = async () => {
      try {
        const data = await fetchCustomers();
        setCustomers(data);
        setFilteredCustomers(data);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch customers');
      } finally {
        setIsLoading(false);
      }
    };
    loadCustomers();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredCustomers(
      customers.filter((customer) =>
        `${customer.firstName} ${customer.lastName}`.toLowerCase().includes(query)
      )
    );
  };

  const handleCardClick = (id: string) => {
    navigate(`/customers/${id}`);
  };

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="p-4">
      <Typography variant="h4" gutterBottom>
        Customers
      </Typography>
      <div className="flex justify-between mb-4">
        <TextField
          placeholder="Search customers"
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
          onClick={() => navigate('/customers/new')}
        >
          Create Customer
        </Button>
      </div>
      <Grid container spacing={3}>
        {filteredCustomers.map((customer) => (
          <Grid item xs={12} sm={6} md={4} key={customer._id}>
            <EntityCard
              id={customer._id}
              title={`${customer.firstName} ${customer.lastName}`}
              subtitle={customer.email}
              entityType="customer"
              onClick={() => handleCardClick(customer._id)}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default CustomersPage;