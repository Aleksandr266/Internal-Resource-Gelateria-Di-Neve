/* eslint-disable max-len */
import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../Navbar/NavBar';
import Container from '@mui/material/Container';

function MainPage() {
  return (
    <div>
      <NavBar />
      <Container maxWidth="xl">
        <Outlet />
      </Container>
    </div>
  );
}

export default MainPage;
