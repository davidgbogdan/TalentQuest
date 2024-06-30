// src/components/Layout.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Toolbar } from '@mui/material';
import Sidebar from './Sidebar';
import NavBar from './NavBar'; 

const drawerWidth = 0; // Use the same width as the Sidebar

const Layout = () => {
  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <NavBar />
      <Sidebar />
      <Box
        component="main"
        sx={{ 
          flexGrow: 1, 
          p: 3, 
          marginTop: '64px', 
          overflowY: 'auto', 
          height: 'calc(100vh - 64px)',
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          ml: `${drawerWidth}px` // Changed from marginLeft to ml
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
