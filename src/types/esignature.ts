// src/types/Esignature.ts

export interface EsignatureRequest {
    documentId: string;
    recipientEmail: string;
  }
  
  export interface EsignatureStatus {
    documentId: string;
    status: 'sent' | 'viewed' | 'signed' | 'declined';
  }