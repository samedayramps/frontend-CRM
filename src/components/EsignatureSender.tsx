// src/components/EsignatureSender.tsx

import React, { useState } from 'react';
import { Button, Typography, CircularProgress, Paper, TextField } from '@mui/material';
import { sendEsignature, checkEsignatureStatus } from '../api/apiService';
import { EsignatureRequest, EsignatureStatus } from '../types/esignature';

const EsignatureSender: React.FC = () => {
  const [documentId, setDocumentId] = useState<string>('');
  const [recipientEmail, setRecipientEmail] = useState<string>('');
  const [esignatureStatus, setEsignatureStatus] = useState<EsignatureStatus | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSendEsignature = async () => {
    setLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);
    try {
      const payload: EsignatureRequest = {
        documentId,
        recipientEmail,
      };
      await sendEsignature(payload);
      setSuccessMessage('Agreement sent successfully!');
      setDocumentId('');
      setRecipientEmail('');
    } catch (error: any) {
      setErrorMessage(
        error.response?.data?.message || 'Failed to send agreement.'
      );
    } finally {
      setLoading(false);
    }
  };

  const checkSigningStatus = async () => {
    if (documentId) {
      setLoading(true);
      try {
        const response = await checkEsignatureStatus(documentId);
        setEsignatureStatus(response);
      } catch (error: any) {
        setErrorMessage(
          error.response?.data?.message || 'Failed to check signing status.'
        );
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Paper elevation={3} style={{ padding: '16px', marginTop: '16px' }}>
      <Typography variant="h6" gutterBottom>
        Send Agreement for E-Signature
      </Typography>
      <TextField
        label="Document ID"
        value={documentId}
        onChange={(e) => setDocumentId(e.target.value)}
        fullWidth
        variant="outlined"
        margin="normal"
        required
      />
      <TextField
        label="Recipient Email"
        value={recipientEmail}
        onChange={(e) => setRecipientEmail(e.target.value)}
        fullWidth
        variant="outlined"
        margin="normal"
        required
        type="email"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSendEsignature}
        disabled={loading}
        fullWidth
        style={{ marginTop: '16px' }}
      >
        {loading ? <CircularProgress size={24} /> : 'Send Agreement'}
      </Button>

      <Button
        variant="outlined"
        color="secondary"
        onClick={checkSigningStatus}
        disabled={loading || !documentId}
        fullWidth
        style={{ marginTop: '16px' }}
      >
        {loading ? <CircularProgress size={24} /> : 'Check Signing Status'}
      </Button>

      {esignatureStatus && (
        <Typography style={{ marginTop: '16px' }}>
          Signing Status: {esignatureStatus.status}
        </Typography>
      )}

      {successMessage && (
        <Typography color="primary" style={{ marginTop: '16px' }}>
          {successMessage}
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

export default EsignatureSender;