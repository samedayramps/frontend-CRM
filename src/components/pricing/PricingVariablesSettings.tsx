import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Typography } from '@mui/material';
import { fetchPricingVariables, updatePricingVariables } from '../../api/apiService';
import { PricingVariables } from '../../types/Pricing';
import { LoadingSpinner } from '../shared/LoadingSpinner';
import { ErrorMessage } from '../shared/ErrorMessage';

const initialPricingVariables: PricingVariables = {
  warehouseAddress: '',
  baseDeliveryFee: 0,
  deliveryFeePerMile: 0,
  baseInstallFee: 0,
  installFeePerComponent: 0,
  rentalRatePerFt: 0,
};

const PricingVariablesSettings: React.FC = () => {
  const [pricingVariables, setPricingVariables] = useState<PricingVariables>(initialPricingVariables);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchPricingVars();
  }, []);

  const fetchPricingVars = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetchPricingVariables();
      setPricingVariables(response || initialPricingVariables);
      setIsLoading(false);
    } catch (error: any) {
      setError('Failed to fetch pricing variables');
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPricingVariables((prev) => ({
      ...prev,
      [name]: name === 'warehouseAddress' ? value : parseFloat(value),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
    try {
      await updatePricingVariables(pricingVariables);
      setSuccessMessage('Pricing variables updated successfully');
    } catch (error: any) {
      setError('Failed to update pricing variables');
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6">Pricing Variables</Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="warehouseAddress"
            label="Warehouse Address"
            value={pricingVariables.warehouseAddress}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="baseDeliveryFee"
            label="Base Delivery Fee"
            type="number"
            value={pricingVariables.baseDeliveryFee}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="deliveryFeePerMile"
            label="Delivery Fee Per Mile"
            type="number"
            value={pricingVariables.deliveryFeePerMile}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="baseInstallFee"
            label="Base Install Fee"
            type="number"
            value={pricingVariables.baseInstallFee}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="installFeePerComponent"
            label="Install Fee Per Component"
            type="number"
            value={pricingVariables.installFeePerComponent}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="rentalRatePerFt"
            label="Rental Rate Per Ft"
            type="number"
            value={pricingVariables.rentalRatePerFt}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Update Pricing Variables
          </Button>
        </Grid>
      </Grid>
      {successMessage && (
        <Typography color="primary" style={{ marginTop: '16px' }}>
          {successMessage}
        </Typography>
      )}
    </form>
  );
};

export default PricingVariablesSettings;