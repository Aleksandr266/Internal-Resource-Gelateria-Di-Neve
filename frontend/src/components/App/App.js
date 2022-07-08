// eslint-disable-next-line import/no-unresolved, import/extensions
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Recipe from '../Recipe/Recipe';
import RecipesList from '../RecipesList/RecipesList';
import BaseTable from '../BaseTable/BaseTable';
import Bases from '../Bases/Bases';

function App() {
  return (
    <Routes>
      <Route path="/" element={<RecipesList />} />
      <Route path="/bases" element={<Bases />}>
        <Route path="/bases/:id" element={<BaseTable />} />
      </Route>
      <Route path="/recipes/:id" element={<Recipe />} />
      <Route path="/recipesList" element={<RecipesList />} />
    </Routes>
  );
}

export default App;
