import React, { useState, useEffect, useCallback } from 'react';
import { Button, Grid, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import { Quote, RampConfiguration } from '../../types/Quote';
import { Customer } from '../../types/Customer';
import RampConfigurationComponent from './RampConfiguration';
import PricingCalculator from './PricingCalculator';
import CustomerInfoDisplay from './CustomerInfoDisplay';
import { fetchPricingVariables, calculatePricing } from '../../api/apiService';

interface QuoteFormProps {
  quote: Omit<Quote, '_id'> | null;
  customers: Customer[];
  onSave: (quoteData: Omit<Quote, '_id'>) => Promise<void>;
  onCancel: () => void;
}

const QuoteForm: React.FC<QuoteFormProps> = ({ quote, customers, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Omit<Quote, '_id'>>(() => {
    if (quote) {
      return {
        ...quote,
        customerId: typeof quote.customerId === 'object' ? (quote.customerId as any)._id : quote.customerId,
        rampConfiguration: {
          ...quote.rampConfiguration,
          components: quote.rampConfiguration.components.map(comp => ({
            ...comp,
            quantity: comp.quantity || 1
          }))
        }
      };
    } else {
      return {
        customerId: '',
        customerName: '',
        rampConfiguration: {
          components: [],
          totalLength: 0,
        },
        pricingCalculations: {
          deliveryFee: 0,
          installFee: 0,
          monthlyRentalRate: 0,
          totalUpfront: 0,
          distance: 0,
          warehouseAddress: '',
        },
        status: 'draft' as const,
        paymentStatus: 'pending' as const,
        agreementStatus: 'pending' as const,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        installAddress: '',
      };
    }
  });

  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [distance, setDistance] = useState<number>(0);

  useEffect(() => {
    const fetchWarehouseAddress = async () => {
      try {
        const variables = await fetchPricingVariables();
        setFormData(prev => ({
          ...prev,
          pricingCalculations: {
            ...prev.pricingCalculations,
            warehouseAddress: variables.warehouseAddress,
          },
        }));
      } catch (error) {
        console.error('Failed to fetch warehouse address:', error);
      }
    };
    fetchWarehouseAddress();

    // Set initial customer if quote exists
    if (formData.customerId) {
      const customer = customers.find(c => c._id === formData.customerId);
      if (customer) {
        setSelectedCustomer(customer);
        setFormData(prev => ({
          ...prev,
          customerName: `${customer.firstName} ${customer.lastName}`,
          installAddress: customer.installAddress,
        }));
      }
    }
  }, [formData.customerId, customers]);

  useEffect(() => {
    console.log('Current form data:', formData);
  }, [formData]);

  const handleCustomerChange = async (e: SelectChangeEvent<string>) => {
    const customerId = e.target.value;
    const selected = customers.find((c) => c._id === customerId);
    if (selected) {
      setFormData((prev) => ({
        ...prev,
        customerId,
        customerName: `${selected.firstName} ${selected.lastName}`,
        installAddress: selected.installAddress,
      }));
      setSelectedCustomer(selected);
      
      // Calculate distance and pricing
      if (selected.installAddress && formData.pricingCalculations.warehouseAddress) {
        try {
          const pricingResult = await calculatePricing({
            rampConfiguration: formData.rampConfiguration,
            installAddress: selected.installAddress,
            warehouseAddress: formData.pricingCalculations.warehouseAddress,
          });
          setDistance(pricingResult.distance);
          setFormData(prev => ({
            ...prev,
            pricingCalculations: {
              ...prev.pricingCalculations,
              ...pricingResult,
            },
          }));
        } catch (error) {
          console.error('Error calculating distance:', error);
        }
      }
    }
  };

  const handleRampConfigChange = useCallback((newConfig: RampConfiguration) => {
    setFormData(prev => ({
      ...prev,
      rampConfiguration: newConfig,
    }));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.installAddress || !formData.pricingCalculations.warehouseAddress) {
      console.error('Install address or warehouse address is missing');
      // You might want to show an error message to the user here
      return;
    }
    console.log('Submitting form data:', formData);
    await onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Customer</InputLabel>
            <Select
              name="customerId"
              value={formData.customerId || ''}
              onChange={handleCustomerChange}
            >
              {customers.map((customer) => (
                <MenuItem key={customer._id} value={customer._id}>
                  {`${customer.firstName} ${customer.lastName}`}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {selectedCustomer && (
          <Grid item xs={12}>
            <CustomerInfoDisplay customer={selectedCustomer} distance={distance} />
          </Grid>
        )}

        <Grid item xs={12}>
          <RampConfigurationComponent
            configuration={formData.rampConfiguration}
            onChange={handleRampConfigChange}
          />
        </Grid>

        {selectedCustomer && formData.rampConfiguration.components.length > 0 && (
          <Grid item xs={12}>
            <PricingCalculator
              key={`${formData.rampConfiguration.totalLength}-${formData.installAddress}`}
              rampConfiguration={formData.rampConfiguration}
              installAddress={formData.installAddress}
              distance={distance}
            />
          </Grid>
        )}

        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              name="status"
              value={formData.status}
              onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as Quote['status'] }))}
            >
              <MenuItem value="draft">Draft</MenuItem>
              <MenuItem value="sent">Sent</MenuItem>
              <MenuItem value="accepted">Accepted</MenuItem>
              <MenuItem value="paid">Paid</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Save
          </Button>
          <Button onClick={onCancel} variant="outlined" style={{ marginLeft: '10px' }}>
            Cancel
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default React.memo(QuoteForm);
