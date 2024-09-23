import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import { scheduleJob } from '../../api/apiService';

interface JobSchedulerProps {
  isOpen: boolean;
  onClose: () => void;
  jobId: string;
  currentDate: string;
  onSchedule: (newDate: string) => void;
}

const JobScheduler: React.FC<JobSchedulerProps> = ({ isOpen, onClose, jobId, currentDate, onSchedule }) => {
  const [scheduledDate, setScheduledDate] = useState(currentDate);
  const [error, setError] = useState<string | null>(null);

  const handleSchedule = async () => {
    try {
      await scheduleJob(jobId, scheduledDate);
      onSchedule(scheduledDate);
    } catch (err: any) {
      setError(err.message || 'Failed to schedule job');
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Schedule Job</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="date"
          label="Installation Date"
          type="date"
          fullWidth
          variant="standard"
          value={scheduledDate}
          onChange={(e) => setScheduledDate(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </DialogContent>
      <DialogActions>
        <button onClick={onClose} className="btn-secondary">
          Cancel
        </button>
        <button onClick={handleSchedule} className="btn-primary">
          Schedule
        </button>
      </DialogActions>
    </Dialog>
  );
};

export default JobScheduler;