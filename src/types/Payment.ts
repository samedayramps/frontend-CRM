// src/types/Payment.ts

export interface PaymentLinkResponse {
    url: string;
    id: string;
  }
  
  export interface PaymentStatus {
    id: string;
    status: 'pending' | 'completed' | 'failed';
  }