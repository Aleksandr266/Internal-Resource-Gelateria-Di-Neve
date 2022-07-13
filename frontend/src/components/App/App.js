// eslint-disable-next-line import/no-unresolved, import/extensions
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import MainPage from '../MainPage/MainPage';
import Bases from '../Bases/Bases';
import FormAddIngridients from '../FormAddIngridients/FormAddIngridients';
import Ingridients from '../Ingridients/ingridients';
import Auth from '../Auth/Auth';
import BossMainPage from '../BossMainPage/BossMainPage'
import BossAddEmpoyees from '../BossAddEmpoyees/BossAddEmpoyees'
import BossStatistic from '../Statistics/LineStat/LineStat'
import TechnologBases from '../TechnologBases/TechnologBases';
import NewRecipe from '../NewRecipe/NewRecipe';
import Employees from '../Employees/Employees'

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />}>
        <Route path="/" element={<NewRecipe />} />
        <Route path="/bases" element={<Bases />} />
        <Route path="/recipes/new" element={<NewRecipe />} />
        <Route path="/technolog" element={<TechnologBases />} />
        <Route path="/formAddIngridients" element={<FormAddIngridients />} />
        <Route path="/ingridients" element={<Ingridients />} />
        <Route path="/boss" element={<BossMainPage />} />
        <Route path="/boss/employees" element={<Employees />} />
        <Route path="/boss/addEmpoyees" element={<BossAddEmpoyees />} />
        <Route path="/boss/statistic" element={<BossStatistic />} />
      </Route>
      <Route path="/auth" element={<Auth />} />
    </Routes>
  );
}

export default App;
