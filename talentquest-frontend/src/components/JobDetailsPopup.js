import React, { useState, useEffect } from 'react';
import { Box, Typography, Dialog, DialogTitle, DialogContent, List, ListItem, ListItemText, Button, IconButton, Grid, Divider, TextField, Alert } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { getApplicationsByJob, getCvByApplicationId } from '../services/applicationService';
import PDFViewer from './PDFViewer';
import axios from 'axios';

const JobDetailsPopup = ({ job, open, onClose }) => {
  const [applications, setApplications] = useState([]);
  const [selectedCv, setSelectedCv] = useState(null);
  const [interviewDetails, setInterviewDetails] = useState({
    link: '',
    date: '',
    startTime: '',
    endTime: ''
  });
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

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

  const handleViewCv = async (applicationId) => {
    try {
      const response = await getCvByApplicationId(applicationId);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      setSelectedCv(url);
    } catch (error) {
      console.error('Error fetching CV:', error);
    }
  };

  const handleScheduleInterview = async () => {
    try {
      const response = await axios.post('/interviews', interviewDetails);
      console.log('Interview scheduled:', response.data);
    } catch (error) {
      console.error('Error scheduling interview:', error);
    } finally {
      setShowSuccessMessage(true);
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

        <Divider sx={{ my: 2 }} />

        <Typography variant="h6" gutterBottom>
          Schedule Interview
        </Typography>
        <TextField
          label="Link"
          value={interviewDetails.link}
          onChange={(e) => setInterviewDetails({ ...interviewDetails, link: e.target.value })}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Date"
          type="date"
          value={interviewDetails.date}
          onChange={(e) => setInterviewDetails({ ...interviewDetails, date: e.target.value })}
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Start Time"
          type="time"
          value={interviewDetails.startTime}
          onChange={(e) => setInterviewDetails({ ...interviewDetails, startTime: e.target.value })}
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="End Time"
          type="time"
          value={interviewDetails.endTime}
          onChange={(e) => setInterviewDetails({ ...interviewDetails, endTime: e.target.value })}
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />
        <Button onClick={handleScheduleInterview} variant="contained" color="primary" sx={{ mt: 2 }}>
          Schedule Interview
        </Button>
        {showSuccessMessage && (
          <Alert severity="success" sx={{ mt: 2 }}>
            The interview has been created
          </Alert>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default JobDetailsPopup;
