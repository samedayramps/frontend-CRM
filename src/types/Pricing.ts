// src/types/Pricing.ts

export interface PricingVariables {
  warehouseAddress: string;
  baseDeliveryFee: number;
  deliveryFeePerMile: number;
  baseInstallFee: number;
  installFeePerComponent: number;
  rentalRatePerFt: number;
}

export interface PricingInput {
  rampConfiguration: {
    components: Array<{
      type: 'ramp' | 'landing';
      length: number;
      width?: number;
    }>;
    totalLength: number;
  };
  pricingVariables: PricingVariables;
  customerAddress: string;
  warehouseAddress: string;
  distance: number;
}

export interface PricingResult {
  deliveryFee: number;
  installFee: number;
  monthlyRentalRate: number;
  rentalRate: number;
  totalAmount: number;
  distance: number; // Add this line
}