import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, List, ListItem, ListItemText } from '@mui/material';
import { getApplicationsByJob } from '../services/applicationService'; // Adjust the import path

const ApplicationsPage = () => {
  const { jobId } = useParams();
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await getApplicationsByJob(jobId);
        setApplications(response.data);
      } catch (error) {
        console.error('Error fetching applications:', error);
      }
    };

    fetchApplications();
  }, [jobId]);

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Applications for Job ID: {jobId}
      </Typography>
      <List>
        {applications.map((application) => (
          <ListItem key={application.id}>
            <ListItemText primary={application.candidateName} secondary={application.cvFileName} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default ApplicationsPage;
