import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/system';

const StyledAppBar = styled(AppBar)({
  backgroundColor: '#3f51b5', 
});

const StyledToolbar = styled(Toolbar)({
  display: 'flex',
  justifyContent: 'space-between',
  padding: '0 16px',
});

const StyledTypography = styled(Typography)({
  fontWeight: 'bold',
  fontFamily: 'Roboto, sans-serif',
  fontSize: '1.5rem',
  cursor: 'pointer',
});

const LogoutButton = styled(Button)({
  color: '#fff',
  border: '1px solid #fff',
  '&:hover': {
    backgroundColor: '#fff',
    color: '#3f51b5',
    border: '1px solid #3f51b5',
  },
});

const NavBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleRedirect = () => {
    navigate('/recruiter-dashboard');
  };

  return (
    <StyledAppBar position="fixed">
      <Container maxWidth="lg">
        <StyledToolbar>
          <StyledTypography variant="h6" onClick={handleRedirect}>
            TalentQuest
          </StyledTypography>
          <LogoutButton variant="outlined" onClick={handleLogout}>
            Logout
          </LogoutButton>
        </StyledToolbar>
      </Container>
    </StyledAppBar>
  );
};

export default NavBar;
