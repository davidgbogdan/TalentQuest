import React, { useState } from 'react';
import { TextField, Button, Container, Typography, FormControl, InputLabel, Select, MenuItem, Paper, Box, Avatar } from '@mui/material';
import { PersonAdd as PersonAddIcon } from '@mui/icons-material';
import { register as registerCandidate } from '../services/candidateService';
import { register as registerRecruiter } from '../services/recruiterService';

const RegisterPage = () => {
  const [role, setRole] = useState('candidate');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');

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
    } catch (error) {
      console.error('Error registering:', error);
    }
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ mt: 8 }}>
      <Paper elevation={6} sx={{ padding: 4, borderRadius: 2, backgroundColor: 'rgba(255, 255, 255, 0.85)' }}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <PersonAddIcon />
          </Avatar>
          <Typography variant="h5" component="h1" gutterBottom>
            Register
          </Typography>
        </Box>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
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
            sx={{ mt: 3, mb: 2 }}
          >
            Register
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default RegisterPage;
