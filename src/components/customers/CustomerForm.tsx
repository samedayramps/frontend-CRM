import React, { useState } from 'react';
import { TextField, Button, Grid, Checkbox, FormGroup, FormControlLabel, Typography } from '@mui/material';
import { Customer } from '../../types/Customer';

interface CustomerFormProps {
  customer: Customer | null;
  onSave: (customerData: Omit<Customer, '_id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  onCancel: () => void;
}

const CustomerForm: React.FC<CustomerFormProps> = ({ customer, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Omit<Customer, '_id' | 'createdAt' | 'updatedAt'>>(
    customer ? {
      firstName: customer.firstName,
      lastName: customer.lastName,
      phone: customer.phone,
      email: customer.email,
      installAddress: customer.installAddress,
      mobilityAids: customer.mobilityAids,
      notes: customer.notes || '',
    } : {
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      installAddress: '',
      mobilityAids: [],
      notes: '',
    }
  );

  const [errors, setErrors] = useState<Partial<Record<keyof Customer, string>>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const handleMobilityAidChange = (aid: string) => {
    setFormData((prev) => ({
      ...prev,
      mobilityAids: prev.mobilityAids.includes(aid)
        ? prev.mobilityAids.filter((item) => item !== aid)
        : [...prev.mobilityAids, aid],
    }));
  };

  const validateField = (name: string, value: string) => {
    let error = '';
    switch (name) {
      case 'firstName':
      case 'lastName':
      case 'phone':
      case 'installAddress':
        if (!value.trim()) {
          error = `${name} is required`;
        }
        break;
      case 'email':
        if (!/^\S+@\S+\.\S+$/.test(value)) {
          error = 'Invalid email address';
        }
        break;
    }
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.values(errors).every((error) => !error)) {
      onSave(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            name="firstName"
            label="First Name"
            value={formData.firstName}
            onChange={handleInputChange}
            fullWidth
            required
            error={!!errors.firstName}
            helperText={errors.firstName}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="lastName"
            label="Last Name"
            value={formData.lastName}
            onChange={handleInputChange}
            fullWidth
            required
            error={!!errors.lastName}
            helperText={errors.lastName}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="email"
            label="Email Address"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            fullWidth
            required
            error={!!errors.email}
            helperText={errors.email}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="phone"
            label="Phone Number"
            value={formData.phone}
            onChange={handleInputChange}
            fullWidth
            required
            error={!!errors.phone}
            helperText={errors.phone}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Install Address"
            name="installAddress"
            value={formData.installAddress}
            onChange={handleInputChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1">Mobility Aids</Typography>
          <FormGroup row>
            {['wheelchair', 'motorized_scooter', 'walker_cane', 'none'].map((aid) => (
              <FormControlLabel
                key={aid}
                control={
                  <Checkbox
                    checked={formData.mobilityAids?.includes(aid)}
                    onChange={() => handleMobilityAidChange(aid)}
                  />
                }
                label={aid.replace('_', ' ')}
              />
            ))}
          </FormGroup>
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="notes"
            label="Notes"
            value={formData.notes}
            onChange={handleInputChange}
            fullWidth
            multiline
            rows={3}
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

export default CustomerForm;