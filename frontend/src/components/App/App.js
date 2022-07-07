import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
// eslint-disable-next-line import/no-unresolved, import/extensions
import Recipe from '../Recipe/Recipe';

function App() {
  return (
    <Routes>
      <Route path='/recipe' element={<Recipe />} />
    </Routes>
  );
}

export default App;
