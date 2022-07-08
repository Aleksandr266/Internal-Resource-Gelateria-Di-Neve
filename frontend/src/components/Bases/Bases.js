/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable no-prototype-builtins */
/* eslint-disable operator-linebreak */
import React from 'react';
import './style.css';
import { Outlet, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loadRecipes } from '../../store/recipes/reducer';

function Bases() {
  const { recipesByBases } = useSelector((state) => state.recipes);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(loadRecipes());
  }, [dispatch]);

  return (
    <>
      <nav>
        {recipesByBases.map((base, id) => (
          <Link key={id} to={`/bases/${id}`}>
            {base.category}
          </Link>
        ))}
      </nav>
      <Outlet />
    </>
  );
}

export default Bases;
