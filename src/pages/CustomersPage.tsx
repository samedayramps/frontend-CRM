import React, { useEffect, useState } from 'react';
import { Typography, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { fetchCustomers } from '../api/apiService';
import { Customer } from '../types/Customer';
import EntityCard from '../components/shared/EntityCard';
import { LoadingSpinner } from '../components/shared/LoadingSpinner';
import { ErrorMessage } from '../components/shared/ErrorMessage';

const CustomersPage: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadCustomers = async () => {
      try {
        const data = await fetchCustomers();
        setCustomers(data);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch customers');
      } finally {
        setIsLoading(false);
      }
    };
    loadCustomers();
  }, []);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <Typography variant="h4">Customers</Typography>
        <button
          onClick={() => navigate('/customers/new')}
          className="btn-primary"
        >
          Create New Customer
        </button>
      </div>
      <Grid container spacing={2}>
        {customers.map((customer) => (
          <Grid item xs={12} sm={6} md={4} key={customer._id}>
            <EntityCard
              id={customer._id}
              title={`${customer.firstName} ${customer.lastName}`}
              subtitle={customer.email}
              entityType="customer"
              onClick={() => navigate(`/customers/${customer._id}`)}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default CustomersPage;