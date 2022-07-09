// eslint-disable-next-line import/no-unresolved, import/extensions
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Recipe from '../Recipe/Recipe';
import Bases from '../Bases/Bases';
import Todo from '../Todo/Todo';
import FormAddIngridients from '../FormAddIngridients/FormAddIngridients';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Bases />} />
      <Route path="/bases" element={<Bases />} />
      <Route path="/recipes/:id" element={<Recipe />} />
      <Route path="/todo" element={<Todo />} />
      <Route path="/formAddIngridients" element={<FormAddIngridients />} />
    </Routes>
  );
}

export default App;
