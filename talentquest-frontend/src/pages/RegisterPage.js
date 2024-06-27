import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography, Box, Paper, Avatar, Link, Grid, FormControl, InputLabel, Select, MenuItem, Alert } from '@mui/material';
import { PersonAdd as PersonAddIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { register as registerCandidate } from '../services/candidateService';
import { register as registerRecruiter } from '../services/recruiterService';

const RegisterPage = () => {
  const [role, setRole] = useState('candidate');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        navigate('/');
      }, 3000); // Redirect to login page after 3 seconds
    }
  }, [success, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = { firstName, lastName, email, password, phone };
      let response;
      if (role === 'candidate') {
        response = await registerCandidate(data);
      } else {
        response = await registerRecruiter(data);
      }
      console.log('Registration successful:', response.data);
      setSuccess(true);
    } catch (error) {
      setError('Error registering: ' + error.message);
      console.error('Error registering:', error);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)',
        padding: 0,
        margin: 0,
      }}
    >
      <Container component="main" maxWidth="lg" sx={{ padding: 0, margin: 0 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            minHeight: '80vh',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderRadius: 2,
            padding: 4,
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Box sx={{ flex: 1, textAlign: 'center', pr: 4 }}>
            <Typography variant="h2" component="h1" gutterBottom>
              TalentQuest
            </Typography>
            <Typography variant="h5" component="p" color="textSecondary" gutterBottom>
              Your journey to finding the best talent starts here.
            </Typography>
          </Box>
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Paper elevation={6} sx={{ padding: 4, borderRadius: 2 }}>
              <Box display="flex" flexDirection="column" alignItems="center">
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                  <PersonAddIcon />
                </Avatar>
                <Typography variant="h5" component="h1" gutterBottom align="center">
                  Register
                </Typography>
              </Box>
              <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                {success && <Alert severity="success">Registration successful! Redirecting to login...</Alert>}
                {error && <Alert severity="error">{error}</Alert>}
                <FormControl fullWidth margin="normal">
                  <InputLabel>Role</InputLabel>
                  <Select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    label="Role"
                  >
                    <MenuItem value="candidate">Candidate</MenuItem>
                    <MenuItem value="recruiter">Recruiter</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  label="First Name"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <TextField
                  label="Last Name"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                <TextField
                  label="Email"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                  label="Password"
                  type="password"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <TextField
                  label="Phone"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mt: 3, mb: 2, py: 1.5 }}
                  startIcon={<PersonAddIcon />}
                >
                  Register
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link href="/" variant="body2">
                      Already have an account? Sign In
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default RegisterPage;
