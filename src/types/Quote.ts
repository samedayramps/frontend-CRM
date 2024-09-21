// src/types/Quote.ts

export interface RampComponent {
  type: 'ramp' | 'landing';
  length: number;
  width?: number;
  quantity: number;
}

export interface RampConfiguration {
  components: RampComponent[];
  totalLength: number;
}

export interface PricingCalculations {
  deliveryFee: number;
  installFee: number;
  monthlyRentalRate: number;
  totalUpfront: number;
  distance: number;
  warehouseAddress: string;
}

export interface Quote {
  _id: string;
  customerId: string;
  customerName: string;
  rentalRequestId?: string;
  rampConfiguration: RampConfiguration;
  pricingCalculations: PricingCalculations;
  status: 'draft' | 'sent' | 'accepted' | 'paid' | 'completed';
  createdAt: string;
  updatedAt: string;
  installAddress: string;
  manualSignature?: string;
  signatureDate?: string;
  paymentStatus: 'pending' | 'processing' | 'paid' | 'failed';
  paymentIntentId?: string;
  agreementStatus: 'pending' | 'sent' | 'viewed' | 'signed' | 'declined';
  agreementId?: string;
}

export type NewQuote = Omit<Quote, '_id'>;

export interface AcceptanceResponse {
  message: string;
  paymentLink: string;
  signatureLink: string;
}