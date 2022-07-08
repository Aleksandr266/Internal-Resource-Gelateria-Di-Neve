/* eslint-disable operator-linebreak */
import React from 'react';
import { Link } from 'react-router-dom';
// import { useSelector } from 'react-redux';
import RecipeRow from '../RecipeRow/RecipeRow';

function BaseTable({ recipes }) {
  // const { recipesByBases } = useSelector((state) => state.recipes);
  // const { id } = useParams();
  // const { recipes } = recipesByBases[Number(id)];
  return (
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
          < RecipeRow key={recipe.id} recipe={recipe}  />
        ))}
      </tbody>
    </table>
  );
}

export default BaseTable;
