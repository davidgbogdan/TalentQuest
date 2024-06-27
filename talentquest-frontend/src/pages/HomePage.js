import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Paper, Avatar, Link, Grid, Alert } from '@mui/material';
import { LockOutlined as LockOutlinedIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { login as candidateLogin } from '../services/candidateService';
import { login as recruiterLogin } from '../services/recruiterService';

const HomePage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const response = await candidateLogin({ email, password });
      handleLoginSuccess(response.data);
    } catch (candidateError) {
      try {
        const response = await recruiterLogin({ email, password });
        handleLoginSuccess(response.data);
      } catch (recruiterError) {
        setError('Invalid email or password');
        console.error('Error logging in:', recruiterError);
      }
    }
  };

  const handleLoginSuccess = (data) => {
    console.log('Login successful:', data);
    const { role, jwt } = data;

    localStorage.setItem('token', jwt);

    if (role === 'CANDIDATE') {
      navigate('/candidate-dashboard');
    } else if (role === 'RECRUITER') {
      navigate('/recruiter-dashboard');
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
                  <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5" component="h1" gutterBottom align="center">
                  Sign In
                </Typography>
              </Box>
              <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                {error && <Alert severity="error">{error}</Alert>}
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
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mt: 3, mb: 2, py: 1.5 }}
                  startIcon={<LockOutlinedIcon />}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="/register" variant="body2">
                      {"Don't have an account? Sign Up"}
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

export default HomePage;
