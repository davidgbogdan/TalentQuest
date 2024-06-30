import React, { useState, useEffect } from 'react';
import { Container, Box, TextField, Button, Typography, Alert, Grid, Card, Avatar } from '@mui/material';
import { getRecruiterProfile, updateRecruiterProfile } from '../services/profileService';
import { Email, Phone, Home, LinkedIn, Twitter } from '@mui/icons-material';

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    position: '',
    location: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await getRecruiterProfile();
      setProfile(response.data);
    } catch (error) {
      setError('Error fetching profile: ' + error.message);
      console.error(error);
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
      const response = await updateRecruiterProfile(profile);
      setProfile(response.data);
      setSuccess('Profile updated successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      setError('Error updating profile: ' + error.message);
      console.error(error);
    }
  };

  return (
    <Container component="main" maxWidth={false} sx={{ mt: 4, ml: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2, pb: 5, mb: 2, height: 'auto' }}>
            <Avatar sx={{ width: 80, height: 80, mb: 2 }}>RS</Avatar>
            <Typography variant="h6">{profile.firstName} {profile.lastName}</Typography>
            <Typography variant="subtitle1">{profile.position}</Typography>
            <Typography variant="body2" color="textSecondary" align="center">{profile.company}</Typography>
            <Typography variant="body2" color="textSecondary" align="center">{profile.location}</Typography>
          </Card>
          <Card sx={{ p: 2, height: 'auto', mt: 5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Email sx={{ mr: 1 }} />
              <Typography variant="body2">{profile.email}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Phone sx={{ mr: 1 }} />
              <Typography variant="body2">{profile.phone}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Home sx={{ mr: 1 }} />
              <Typography variant="body2">{profile.location}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <LinkedIn sx={{ mr: 1 }} />
              <Typography variant="body2">linkedin.com/in/{profile.firstName}{profile.lastName}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Twitter sx={{ mr: 1 }} />
              <Typography variant="body2">@{profile.firstName}{profile.lastName}</Typography>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>Profile Information</Typography>
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
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 3, mb: 2 }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  Update Profile
                </Button>
              </Box>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProfilePage;
