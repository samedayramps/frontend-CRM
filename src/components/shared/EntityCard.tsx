import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

interface EntityCardProps {
  id: string;
  title: string;
  subtitle: string;
  entityType: 'quote' | 'customer' | 'rentalRequest' | 'job';
  onClick: () => void;
}

const EntityCard: React.FC<EntityCardProps> = ({ id, title, subtitle, entityType, onClick }) => {
  return (
    <Card 
      className="cursor-pointer hover:shadow-lg transition-shadow" 
      onClick={onClick}
    >
      <CardContent>
        <Typography variant="h6">{title}</Typography>
        <Typography color="textSecondary">{subtitle}</Typography>
      </CardContent>
    </Card>
  );
};

export default EntityCard;