import React, { useEffect, useState } from 'react';
import { Typography, Grid, Pagination, CircularProgress, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { fetchJobs } from '../api/apiService';
import { Job } from '../types/Job';
import EntityCard from '../components/shared/EntityCard';
import { LoadingSpinner } from '../components/shared/LoadingSpinner';
import { ErrorMessage } from '../components/shared/ErrorMessage';

const JobsPage: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();
  const [isPaginationLoading, setIsPaginationLoading] = useState(false);

  useEffect(() => {
    const loadJobs = async () => {
      setIsPaginationLoading(true);
      try {
        const data = await fetchJobs(page);
        setJobs(data.jobs);
        setTotalPages(data.totalPages);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch jobs');
      } finally {
        setIsLoading(false);
        setIsPaginationLoading(false);
      }
    };
    loadJobs();
  }, [page]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <Typography variant="h4">Jobs</Typography>
        <div>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/jobs/new')}
            className="btn-primary mr-2"
          >
            Create New Job
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => navigate('/quotes')}
            className="btn-secondary"
          >
            Create Job from Quote
          </Button>
        </div>
      </div>
      <Grid container spacing={2}>
        {jobs.map((job) => (
          <Grid item xs={12} sm={6} md={4} key={job._id}>
            <EntityCard
              id={job._id}
              title={`Job ${job.jobId}`}
              subtitle={`Status: ${job.status}`}
              entityType="job"
              onClick={() => navigate(`/jobs/${job._id}`)}
            />
          </Grid>
        ))}
      </Grid>
      <div className="mt-4 flex justify-center items-center">
        {isPaginationLoading ? (
          <CircularProgress size={24} className="mr-2" />
        ) : (
          <Pagination count={totalPages} page={page} onChange={handlePageChange} />
        )}
      </div>
    </div>
  );
};

export default JobsPage;