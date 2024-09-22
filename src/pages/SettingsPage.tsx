import React from 'react';
import { Typography, Container } from '@mui/material';
import PricingVariablesComponent from '../components/pricing/PricingVariablesSettings';

const SettingsPage: React.FC = () => {
  return (
    <Container maxWidth="lg" className="mt-8">
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>
      <PricingVariablesComponent />
      {/* Add other settings components here in the future */}
    </Container>
  );
};

export default SettingsPage;