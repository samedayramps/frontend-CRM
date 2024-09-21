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
}

export interface Quote {
  _id: string;
  customerId: string;
  customerName: string;
  rentalRequestId?: string;
  rampConfiguration: RampConfiguration;
  pricingCalculations: PricingCalculations;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  updatedAt: string;
}