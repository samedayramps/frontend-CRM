// src/components/quotes/QuoteCard.tsx

import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import { Quote } from '../../types/Quote';

interface QuoteCardProps {
  quote: Quote;
  onEdit: () => void;
  onDelete: () => void;
}

const QuoteCard: React.FC<QuoteCardProps> = ({ quote, onEdit, onDelete }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{quote.customerName}</Typography>
        <Typography>Total Upfront: ${quote.pricingCalculations.totalUpfront.toFixed(2)}</Typography>
        <Typography>Status: {quote.status}</Typography>
        <Typography>Created: {new Date(quote.createdAt).toLocaleDateString()}</Typography>
        <Button onClick={onEdit} color="primary">
          Edit
        </Button>
        <Button onClick={onDelete} color="secondary">
          Delete
        </Button>
      </CardContent>
    </Card>
  );
};

export default QuoteCard;