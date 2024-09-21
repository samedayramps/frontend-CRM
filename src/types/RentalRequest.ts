export type InstallTimeframe = 'Within 24 hours' | 'Within 2 days' | 'Within 3 days' | 'Within 1 week' | 'Over 1 week';

export type MobilityAid = 'wheelchair' | 'motorized_scooter' | 'walker_cane' | 'none';

export interface CustomerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface RampDetails {
  knowRampLength: boolean;
  rampLength?: number;
  knowRentalDuration: boolean;
  rentalDuration?: number;
  installTimeframe: InstallTimeframe;
  mobilityAids: MobilityAid[];
}

export interface RentalRequest {
  _id: string;
  customerInfo: CustomerInfo;
  rampDetails: RampDetails;
  installAddress: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  updatedAt: string;
}