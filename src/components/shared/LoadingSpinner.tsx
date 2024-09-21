import React from 'react';
import { CircularProgress } from '@mui/material';

interface LoadingSpinnerProps {
  size?: number;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 40 }) => (
  <div className="flex justify-center items-center h-32">
    <CircularProgress size={size} />
  </div>
);