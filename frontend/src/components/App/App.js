// eslint-disable-next-line import/no-unresolved, import/extensions
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Recipe from '../Recipe/Recipe';
import Bases from '../Bases/Bases';
import Todo from '../Todo/Todo';
import Container from '@mui/material/Container';

function App() {
  return (
    <Container maxWidth="xl">
      <Routes>
        <Route path="/" element={<Bases />} />
        <Route path="/bases" element={<Bases />} />
        <Route path="/recipes/:id" element={<Recipe />} />
        <Route path="/todo" element={<Todo />} />
      </Routes>
    </Container>
  );
}

export default App;
