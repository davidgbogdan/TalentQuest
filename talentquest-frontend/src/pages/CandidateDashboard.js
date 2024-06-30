import React, { useState, useEffect } from 'react';
import { Container, Grid, Card, CardContent, Button, Typography, Box, Avatar } from '@mui/material';
import { getAllJobs } from '../services/jobService';
import ApplyJobPopup from '../components/ApplyJobPopup';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import BusinessIcon from '@mui/icons-material/Business';

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
              <Grid item key={job.id} xs={12}>
                <Card
                  elevation={3}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    padding: 2,
                    borderRadius: 2,
                    boxShadow: 3,
                    marginBottom: 2,
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar alt={job.companyName} src={job.companyLogo} sx={{ marginRight: 2 }} />
                    <Box>
                      <Typography variant="h6" component="h2">
                        {job.name}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
                        <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', marginRight: 1 }}>
                          <LocationOnIcon fontSize="small" />
                          {job.location}
                        </Typography>
                        <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', marginRight: 1 }}>
                          <BusinessIcon fontSize="small" />
                          {job.companyName}
                        </Typography>
                        <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
                          <MonetizationOnIcon fontSize="small" />
                          {job.salary}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  <CardContent>
                    <Typography variant="body2" color="textSecondary">
                      {job.description}
                    </Typography>
                  </CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body2" sx={{ backgroundColor: 'lightblue', borderRadius: 2, padding: '2px 8px' }}>
                      {job.jobType}
                    </Typography>
                    <Button size="small" variant="contained" color="primary" onClick={() => handleApplyClick(job)} sx={{ mt: 1 }}>
                      Apply Now
                    </Button>
                  </Box>
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
