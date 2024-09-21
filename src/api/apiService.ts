import axios, { AxiosInstance, AxiosError } from 'axios';
import { RentalRequest, MobilityAid } from '../types/RentalRequest';
import { PricingVariables } from '../types/Pricing';
import { Quote } from '../types/Quote';
import { PaymentLinkResponse, PaymentStatus } from '../types/Payment';
import { EsignatureRequest, EsignatureStatus } from '../types/esignature';
import { Customer } from '../types/Customer';
import { RampConfiguration } from '../types/Quote';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://samedayramps-016e8e090b17.herokuapp.com/api';

const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Add a request interceptor
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Error handling function
const handleApiError = (error: AxiosError): string => {
  if (error.response) {
    return (error.response.data as any).message || 'An error occurred with the response';
  } else if (error.request) {
    return 'No response received from the server';
  } else {
    return error.message || 'An unexpected error occurred';
  }
};

// Rental Requests
export const fetchRentalRequests = async (): Promise<RentalRequest[]> => {
  try {
    const response = await apiClient.get<RentalRequest[]>('/rental-requests');
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error as AxiosError));
  }
};

export const fetchRentalRequest = async (id: string): Promise<RentalRequest> => {
  try {
    const response = await apiClient.get<RentalRequest>(`/rental-requests/${id}`);
    const data = response.data;
    
    // Ensure mobilityAids is correctly typed
    data.rampDetails.mobilityAids = data.rampDetails.mobilityAids.filter((aid: string): aid is MobilityAid => 
      ['wheelchair', 'motorized_scooter', 'walker_cane', 'none'].includes(aid)
    );
    
    return data as RentalRequest;
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response && axiosError.response.status === 404) {
      throw new Error('Rental request not found');
    }
    throw new Error(handleApiError(axiosError));
  }
};

export const createRentalRequest = async (data: Omit<RentalRequest, '_id' | 'createdAt'>): Promise<RentalRequest> => {
  try {
    const response = await apiClient.post<RentalRequest>('/rental-requests', data);
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error as AxiosError));
  }
};

export const updateRentalRequest = async (id: string, data: Partial<RentalRequest>): Promise<RentalRequest> => {
  try {
    const response = await apiClient.put<RentalRequest>(`/rental-requests/${id}`, data);
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error as AxiosError));
  }
};

export const deleteRentalRequest = async (id: string): Promise<void> => {
  try {
    await apiClient.delete(`/rental-requests/${id}`);
  } catch (error) {
    throw new Error(handleApiError(error as AxiosError));
  }
};

// Quotes
export const fetchQuotes = async (): Promise<Quote[]> => {
  try {
    const response = await apiClient.get<Quote[]>('/quotes');
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error as AxiosError));
  }
};

export const fetchQuote = async (id: string): Promise<Quote> => {
  try {
    const response = await apiClient.get<Quote>(`/quotes/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error as AxiosError));
  }
};

export const createQuote = async (quoteData: Omit<Quote, '_id'>): Promise<Quote> => {
  try {
    const response = await apiClient.post<Quote>('/quotes', quoteData);
    return response.data;
  } catch (error) {
    console.error('Error creating quote:', error);
    if (axios.isAxiosError(error) && error.response) {
      console.error('Server response:', error.response.data);
    }
    throw new Error(handleApiError(error as AxiosError));
  }
};

export const updateQuote = async (id: string, data: Partial<Quote>): Promise<Quote> => {
  try {
    const response = await apiClient.put<Quote>(`/quotes/${id}`, data);
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error as AxiosError));
  }
};

export const deleteQuote = async (id: string): Promise<void> => {
  try {
    await apiClient.delete(`/quotes/${id}`);
  } catch (error) {
    throw new Error(handleApiError(error as AxiosError));
  }
};

// Customers
export const fetchCustomers = async (): Promise<Customer[]> => {
  try {
    const response = await apiClient.get<Customer[]>('/customers');
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error as AxiosError));
  }
};

export const fetchCustomer = async (id: string): Promise<Customer> => {
  try {
    const response = await apiClient.get<Customer>(`/customers/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error as AxiosError));
  }
};

export const createCustomer = async (data: Omit<Customer, '_id' | 'createdAt' | 'updatedAt'>): Promise<Customer> => {
  try {
    const response = await apiClient.post<Customer>('/customers', data);
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error as AxiosError));
  }
};

export const updateCustomer = async (id: string, data: Partial<Customer>): Promise<Customer> => {
  try {
    const response = await apiClient.put<Customer>(`/customers/${id}`, data);
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error as AxiosError));
  }
};

export const deleteCustomer = async (id: string): Promise<void> => {
  try {
    await apiClient.delete(`/customers/${id}`);
  } catch (error) {
    throw new Error(handleApiError(error as AxiosError));
  }
};

// Pricing Variables
export const fetchPricingVariables = async (): Promise<PricingVariables> => {
  try {
    const response = await apiClient.get<PricingVariables>('/pricing-variables');
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error as AxiosError));
  }
};

export const updatePricingVariables = async (data: PricingVariables): Promise<PricingVariables> => {
  try {
    const response = await apiClient.put<PricingVariables>('/pricing-variables', data);
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error as AxiosError));
  }
};

// Calculate Pricing
export const calculatePricing = async (data: {
  rampConfiguration: RampConfiguration;
  installAddress: string;
  warehouseAddress: string;
}) => {
  try {
    console.log('Sending to backend:', data);
    const response = await apiClient.post('/calculate-pricing', data);
    return response.data;
  } catch (error) {
    console.error('Error in calculatePricing:', error);
    throw new Error(handleApiError(error as AxiosError));
  }
};

// Payments
export const createPaymentLink = async (data: { amount: number; customerEmail: string }): Promise<PaymentLinkResponse> => {
  try {
    const response = await apiClient.post<PaymentLinkResponse>('/payments/create-link', data);
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error as AxiosError));
  }
};

export const checkPaymentStatus = async (id: string): Promise<PaymentStatus> => {
  try {
    const response = await apiClient.get<PaymentStatus>(`/payments/status/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error as AxiosError));
  }
};

// E-signatures
export const sendEsignature = async (data: EsignatureRequest): Promise<void> => {
  try {
    await apiClient.post('/esignatures/send', data);
  } catch (error) {
    throw new Error(handleApiError(error as AxiosError));
  }
};

export const checkEsignatureStatus = async (documentId: string): Promise<EsignatureStatus> => {
  try {
    const response = await apiClient.get<EsignatureStatus>(`/esignatures/status/${documentId}`);
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error as AxiosError));
  }
};

// Additional functions
export const sendQuoteEmail = async (quoteId: string): Promise<void> => {
  try {
    await apiClient.post(`/quotes/${quoteId}/send-email`);
  } catch (error) {
    throw new Error(handleApiError(error as AxiosError));
  }
};

export const createCustomerFromRentalRequest = async (rentalRequestId: string): Promise<Customer> => {
  try {
    const response = await apiClient.post<Customer>(`/customers/from-rental-request/${rentalRequestId}`);
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error as AxiosError));
  }
};