/* eslint-disable object-curly-newline */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable no-prototype-builtins */
/* eslint-disable operator-linebreak */
import React from 'react';
import './style.css';
// import { Outlet, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { loadRecipes } from '../../store/recipes/reducer';
import BaseTable from '../BaseTable/BaseTable';

function Bases() {
  const { recipesByBases, recipes } = useSelector((state) => state.recipes);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(loadRecipes());
  }, [dispatch]);

  console.log(recipes, 'recipes');
  console.log(recipesByBases);

  return (
    <Tabs>
      <TabList className="tablist">
        {recipesByBases.map((base) => (
          <Tab className="tab" key={base.id}>
            {base.category}
          </Tab>
        ))}
      </TabList>
      {recipesByBases.map((base) => (
        <TabPanel key={base.id}>
          <BaseTable recipes={base.recipes} />
        </TabPanel>
      ))}
    </Tabs>
  );
}

export default Bases;
