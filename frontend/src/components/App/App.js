// eslint-disable-next-line import/no-unresolved, import/extensions
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Recipe from '../Recipe/Recipe';
import RecipesList from '../RecipesList/RecipesList';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Recipe />} />
      <Route path="/recipes" element={<Recipe />} />
      <Route path="/recipesList" element={<RecipesList />} />
    </Routes>
  );
}

export default App;
