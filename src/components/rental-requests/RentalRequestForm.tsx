import React, { useState } from 'react';
import { TextField, Button, Grid, FormControl, InputLabel, Select, MenuItem, Checkbox, FormGroup, FormControlLabel, Typography } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import { RentalRequest } from '../../types/RentalRequest';

interface RentalRequestFormProps {
  rentalRequest: RentalRequest | null;
  onSave: (requestData: Omit<RentalRequest, '_id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  onCancel: () => void;
}

const RentalRequestForm: React.FC<RentalRequestFormProps> = ({ rentalRequest, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Omit<RentalRequest, '_id' | 'createdAt' | 'updatedAt'>>(
    rentalRequest || {
      customerInfo: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
      },
      rampDetails: {
        knowRampLength: false,
        knowRentalDuration: false,
        installTimeframe: 'Within 1 week',
        mobilityAids: [],
      },
      installAddress: '',
      status: 'pending',
    }
  );

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      customerInfo: {
        ...prev.customerInfo,
        [name]: value,
      },
    }));
    validateField(name, value);
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      installAddress: value,
    }));
    validateField('installAddress', value);
  };

  const handleRampDetailsChange = (
    e: React.ChangeEvent<HTMLInputElement> | SelectChangeEvent<string>,
    checked?: boolean
  ) => {
    const { name, value } = e.target;
    const newValue = e.target instanceof HTMLInputElement && e.target.type === 'checkbox' ? checked : value;
    
    setFormData((prev) => ({
      ...prev,
      rampDetails: {
        ...prev.rampDetails,
        [name]: newValue,
      },
    }));
    validateField(name, newValue);
  };

  const handleMobilityAidChange = (aid: 'wheelchair' | 'motorized_scooter' | 'walker_cane' | 'none') => {
    setFormData((prev) => ({
      ...prev,
      rampDetails: {
        ...prev.rampDetails,
        mobilityAids: prev.rampDetails.mobilityAids.includes(aid)
          ? prev.rampDetails.mobilityAids.filter((item) => item !== aid)
          : [...prev.rampDetails.mobilityAids, aid],
      },
    }));
  };

  const handleInstallTimeframeChange = (event: SelectChangeEvent<string>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      rampDetails: {
        ...prev.rampDetails,
        [name]: value as RentalRequest['rampDetails']['installTimeframe'],
      },
    }));
    validateField(name, value);
  };

  const validateField = (name: string, value: any) => {
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
      case 'rampLength':
        if (formData.rampDetails.knowRampLength && (!value || isNaN(value) || value <= 0)) {
          error = 'Invalid ramp length';
        }
        break;
      case 'rentalDuration':
        if (formData.rampDetails.knowRentalDuration && (!value || isNaN(value) || value < 1)) {
          error = 'Invalid rental duration';
        }
        break;
    }
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.values(errors).every((error) => !error)) {
      await onSave(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            name="firstName"
            label="First Name"
            value={formData.customerInfo.firstName}
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
            value={formData.customerInfo.lastName}
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
            value={formData.customerInfo.email}
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
            value={formData.customerInfo.phone}
            onChange={handleInputChange}
            fullWidth
            required
            error={!!errors.phone}
            helperText={errors.phone}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="installAddress"
            label="Installation Address"
            value={formData.installAddress}
            onChange={handleAddressChange}
            fullWidth
            required
            error={!!errors.installAddress}
            helperText={errors.installAddress}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.rampDetails.knowRampLength}
                onChange={handleRampDetailsChange}
                name="knowRampLength"
              />
            }
            label="Know Ramp Length"
          />
        </Grid>
        {formData.rampDetails.knowRampLength && (
          <Grid item xs={12} sm={6}>
            <TextField
              name="rampLength"
              label="Ramp Length (ft)"
              type="number"
              value={formData.rampDetails.rampLength || ''}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleRampDetailsChange(e)}
              fullWidth
              error={!!errors.rampLength}
              helperText={errors.rampLength}
            />
          </Grid>
        )}
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.rampDetails.knowRentalDuration}
                onChange={handleRampDetailsChange}
                name="knowRentalDuration"
              />
            }
            label="Know Rental Duration"
          />
        </Grid>
        {formData.rampDetails.knowRentalDuration && (
          <Grid item xs={12} sm={6}>
            <TextField
              name="rentalDuration"
              label="Rental Duration (months)"
              type="number"
              value={formData.rampDetails.rentalDuration || ''}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleRampDetailsChange(e)}
              fullWidth
              error={!!errors.rentalDuration}
              helperText={errors.rentalDuration}
            />
          </Grid>
        )}
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Install Timeframe</InputLabel>
            <Select
              name="installTimeframe"
              value={formData.rampDetails.installTimeframe}
              onChange={handleInstallTimeframeChange}
              required
            >
              <MenuItem value="Within 24 hours">Within 24 hours</MenuItem>
              <MenuItem value="Within 2 days">Within 2 days</MenuItem>
              <MenuItem value="Within 3 days">Within 3 days</MenuItem>
              <MenuItem value="Within 1 week">Within 1 week</MenuItem>
              <MenuItem value="Over 1 week">Over 1 week</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1">Mobility Aids</Typography>
          <FormGroup row>
            {(['wheelchair', 'motorized_scooter', 'walker_cane', 'none'] as const).map((aid) => (
              <FormControlLabel
                key={aid}
                control={
                  <Checkbox
                    checked={formData.rampDetails.mobilityAids.includes(aid)}
                    onChange={() => handleMobilityAidChange(aid)}
                  />
                }
                label={aid.replace('_', ' ')}
              />
            ))}
          </FormGroup>
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

export default RentalRequestForm;