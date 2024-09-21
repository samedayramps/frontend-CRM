import React from 'react';
import { Typography } from '@mui/material';

interface ErrorMessageProps {
  message: string | null;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  if (!message) return null;

  return (
    <Typography color="error" className="mt-2">
      {message}
    </Typography>
  );
};