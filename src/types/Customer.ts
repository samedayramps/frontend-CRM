export interface Customer {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    installAddress: string; // Changed from 'address' to 'installAddress'
    mobilityAids: string[];
    notes: string;
    createdAt?: string;
    updatedAt?: string;
  }