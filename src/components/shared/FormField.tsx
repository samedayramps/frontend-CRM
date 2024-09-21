import React from 'react';
import { TextField, TextFieldProps } from '@mui/material';

interface FormFieldProps extends Omit<TextFieldProps, 'onChange'> {
  name: string;
  label: string;
  value: string | number;
  onChange: (name: string, value: string) => void;
}

export const FormField: React.FC<FormFieldProps> = ({ name, label, value, onChange, ...props }) => (
  <TextField
    name={name}
    label={label}
    value={value}
    onChange={(e) => onChange(name, e.target.value)}
    fullWidth
    variant="outlined"
    margin="normal"
    {...props}
  />
);