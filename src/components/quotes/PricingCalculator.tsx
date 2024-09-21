// src/components/quotes/PricingCalculator.tsx

import React, { useState, useEffect } from 'react';
import { Typography, Paper, Grid, CircularProgress } from '@mui/material';
import { RampConfiguration } from '../../types/Quote';
import { PricingVariables } from '../../types/Pricing';
import { calculatePricing, fetchPricingVariables } from '../../api/apiService';

interface PricingCalculatorProps {
  rampConfiguration: RampConfiguration;
  customerAddress: string;
}

const PricingCalculator: React.FC<PricingCalculatorProps> = ({ rampConfiguration, customerAddress }) => {
  const [pricingVariables, setPricingVariables] = useState<PricingVariables | null>(null);
  const [pricing, setPricing] = useState<{
    deliveryFee: number;
    installFee: number;
    monthlyRentalRate: number;
    totalAmount: number;
    distance: number;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVariables = async () => {
      try {
        const variables = await fetchPricingVariables();
        setPricingVariables(variables);
      } catch (err: any) {
        setError('Failed to fetch pricing variables');
        setIsLoading(false);
      }
    };
    fetchVariables();
  }, []);

  useEffect(() => {
    const calculatePrices = async () => {
      if (pricingVariables && customerAddress && rampConfiguration.components.length > 0) {
        setIsLoading(true);
        setError(null);
        try {
          const result = await calculatePricing(rampConfiguration, customerAddress, pricingVariables.warehouseAddress);
          setPricing(result);
        } catch (err: any) {
          console.error('Error calculating pricing:', err);
          setError('Failed to calculate pricing');
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };
    calculatePrices();
  }, [rampConfiguration, customerAddress, pricingVariables]);

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (!pricing) {
    return <Typography>Please configure the ramp to see pricing.</Typography>;
  }

  return (
    <Paper elevation={3} style={{ padding: '16px', marginTop: '16px' }}>
      <Typography variant="h6" gutterBottom>Pricing Calculation</Typography>
      <Grid container spacing={2}>
        {Object.entries(pricing).map(([key, value]) => (
          <React.Fragment key={key}>
            <Grid item xs={6}>
              <Typography>{key.charAt(0).toUpperCase() + key.slice(1)}:</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>
                {typeof value === 'number' ? 
                  (key === 'distance' ? `${value.toFixed(2)} miles` : `$${value.toFixed(2)}`) : 
                  value}
              </Typography>
            </Grid>
          </React.Fragment>
        ))}
      </Grid>
    </Paper>
  );
};

export default PricingCalculator;