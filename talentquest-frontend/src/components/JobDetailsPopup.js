import React, { useState, useEffect } from 'react';
import { Box, Typography, Dialog, DialogTitle, DialogContent, List, ListItem, ListItemText, Button, IconButton, Grid, Divider } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { getApplicationsByJob, getCvByApplicationId } from '../services/applicationService';
import PDFViewer from './PDFViewer';

const JobDetailsPopup = ({ job, open, onClose }) => {
  const [applications, setApplications] = useState([]);
  const [selectedCv, setSelectedCv] = useState(null);

  useEffect(() => {
    if (job) {
      fetchApplications();
    }
  }, [job]);

  const fetchApplications = async () => {
    try {
      const response = await getApplicationsByJob(job.id);
      setApplications(response.data);
    } catch (error) {
      console.error('Error fetching applications:', error);
    }
  };

  const handleDownloadCv = async (applicationId) => {
    try {
      const response = await getCvByApplicationId(applicationId);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', response.headers['content-disposition'].split('filename=')[1]);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Error downloading CV:', error);
    }
  };

  const handleViewCv = async (applicationId) => {
    try {
      const response = await getCvByApplicationId(applicationId);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      setSelectedCv(url);
    } catch (error) {
      console.error('Error fetching CV:', error);
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="md" 
      fullWidth 
      PaperProps={{ 
        style: { 
          borderRadius: 16, 
          padding: '20px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
        } 
      }}
    >
      <DialogTitle sx={{ m: 0, p: 2 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">{job.name}</Typography>
          <IconButton edge="end" color="inherit" onClick={onClose} aria-label="close">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent dividers sx={{ padding: '20px' }}>
        <Typography variant="h6" gutterBottom>
          Job Details
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="body1">
              <strong>Description:</strong> {job.description}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">
              <strong>Location:</strong> {job.location}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">
              <strong>Company:</strong> {job.companyName}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">
              <strong>Salary:</strong> {job.salary}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">
              <strong>Job Type:</strong> {job.jobType}
            </Typography>
          </Grid>
        </Grid>
        
        <Divider sx={{ my: 2 }} />

        <Typography variant="h6" gutterBottom>
          Applications
        </Typography>
        <List>
          {applications.map((application) => (
            <ListItem key={application.id} sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>
              <ListItemText
                primary={`${application.candidateName} - ${application.applicationStatus}`}
                secondary={`Match Score: ${application.matchScore}`}
              />
              <Box>
                <Button onClick={() => handleDownloadCv(application.id)} sx={{ mr: 1 }}>
                  Download CV
                </Button>
                <Button onClick={() => handleViewCv(application.id)}>
                  View CV
                </Button>
              </Box>
            </ListItem>
          ))}
        </List>

        {selectedCv && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom>
              CV Preview
            </Typography>
            <PDFViewer fileUrl={selectedCv} />
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default JobDetailsPopup;
