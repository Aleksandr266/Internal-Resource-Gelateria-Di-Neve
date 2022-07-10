/* eslint-disable max-len */
import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../Navbar/NavBar';

function MainPage() {
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
}

export default MainPage;
