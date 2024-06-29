import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import NavBar from './NavBar';

const Layout = () => {
  const location = useLocation();
  const noNavBarRoutes = ['/','/register'];

  return (
    <>
      {!noNavBarRoutes.includes(location.pathname) && <NavBar />}
      <Outlet />
    </>
  );
};

export default Layout;
