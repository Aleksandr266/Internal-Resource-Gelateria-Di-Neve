/* eslint-disable max-len */
import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../Navbar/NavBar';
import Container from '@mui/material/Container';

function MainPage() {
  return (
    <>
      <NavBar />
      <Container className='container' maxWidth="xl">
        <Outlet />
      </Container>
    </>
  );
}

export default MainPage;
