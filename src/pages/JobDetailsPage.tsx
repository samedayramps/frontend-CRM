import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Paper, Grid, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, CircularProgress, Snackbar } from '@mui/material';
import { Delete as DeleteIcon, Schedule as ScheduleIcon, Check as CheckIcon } from '@mui/icons-material';
import { fetchJob, deleteJob, completeJob, scheduleJob, fetchCustomer } from '../api/apiService';
import { Job } from '../types/Job';
import { Customer } from '../types/Customer';
import { LoadingSpinner } from '../components/shared/LoadingSpinner';
import { ErrorMessage } from '../components/shared/ErrorMessage';
import JobScheduler from '../components/jobs/JobScheduler';

const JobDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [job, setJob] = useState<Job | null>(null);
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isScheduling, setIsScheduling] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);
  const [isConfirmingSchedule, setIsConfirmingSchedule] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [newScheduledDate, setNewScheduledDate] = useState('');

  useEffect(() => {
    const loadJobAndCustomer = async () => {
      if (id) {
        try {
          const jobData = await fetchJob(id);
          setJob(jobData);
          let customerData: Customer;
          if (typeof jobData.customerId === 'string') {
            customerData = await fetchCustomer(jobData.customerId);
          } else if (typeof jobData.customerId === 'object' && jobData.customerId !== null) {
            customerData = jobData.customerId as Customer;
          } else {
            throw new Error('Invalid customer data');
          }
          setCustomer(customerData);
        } catch (err: any) {
          console.error('Error fetching job or customer:', err);
          setError(err.message || 'Failed to fetch job details');
        } finally {
          setIsLoading(false);
        }
      }
    };
    loadJobAndCustomer();
  }, [id]);

  const handleSchedule = () => setIsScheduling(true);
  const handleCancelSchedule = () => setIsScheduling(false);

  const handleDelete = async () => {
    if (id) {
      setIsLoading(true);
      setError(null);
      try {
        await deleteJob(id);
        navigate('/jobs');
      } catch (err: any) {
        setError(err.message || 'Failed to delete job');
      } finally {
        setIsLoading(false);
        setIsDeleting(false);
      }
    }
  };

  const handleComplete = async () => {
    if (id) {
      setIsCompleting(true);
      setError(null);
      try {
        const updatedJob = await completeJob(id, new Date().toISOString());
        setJob(updatedJob);
        setSnackbarMessage('Job completed successfully');
      } catch (err: any) {
        setError(err.message || 'Failed to complete job');
        setSnackbarMessage('Failed to complete job');
      } finally {
        setIsCompleting(false);
        setSnackbarOpen(true);
      }
    }
  };

  const handleConfirmSchedule = (newDate: string) => {
    setNewScheduledDate(newDate);
    setIsConfirmingSchedule(true);
    setIsScheduling(false);
  };

  const handleScheduleConfirmed = async () => {
    setIsConfirmingSchedule(false);
    setIsLoading(true);
    try {
      if (job && job._id) {
        const updatedJob = await scheduleJob(job._id, newScheduledDate);
        setJob(updatedJob);
        setSnackbarMessage('Job scheduled successfully');
      } else {
        throw new Error('Job not found');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to schedule job');
      setSnackbarMessage('Failed to schedule job');
    } finally {
      setIsLoading(false);
      setSnackbarOpen(true);
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!job) return <ErrorMessage message="Job not found" />;

  return (
    <div className="p-4">
      <Typography variant="h4" gutterBottom>
        Job Details
      </Typography>
      <Paper elevation={3} className="p-4">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6">Job Information</Typography>
            <Typography>Job ID: {job.jobId}</Typography>
            <Typography>Status: {job.status}</Typography>
            <Typography>Scheduled Installation Date: {job.scheduledInstallationDate}</Typography>
            {job.actualInstallationDate && (
              <Typography>Actual Installation Date: {job.actualInstallationDate}</Typography>
            )}
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Customer Information</Typography>
            {customer ? (
              <>
                <Typography>Name: {customer.firstName} {customer.lastName}</Typography>
                <Typography>Email: {customer.email}</Typography>
                <Typography>Phone: {customer.phone}</Typography>
              </>
            ) : (
              <Typography>Customer information not available</Typography>
            )}
            <Typography>Install Address: {job.installAddress}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Ramp Configuration</Typography>
            {job.rampConfiguration.components.map((component, index) => (
              <Typography key={index}>
                {component.type}: {component.length}ft x {component.quantity}
              </Typography>
            ))}
            <Typography>Total Length: {job.rampConfiguration.totalLength}ft</Typography>
          </Grid>
          <Grid item xs={12}>
            <IconButton 
              onClick={handleSchedule} 
              color="primary" 
              aria-label="schedule job"
              disabled={job.status === 'completed' || isScheduling}
            >
              {isScheduling ? <CircularProgress size={24} /> : <ScheduleIcon />}
            </IconButton>
            <IconButton 
              onClick={() => setIsDeleting(true)}
              color="secondary"
              aria-label="delete job"
            >
              <DeleteIcon />
            </IconButton>
            <IconButton
              onClick={handleComplete}
              color="primary"
              aria-label="complete job"
              disabled={job.status === 'completed' || isCompleting}
            >
              {isCompleting ? <CircularProgress size={24} /> : <CheckIcon />}
            </IconButton>
          </Grid>
        </Grid>
      </Paper>
      <button
        onClick={() => navigate('/jobs')}
        className="btn-primary mt-4"
      >
        Back to Jobs
      </button>

      <JobScheduler
        isOpen={isScheduling}
        onClose={handleCancelSchedule}
        jobId={job._id}
        currentDate={job.scheduledInstallationDate}
        onSchedule={handleConfirmSchedule}
      />

      <Dialog
        open={isConfirmingSchedule}
        onClose={() => setIsConfirmingSchedule(false)}
        aria-labelledby="schedule-confirm-dialog-title"
        aria-describedby="schedule-confirm-dialog-description"
      >
        <DialogTitle id="schedule-confirm-dialog-title">Confirm Scheduling</DialogTitle>
        <DialogContent>
          <DialogContentText id="schedule-confirm-dialog-description">
            Are you sure you want to schedule this job for {newScheduledDate}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <button onClick={() => setIsConfirmingSchedule(false)} className="btn-secondary">
            Cancel
          </button>
          <button onClick={handleScheduleConfirmed} className="btn-primary">
            Confirm
          </button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={isDeleting}
        onClose={() => setIsDeleting(false)}
        aria-labelledby="delete-confirm-dialog-title"
        aria-describedby="delete-confirm-dialog-description"
      >
        <DialogTitle id="delete-confirm-dialog-title">Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-confirm-dialog-description">
            Are you sure you want to delete this job? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <button onClick={() => setIsDeleting(false)} className="btn-secondary">
            Cancel
          </button>
          <button onClick={handleDelete} className="btn-primary">
            Delete
          </button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
    </div>
  );
};

export default JobDetailsPage;