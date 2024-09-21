import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, SelectProps } from '@mui/material';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectFieldProps extends Omit<SelectProps, 'onChange'> {
  name: string;
  label: string;
  options: SelectOption[];
  onChange: (name: string, value: string) => void;
}

export const SelectField: React.FC<SelectFieldProps> = ({ name, label, options, value, onChange, ...props }) => (
  <FormControl fullWidth variant="outlined" margin="normal">
    <InputLabel id={`${name}-label`}>{label}</InputLabel>
    <Select
      labelId={`${name}-label`}
      id={name}
      name={name}
      value={value}
      onChange={(e) => onChange(name, e.target.value as string)}
      label={label}
      {...props}
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);