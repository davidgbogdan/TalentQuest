import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Alert } from '@mui/material';
import { applyToJob } from '../services/applicationService';

const ApplyJobPopup = ({ job, open, onClose }) => {
  const [cvFile, setCvFile] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleFileChange = (event) => {
    setCvFile(event.target.files[0]);
  };

  const handleApply = async () => {
    if (!cvFile) {
      setError('Please upload your CV.');
      return;
    }

    const formData = new FormData();
    formData.append('jobId', job.id);
    formData.append('cvFile', cvFile);

    try {
      await applyToJob(formData);
      setSuccess('Application submitted successfully!');
      setTimeout(() => {
        onClose();
        setSuccess('');
        setError('');
      }, 2000);
    } catch (error) {
      setError('Error applying to job: ' + error.message);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Apply for {job.name}</DialogTitle>
      <DialogContent>
        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">{success}</Alert>}
        <TextField
          type="file"
          fullWidth
          onChange={handleFileChange}
          inputProps={{ accept: '.pdf,.doc,.docx' }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleApply} color="primary" variant="contained">
          Apply
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ApplyJobPopup;
