/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable no-prototype-builtins */
/* eslint-disable operator-linebreak */
import React from 'react';
import './style.css';
// import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loadRecipes } from '../../store/recipes/reducer';
import RecipeRow from '../RecipeRow/RecipeRow';

function RecipesList() {
  const { recipes, recipesByBases } = useSelector((state) => state.recipes);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(loadRecipes());
  }, [dispatch]);

  console.log('recipesByBases', recipesByBases);

  return (
    <div>
      <h1 className="titleRecipesList">{}</h1>
      <div className="boxTableRecipeList">
        <table className="tableRecipelist" cellSpacing={3} cellPadding={1}>
          <tbody>
            <tr>
              <th className="thRecipeList">Наименование</th>
              <th className="thRecipeList">Кол.Мол.Базы на Кг</th>
              <th className="thRecipeList">Наличие на складе</th>
              <th className="thRecipeList">План производства</th>
              <th className="thRecipeList">Итоговое кол. базы</th>
            </tr>
            {recipes.map((recipe) => (
           
              <RecipeRow key={recipe.id} recipe={recipe} /> 
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RecipesList;
