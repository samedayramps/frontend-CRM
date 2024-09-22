// src/components/quotes/PricingCalculator.tsx

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Typography, Paper, Grid, CircularProgress, Divider } from '@mui/material';
import { RampConfiguration } from '../../types/Quote';
import { PricingVariables } from '../../types/Pricing';
import { calculatePricing, fetchPricingVariables } from '../../api/apiService';
import debounce from 'lodash/debounce';

interface PricingCalculatorProps {
  rampConfiguration: RampConfiguration;
  installAddress: string;
  distance: number;
}

interface PricingResult {
  deliveryFee: number;
  installFee: number;
  monthlyRentalRate: number;
  totalUpfront: number;
  distance: number;
}

const PricingCalculator: React.FC<PricingCalculatorProps> = ({ rampConfiguration, installAddress, distance }) => {
  const [pricingVariables, setPricingVariables] = useState<PricingVariables | null>(null);
  const [pricing, setPricing] = useState<PricingResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const calculatePrices = useCallback(async (config: RampConfiguration, address: string, variables: PricingVariables) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await calculatePricing({
        rampConfiguration: config,
        installAddress: address,
        warehouseAddress: variables.warehouseAddress
      });
      console.log('Pricing calculation result:', result);
      setPricing(result);
    } catch (err: any) {
      console.error('Error calculating pricing:', err);
      setError('Failed to calculate pricing');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const debouncedCalculatePrices = useMemo(
    () => debounce(calculatePrices, 500),
    [calculatePrices]
  );

  useEffect(() => {
    const fetchVariables = async () => {
      try {
        const variables = await fetchPricingVariables();
        setPricingVariables(variables);
      } catch (err: any) {
        console.error('Failed to fetch pricing variables:', err);
        setError('Failed to fetch pricing variables');
        setIsLoading(false);
      }
    };
    fetchVariables();
  }, []);

  useEffect(() => {
    if (pricingVariables && installAddress && rampConfiguration.components.length > 0) {
      console.log('Calculating prices with:', { rampConfiguration, installAddress, pricingVariables });
      debouncedCalculatePrices(rampConfiguration, installAddress, pricingVariables);
    } else {
      setIsLoading(false);
    }
  }, [rampConfiguration, installAddress, pricingVariables, debouncedCalculatePrices]);

  if (isLoading) {
    return (
      <Paper elevation={3} style={{ padding: '16px', marginTop: '16px' }}>
        <CircularProgress />
      </Paper>
    );
  }

  if (error) {
    return (
      <Paper elevation={3} style={{ padding: '16px', marginTop: '16px' }}>
        <Typography color="error">{error}</Typography>
      </Paper>
    );
  }

  if (!pricing) {
    return (
      <Paper elevation={3} style={{ padding: '16px', marginTop: '16px' }}>
        <Typography>Please configure the ramp to see pricing.</Typography>
      </Paper>
    );
  }

  return (
    <Paper elevation={3} style={{ padding: '16px', marginTop: '16px' }}>
      <Typography variant="h6" gutterBottom>Pricing Details</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6" fontWeight="bold">
            Monthly Rental Rate: ${pricing.monthlyRentalRate.toFixed(2)}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" fontWeight="bold">
            Total Upfront Cost: ${pricing.totalUpfront.toFixed(2)}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle2" color="textSecondary">
            Upfront Cost Breakdown:
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body2" color="textSecondary">Delivery Fee:</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body2">${pricing.deliveryFee.toFixed(2)}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body2" color="textSecondary">Install Fee:</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body2">${pricing.installFee.toFixed(2)}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body2">Distance:</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body2">{distance.toFixed(2)} miles</Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default PricingCalculator;