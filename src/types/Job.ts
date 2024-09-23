import { Quote } from './Quote';
import { Customer } from './Customer';

export interface Job {
  _id: string;
  jobId: string;
  quoteId: string;
  customerId: string | Customer; // Allow for both string and Customer object
  status: 'scheduled' | 'completed' | 'cancelled';
  installAddress: string;
  rampConfiguration: {
    components: Array<{
      type: 'ramp' | 'landing';
      length: number;
      quantity: number;
    }>;
    totalLength: number;
  };
  scheduledInstallationDate: string;
  actualInstallationDate?: string;
  calendarEventId?: string;
  createdAt: string;
  updatedAt: string;
}

export type JobStatus = 'scheduled' | 'completed' | 'cancelled';

export interface CreateJobInput {
  quoteId: string;
  scheduledInstallationDate: string;
}

export interface UpdateJobInput {
  status?: JobStatus;
  scheduledInstallationDate?: string;
  actualInstallationDate?: string;
  calendarEventId?: string;
}

export interface ScheduleJobInput {
  jobId: string;
  scheduledInstallationDate: string;
}