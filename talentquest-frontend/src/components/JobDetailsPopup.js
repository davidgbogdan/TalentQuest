import React, { useState, useEffect } from 'react';
import { Box, Typography, Dialog, DialogTitle, DialogContent, List, ListItem, ListItemText, Button } from '@mui/material';
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
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{job.name}</DialogTitle>
      <DialogContent>
        <Typography variant="h6" gutterBottom>
          Job Details
        </Typography>
        <Typography variant="body1">
          {job.description}
        </Typography>
        <Typography variant="body1">
          Location: {job.location}
        </Typography>
        <Typography variant="body1">
          Company: {job.companyName}
        </Typography>
        <Typography variant="body1">
          Salary: {job.salary}
        </Typography>
        <Typography variant="body1">
          Job Type: {job.jobType}
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
          Applications
        </Typography>
        <List>
          {applications.map((application) => (
            <ListItem key={application.id}>
              <ListItemText
                primary={`${application.candidateName} - ${application.applicationStatus}`}
                secondary={`Match Score: ${application.matchScore}`}
              />
              <Button onClick={() => handleDownloadCv(application.id)}>
                Download CV
              </Button>
              <Button onClick={() => handleViewCv(application.id)}>
                View CV
              </Button>
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
