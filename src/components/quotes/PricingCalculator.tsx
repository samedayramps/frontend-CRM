// src/components/quotes/PricingCalculator.tsx

import React, { useState, useEffect, useCallback } from 'react';
import { Typography, Paper, Grid, CircularProgress } from '@mui/material';
import { RampConfiguration } from '../../types/Quote';
import { PricingVariables } from '../../types/Pricing';
import { calculatePricing, fetchPricingVariables } from '../../api/apiService';
import debounce from 'lodash/debounce';

interface PricingCalculatorProps {
  rampConfiguration: RampConfiguration;
  installAddress: string;
}

interface PricingResult {
  deliveryFee: number;
  installFee: number;
  monthlyRentalRate: number;
  totalUpfront: number;
  distance: number;
}

const PricingCalculator: React.FC<PricingCalculatorProps> = ({ rampConfiguration, installAddress }) => {
  const [pricingVariables, setPricingVariables] = useState<PricingVariables | null>(null);
  const [pricing, setPricing] = useState<PricingResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const debouncedCalculatePrices = useCallback(
    (config: RampConfiguration, address: string, variables: PricingVariables) => {
      setIsLoading(true);
      setError(null);
      calculatePricing({
        rampConfiguration: config,
        installAddress: address,
        warehouseAddress: variables.warehouseAddress
      })
        .then((result) => {
          setPricing(result);
        })
        .catch((err: any) => {
          console.error('Error calculating pricing:', err);
          setError('Failed to calculate pricing');
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    [] // Empty dependency array is fine here as we're not using any external values
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
      debouncedCalculatePrices(rampConfiguration, installAddress, pricingVariables);
    } else {
      setIsLoading(false);
    }
  }, [rampConfiguration, installAddress, pricingVariables, debouncedCalculatePrices]);

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (!pricing) {
    return <Typography>Please configure the ramp to see pricing.</Typography>;
  }

  const pricingItems: [string, string][] = [
    ['Delivery Fee', `$${pricing.deliveryFee.toFixed(2)}`],
    ['Install Fee', `$${pricing.installFee.toFixed(2)}`],
    ['Monthly Rental Rate', `$${pricing.monthlyRentalRate.toFixed(2)}`],
    ['Total Upfront', `$${pricing.totalUpfront.toFixed(2)}`],
    ['Distance', `${pricing.distance.toFixed(2)} miles`],
  ];

  return (
    <Paper elevation={3} style={{ padding: '16px', marginTop: '16px' }}>
      <Typography variant="h6" gutterBottom>Pricing Calculation</Typography>
      <Grid container spacing={2}>
        {pricingItems.map(([label, value]) => (
          <React.Fragment key={label}>
            <Grid item xs={6}>
              <Typography>{label}:</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>{value}</Typography>
            </Grid>
          </React.Fragment>
        ))}
      </Grid>
    </Paper>
  );
};

export default PricingCalculator;