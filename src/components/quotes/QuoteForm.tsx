import React, { useState, useEffect } from 'react';
import { Button, Grid, FormControl, InputLabel, Select, MenuItem, TextField } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import { Quote, RampConfiguration } from '../../types/Quote';
import { Customer } from '../../types/Customer';
import RampConfigurationComponent from './RampConfiguration';
import PricingCalculator from './PricingCalculator';
import { fetchPricingVariables } from '../../api/apiService';

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
          warehouseAddress: '', // Add this line
        },
        status: 'draft' as const,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        installAddress: '',
      };
    }
  });

  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  useEffect(() => {
    const fetchWarehouseAddress = async () => {
      try {
        const variables = await fetchPricingVariables();
        setFormData(prev => ({
          ...prev,
          warehouseAddress: variables.warehouseAddress,
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

  const handleCustomerChange = (e: SelectChangeEvent<string>) => {
    const customerId = e.target.value;
    const selectedCustomer = customers.find((c) => c._id === customerId);
    if (selectedCustomer) {
      setFormData((prev) => ({
        ...prev,
        customerId,
        customerName: `${selectedCustomer.firstName} ${selectedCustomer.lastName}`,
        installAddress: selectedCustomer.installAddress,
      }));
      setSelectedCustomer(selectedCustomer);
    }
  };

  const handleRampConfigChange = (newConfig: RampConfiguration) => {
    setFormData(prev => ({
      ...prev,
      rampConfiguration: newConfig,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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

        <Grid item xs={12}>
          <RampConfigurationComponent
            configuration={formData.rampConfiguration}
            onChange={handleRampConfigChange}
          />
        </Grid>

        {selectedCustomer && formData.rampConfiguration.components.length > 0 && (
          <Grid item xs={12}>
            <PricingCalculator
              rampConfiguration={formData.rampConfiguration}
              installAddress={formData.installAddress}
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
          <TextField
            fullWidth
            label="Install Address"
            value={formData.installAddress || ''}
            onChange={(e) => setFormData(prev => ({ ...prev, installAddress: e.target.value }))}
          />
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

export default QuoteForm;
