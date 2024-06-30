import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, Alert, Typography } from '@mui/material';
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
      <DialogTitle>Apply for this job</DialogTitle>
      <DialogContent>
        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">{success}</Alert>}
        <Box
          sx={{
            border: '2px dashed #ccc',
            borderRadius: 2,
            padding: 2,
            textAlign: 'center',
            marginBottom: 2,
          }}
        >
          <input
            type="file"
            onChange={handleFileChange}
            accept=".pdf,.doc,.docx"
            style={{ display: 'none' }}
            id="cv-upload"
          />
          <label htmlFor="cv-upload" style={{ cursor: 'pointer' }}>
            <Box>
              <Typography variant="body1">{cvFile ? cvFile.name : "Upload CV (doc, docx, pdf)"}</Typography>
            </Box>
          </label>
        </Box>
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
