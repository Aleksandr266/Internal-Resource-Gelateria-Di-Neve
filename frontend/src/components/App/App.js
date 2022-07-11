// eslint-disable-next-line import/no-unresolved, import/extensions
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import MainPage from '../MainPage/MainPage';
import Recipe from '../Recipe/Recipe';
import Bases from '../Bases/Bases';
import Todo from '../Todo/Todo';
import FormAddIngridients from '../FormAddIngridients/FormAddIngridients';
import Ingridients from '../Ingridients/ingridients';
import Auth from '../Auth/Auth';

import TechnologBases from '../TechnologBases/TechnologBases'

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />}>
        <Route path="/" element={<Bases />} />        
        <Route path="/technolog" element={<TechnologBases />} />
        <Route path="/recipes/:id" element={<Recipe />} />
        <Route path="/todo" element={<Todo />} />
        <Route path="/formAddIngridients" element={<FormAddIngridients />} />
        <Route path="/ingridients" element={<Ingridients />} />
      </Route>
        <Route path="/auth" element={<Auth />} />
    </Routes>
  );
}

export default App;
