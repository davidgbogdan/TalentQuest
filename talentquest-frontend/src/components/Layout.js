import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Toolbar } from '@mui/material';
import Sidebar from './Sidebar';
import NavBar from './NavBar';  // Import NavBar

const Layout = () => {
  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <NavBar />  // Add NavBar here
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
          alignItems: 'flex-start'
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
