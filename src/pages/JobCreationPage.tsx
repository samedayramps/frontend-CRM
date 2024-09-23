import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Paper, TextField, Button, Grid } from '@mui/material';
import { createJob } from '../api/apiService';
import { Job } from '../types/Job';
import { ErrorMessage } from '../components/shared/ErrorMessage';

const JobCreationPage: React.FC = () => {
  const navigate = useNavigate();
  const [jobData, setJobData] = useState<Partial<Job>>({
    jobId: '',
    customerId: '',
    status: 'scheduled',
    installAddress: '',
    rampConfiguration: {
      components: [],
      totalLength: 0,
    },
    scheduledInstallationDate: '',
  });
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setJobData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newJob = await createJob(jobData as Omit<Job, '_id' | 'createdAt' | 'updatedAt'>);
      navigate(`/jobs/${newJob._id}`);
    } catch (err: any) {
      setError(err.message || 'Failed to create job');
    }
  };

  return (
    <div className="p-4">
      <Typography variant="h4" gutterBottom>
        Create New Job
      </Typography>
      <Paper elevation={3} className="p-4">
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Job ID"
                name="jobId"
                value={jobData.jobId}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Customer ID"
                name="customerId"
                value={jobData.customerId}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Install Address"
                name="installAddress"
                value={jobData.installAddress}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Scheduled Installation Date"
                name="scheduledInstallationDate"
                type="date"
                value={jobData.scheduledInstallationDate}
                onChange={handleInputChange}
                InputLabelProps={{
                  shrink: true,
                }}
                required
              />
            </Grid>
            {/* Add more fields as needed for ramp configuration */}
          </Grid>
          {error && <ErrorMessage message={error} />}
          <div className="mt-4">
            <Button type="submit" variant="contained" color="primary" className="mr-2">
              Create Job
            </Button>
            <Button variant="outlined" onClick={() => navigate('/jobs')}>
              Cancel
            </Button>
          </div>
        </form>
      </Paper>
    </div>
  );
};

export default JobCreationPage;