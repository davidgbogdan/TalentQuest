import React, { useEffect, useState } from 'react';
import { Container, Typography, List, ListItem, ListItemText } from '@mui/material';
import { getAllJobs } from '../services/jobService'; // Adjust the import path

const JobsPage = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await getAllJobs();
        setJobs(response.data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, []);

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Job Listings
      </Typography>
      <List>
        {jobs.map((job) => (
          <ListItem key={job.id}>
            <ListItemText primary={job.title} secondary={job.description} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default JobsPage;
