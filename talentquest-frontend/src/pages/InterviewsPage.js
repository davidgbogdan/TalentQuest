// src/pages/InterviewsPage.js
import React from 'react';
import { Container, Typography, Card, CardContent, Box, Avatar } from '@mui/material';
import { styled } from '@mui/system';
import EventIcon from '@mui/icons-material/Event';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import RoomIcon from '@mui/icons-material/Room';
import WorkIcon from '@mui/icons-material/Work';

const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  marginBottom: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[4],
  border: `1px solid ${theme.palette.divider}`,
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
}));

const StyledCardContent = styled(CardContent)(({ theme }) => ({
  flex: '1 0 auto',
  padding: theme.spacing(3),
  textAlign: 'center',
}));

const InterviewAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(9),
  height: theme.spacing(9),
  marginBottom: theme.spacing(2),
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.getContrastText(theme.palette.primary.main),
}));

const InterviewDetail = ({ icon: Icon, text }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 2 }}>
    <Icon sx={{ mr: 1 }} color="action" />
    <Typography variant="body2" color="textSecondary">
      {text}
    </Typography>
  </Box>
);

const InterviewsPage = () => {
  return (
    <Container component="main" maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Upcoming Interviews
      </Typography>
      <StyledCard>
        <StyledCardContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <InterviewAvatar>JD</InterviewAvatar>
            <Typography variant="h5" component="div" gutterBottom>
              Interview with Test Candidat
            </Typography>
          </Box>
          <InterviewDetail icon={WorkIcon} text="Position: Test - Java" />
          <InterviewDetail icon={EventIcon} text="Date: July 3, 2024" />
          <InterviewDetail icon={AccessTimeIcon} text="Time: 10:00 AM - 11:00 AM" />
          <InterviewDetail icon={RoomIcon} text="LINK: test" />
        </StyledCardContent>
      </StyledCard>
    </Container>
  );
};

export default InterviewsPage;
