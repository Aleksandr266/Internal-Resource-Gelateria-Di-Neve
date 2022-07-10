// eslint-disable-next-line import/no-unresolved, import/extensions
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Recipe from '../Recipe/Recipe';
import Bases from '../Bases/Bases';
import Todo from '../Todo/Todo';
import FormAddIngridients from '../FormAddIngridients/FormAddIngridients';

import TechnologBases from '../TechnologBases/TechnologBases'
import Container from '@mui/material/Container';

function App() {
  return (
    <Container maxWidth="xl">
      <Routes>
        <Route path="/" element={<Bases />} />
        <Route path="/bases" element={<Bases />} />
        <Route path="/technolog" element={<TechnologBases />} />
        <Route path="/formAddIngridients" element={<FormAddIngridients />} />
        <Route path="/recipes/:id" element={<Recipe />} />
        <Route path="/todo" element={<Todo />} />
      </Routes>
    </Container>

  );
}

export default App;
