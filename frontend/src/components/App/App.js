// eslint-disable-next-line import/no-unresolved, import/extensions
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Recipe from '../Recipe/Recipe';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Recipe />} />
      <Route path="/recipes" element={<Recipe />} />
    </Routes>
  );
}

export default App;
