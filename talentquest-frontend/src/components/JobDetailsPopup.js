import React, { useState, useEffect, useCallback } from 'react';
import { Box, Typography, Dialog, DialogTitle, DialogContent, List, ListItem, ListItemText, Button, IconButton, Grid, Divider, TextField, Alert, Paper } from '@mui/material';
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

  const fetchApplications = useCallback(async () => {
    try {
      const response = await getApplicationsByJob(job.id);
      setApplications(response.data);
    } catch (error) {
      console.error('Error fetching applications:', error);
    }
  }, [job.id]);

  useEffect(() => {
    if (job) {
      fetchApplications();
    }
  }, [job, fetchApplications]);

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
      await axios.post('/interviews', interviewDetails);
    } catch (error) {
      console.error('Error scheduling interview:', error);
    } finally {
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
        onClose();
      }, 1000);
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
        <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="Description"
                value={job.description}
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
                variant="filled"
                margin="dense"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Location"
                value={job.location}
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
                variant="filled"
                margin="dense"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Company"
                value={job.companyName}
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
                variant="filled"
                margin="dense"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Salary"
                value={job.salary}
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
                variant="filled"
                margin="dense"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Job Type"
                value={job.jobType}
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
                variant="filled"
                margin="dense"
              />
            </Grid>
          </Grid>
        </Paper>

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

        {applications.length > 0 && (
          <>
            <Divider sx={{ my: 2 }} />

            <Typography variant="h6" gutterBottom>
              Schedule Interview
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Link"
                  value={interviewDetails.link}
                  onChange={(e) => setInterviewDetails({ ...interviewDetails, link: e.target.value })}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Date"
                  type="date"
                  value={interviewDetails.date}
                  onChange={(e) => setInterviewDetails({ ...interviewDetails, date: e.target.value })}
                  fullWidth
                  margin="normal"
                  InputLabelProps={{ shrink: true }}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Start Time"
                  type="time"
                  value={interviewDetails.startTime}
                  onChange={(e) => setInterviewDetails({ ...interviewDetails, startTime: e.target.value })}
                  fullWidth
                  margin="normal"
                  InputLabelProps={{ shrink: true }}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="End Time"
                  type="time"
                  value={interviewDetails.endTime}
                  onChange={(e) => setInterviewDetails({ ...interviewDetails, endTime: e.target.value })}
                  fullWidth
                  margin="normal"
                  InputLabelProps={{ shrink: true }}
                  variant="outlined"
                />
              </Grid>
            </Grid>
            {showSuccessMessage && (
              <Alert severity="success" sx={{ mt: 2 }}>
                Interview scheduled successfully
              </Alert>
            )}
            <Box display="flex" justifyContent="center" sx={{ mt: 2 }}>
              <Button onClick={handleScheduleInterview} variant="contained" color="primary">
                Schedule Interview
              </Button>
            </Box>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default JobDetailsPopup;
