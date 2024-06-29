import React, { useState, useEffect } from 'react';
import { Box, Typography, Dialog, DialogTitle, DialogContent, List, ListItem, ListItemText } from '@mui/material';
import { getApplicationsByJob } from '../services/applicationService';

const JobDetailsPopup = ({ job, open, onClose }) => {
  const [applications, setApplications] = useState([]);

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
                primary={`${application.candidateName} - ${application.status}`}
                secondary={application.coverLetter}
              />
            </ListItem>
          ))}
        </List>
      </DialogContent>
    </Dialog>
  );
};

export default JobDetailsPopup;
