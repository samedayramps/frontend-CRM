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
  rampConfiguration: RampConfiguration;
  pricingCalculations: PricingCalculations;
  status: 'draft' | 'sent' | 'accepted' | 'paid' | 'completed';
  createdAt: string;
  updatedAt: string;
  installAddress: string;
}

export type NewQuote = Omit<Quote, '_id'>;