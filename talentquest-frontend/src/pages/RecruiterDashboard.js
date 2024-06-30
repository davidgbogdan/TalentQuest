import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Button,
  TextField,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { getJobsForRecruiter, addJob } from '../services/recruiterService';
import JobDetailsPopup from '../components/JobDetailsPopup';

const RecruiterDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [newJob, setNewJob] = useState({
    name: '',
    description: '',
    location: '',
    companyName: '',
    salary: '',
    jobType: 'FULL_TIME',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [selectedJob, setSelectedJob] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await getJobsForRecruiter();
      setJobs(response.data);
    } catch (error) {
      setError('Error fetching jobs: ' + error.message);
    }
  };

  const handleChange = (e) => {
    setNewJob({
      ...newJob,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddJob = async (e) => {
    e.preventDefault();
    try {
      const response = await addJob(newJob);
      setJobs([...jobs, response.data]);
      setNewJob({
        name: '',
        description: '',
        location: '',
        companyName: '',
        salary: '',
        jobType: 'FULL_TIME',
      });
      setSuccess('Job added successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      setError('Error adding job: ' + error.message);
    }
  };

  const handleJobClick = (job) => {
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
          Recruiter Dashboard
        </Typography>
        <Box>
          {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mb: 3 }}>{success}</Alert>}
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ p: 3, borderRadius: '10px' }}>
                <Typography variant="h6" component="h2" gutterBottom>
                  Add New Job
                </Typography>
                <Box component="form" onSubmit={handleAddJob} sx={{ mt: 2 }}>
                  <TextField
                    label="Job Name"
                    name="name"
                    value={newJob.name}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                    variant="outlined"
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    label="Description"
                    name="description"
                    value={newJob.description}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    multiline
                    rows={4}
                    required
                    variant="outlined"
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    label="Location"
                    name="location"
                    value={newJob.location}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                    variant="outlined"
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    label="Company Name"
                    name="companyName"
                    value={newJob.companyName}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                    variant="outlined"
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    label="Salary"
                    name="salary"
                    value={newJob.salary}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    type="number"
                    required
                    variant="outlined"
                    sx={{ mb: 2 }}
                  />
                  <FormControl fullWidth margin="normal" variant="outlined" sx={{ mb: 2 }}>
                    <InputLabel>Job Type</InputLabel>
                    <Select
                      name="jobType"
                      value={newJob.jobType}
                      onChange={handleChange}
                      label="Job Type"
                      required
                    >
                      <MenuItem value="FULL_TIME">Full Time</MenuItem>
                      <MenuItem value="PART_TIME">Part Time</MenuItem>
                      <MenuItem value="CONTRACT">Contract</MenuItem>
                    </Select>
                  </FormControl>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Add Job
                  </Button>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ p: 3, borderRadius: '10px' }}>
                <Typography variant="h6" component="h2" gutterBottom>
                  Your Jobs
                </Typography>
                <List>
                  {jobs.map((job) => (
                    <ListItem
                      key={job.id}
                      divider
                      button
                      onClick={() => handleJobClick(job)}
                      sx={{ borderRadius: '5px', '&:hover': { backgroundColor: '#f1f1f1' } }}
                    >
                      <ListItemText
                        primary={job.name}
                        secondary={`${job.description} - ${job.location} - ${job.salary}`}
                      />
                      <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="delete">
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Grid>
          </Grid>
        </Box>
        {selectedJob && (
          <JobDetailsPopup job={selectedJob} open={isPopupOpen} onClose={handleClosePopup} />
        )}
      </Container>
    </Box>
  );
};

export default RecruiterDashboard;
