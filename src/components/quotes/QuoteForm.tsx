import React, { useState, useEffect } from 'react';
import { Button, Grid, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import { Quote, RampConfiguration } from '../../types/Quote';
import { Customer } from '../../types/Customer';
import RampConfigurationComponent from './RampConfiguration';
import PricingCalculator from './PricingCalculator';

interface QuoteFormProps {
  quote: Quote | null;
  customers: Customer[];
  onSave: (quoteData: Quote) => Promise<void>;
  onCancel: () => void;
}

const QuoteForm: React.FC<QuoteFormProps> = ({ quote, customers, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Quote>(() => {
    if (quote) {
      return quote;
    } else {
      return {
        _id: '',
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
        },
        status: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
    }
  });

  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  useEffect(() => {
    if (formData.customerId) {
      const customer = customers.find(c => c._id === formData.customerId);
      setSelectedCustomer(customer || null);
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
              value={formData.customerId}
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
              customerAddress={selectedCustomer.installAddress}
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
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="approved">Approved</MenuItem>
              <MenuItem value="rejected">Rejected</MenuItem>
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

export default QuoteForm;
