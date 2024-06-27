import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Paper, Avatar, Link, Grid, Alert } from '@mui/material';
import { LockOutlined as LockOutlinedIcon } from '@mui/icons-material';
import { login as candidateLogin } from '../services/candidateService';
import { login as recruiterLogin } from '../services/recruiterService';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(''); // Clear previous errors

    try {
      // Attempt to log in as a candidate first
      const response = await candidateLogin({ email, password });
      handleLoginSuccess(response.data);
    } catch (candidateError) {
      // If candidate login fails, attempt to log in as a recruiter
      try {
        const response = await recruiterLogin({ email, password });
        handleLoginSuccess(response.data);
      } catch (recruiterError) {
        // If both logins fail, set an error message
        setError('Invalid email or password');
        console.error('Error logging in:', recruiterError);
      }
    }
  };

  const handleLoginSuccess = (data) => {
    console.log('Login successful:', data);
    const { role, jwt } = data;

    // Store the JWT token or handle the session here
    localStorage.setItem('token', jwt);

    // Redirect based on user role
    if (role === 'CANDIDATE') {
      navigate('/candidate-dashboard'); // Adjust the route as needed
    } else if (role === 'RECRUITER') {
      navigate('/recruiter-dashboard'); // Adjust the route as needed
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundImage: 'url(https://source.unsplash.com/random)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: 2,
      }}
    >
      <Container maxWidth="xs">
        <Paper elevation={6} sx={{ padding: 4, borderRadius: 2, backgroundColor: 'rgba(255, 255, 255, 0.85)' }}>
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
      </Container>
    </Box>
  );
};

export default LoginPage;
