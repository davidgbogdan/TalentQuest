// src/components/Sidebar.js
import React from 'react';
import { Box, List, ListItem, ListItemIcon, ListItemText, Drawer, Toolbar } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import InterviewIcon from '@mui/icons-material/EventNote';
import { Link } from 'react-router-dom';

const drawerWidth = 240;

const Sidebar = () => {
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          marginTop: '64px',
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar />
      <Box sx={{ overflow: 'auto' }}>
        <List>
          <ListItem button component={Link} to="/profile">
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItem>
          <ListItem button component={Link} to="/analytics">
            <ListItemIcon>
              <AnalyticsIcon />
            </ListItemIcon>
            <ListItemText primary="Analytics and Metrics" />
          </ListItem>
          <ListItem button component={Link} to="/interviews">
            <ListItemIcon>
              <InterviewIcon />
            </ListItemIcon>
            <ListItemText primary="Interviews" />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
