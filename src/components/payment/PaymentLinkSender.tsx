// src/components/PaymentLinkSender.tsx

import React, { useState } from 'react';
import { Button, Typography, Link, CircularProgress, Paper } from '@mui/material';
import { createPaymentLink, checkPaymentStatus } from '../../api/apiService';
import { PaymentLinkResponse, PaymentStatus } from '../../types/Payment';

interface PaymentLinkSenderProps {
  amount: number;
  customerEmail: string;
}

const PaymentLinkSender: React.FC<PaymentLinkSenderProps> = ({
  amount,
  customerEmail,
}) => {
  const [paymentLink, setPaymentLink] = useState<PaymentLinkResponse | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleCreatePaymentLink = async () => {
    setLoading(true);
    try {
      const response = await createPaymentLink({ amount, customerEmail });
      setPaymentLink(response);
      // Optionally, send the link via email through backend
    } catch (error: any) {
      setErrorMessage(
        error.response?.data?.message || 'Failed to create payment link.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCheckPaymentStatus = async () => {
    if (paymentLink) {
      setLoading(true);
      try {
        const response = await checkPaymentStatus(paymentLink.id);
        setPaymentStatus(response);
      } catch (error: any) {
        setErrorMessage(
          error.response?.data?.message || 'Failed to check payment status.'
        );
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Paper elevation={3} style={{ padding: '16px', marginTop: '16px' }}>
      <Typography variant="h6" gutterBottom>
        Send Payment Link
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleCreatePaymentLink}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} /> : 'Generate Payment Link'}
      </Button>

      {paymentLink && (
        <div style={{ marginTop: '16px' }}>
          <Typography>Payment Link:</Typography>
          <Link href={paymentLink.url} target="_blank" rel="noopener">
            {paymentLink.url}
          </Link>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleCheckPaymentStatus}
            style={{ marginTop: '8px' }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Check Payment Status'}
          </Button>
        </div>
      )}

      {paymentStatus && (
        <Typography style={{ marginTop: '16px' }}>
          Payment Status: {paymentStatus.status}
        </Typography>
      )}

      {errorMessage && (
        <Typography color="error" style={{ marginTop: '16px' }}>
          {errorMessage}
        </Typography>
      )}
    </Paper>
  );
};

export default PaymentLinkSender;