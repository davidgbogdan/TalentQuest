import React, { useState, useEffect } from 'react';
import { Container, Grid, Card, CardContent, CardActions, Button, Typography, Box } from '@mui/material';
import { getAllJobs } from '../services/jobService';
import Sidebar from '../components/Sidebar';
import ApplyJobPopup from '../components/ApplyJobPopup';

const CandidateDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState('');
  const [selectedJob, setSelectedJob] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await getAllJobs();
      setJobs(response.data);
    } catch (error) {
      setError('Error fetching jobs: ' + error.message);
    }
  };

  const handleApplyClick = (job) => {
    setSelectedJob(job);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedJob(null);
  };

  return (
    <Box sx={{ display: 'flex', width: '100%' }}>
      <Container component="main" maxWidth="lg" sx={{ mt: 4, ml: 0, pl: 0 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Available Jobs
        </Typography>
        <Box>
          {error && <Typography color="error">{error}</Typography>}
          <Grid container spacing={4}>
            {jobs.map((job) => (
              <Grid item key={job.id} xs={12} sm={6} md={4}>
                <Card elevation={3} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                  <CardContent>
                    <Typography variant="h6" component="h2" gutterBottom>
                      {job.name}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                      {job.location}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      {job.description}
                    </Typography>
                    <Typography variant="body2" mt={2}>
                      Company: {job.companyName}
                    </Typography>
                    <Typography variant="body2">
                      Salary: {job.salary}
                    </Typography>
                    <Typography variant="body2">
                      Job Type: {job.jobType}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" variant="contained" color="primary" onClick={() => handleApplyClick(job)}>
                      Apply Now
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
        {selectedJob && (
          <ApplyJobPopup
            job={selectedJob}
            open={isPopupOpen}
            onClose={handleClosePopup}
          />
        )}
      </Container>
    </Box>
  );
};

export default CandidateDashboard;
