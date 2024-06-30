import React, { useState, useEffect } from 'react';
import { Container, Box, TextField, Button, Typography, Alert } from '@mui/material';
import { getCandidateProfile, updateCandidateProfile, getRecruiterProfile, updateRecruiterProfile } from '../services/profileService';

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      let response;
      const role = localStorage.getItem('role');
      console.log('Role:', role); // Debugging line
      if (role === 'CANDIDATE') {
        response = await getCandidateProfile();
      } else {
        response = await getRecruiterProfile();
      }
      setProfile(response.data);
    } catch (error) {
      setError('Error fetching profile: ' + error.message);
      console.error(error); // Debugging line
    }
  };

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      const role = localStorage.getItem('role');
      console.log('Role:', role); // Debugging line
      if (role === 'CANDIDATE') {
        response = await updateCandidateProfile(profile);
      } else {
        response = await updateRecruiterProfile(profile);
      }
      setProfile(response.data);
      setSuccess('Profile updated successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      setError('Error updating profile: ' + error.message);
      console.error(error); // Debugging line
    }
  };

  return (
    <Box sx={{ display: 'flex', width: '100%' }}>
      <Container component="main" maxWidth="sm" sx={{ mt: 4, ml: 0, pl: 0 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Profile
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">{success}</Alert>}
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            label="First Name"
            name="firstName"
            value={profile.firstName}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Last Name"
            name="lastName"
            value={profile.lastName}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Phone"
            name="phone"
            value={profile.phone}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Update Profile
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default ProfilePage;
