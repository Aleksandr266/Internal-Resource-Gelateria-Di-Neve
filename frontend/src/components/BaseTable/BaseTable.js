/* eslint-disable operator-linebreak */
import React from 'react';
import { Link } from 'react-router-dom';
// import { useSelector } from 'react-redux';

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
          <tr key={recipe.id}>
            <td className="tdRecipeList">
              <Link to={`/recipes/${recipe.id}`}>{recipe.title}</Link>
            </td>
            <td className="tdRecipeList">{Math.round(Number(recipe.base_weight) * 10) / 100}</td>
            <td className="tdRecipeList">{recipe.Store.amount}</td>
            <td className="tdRecipeList">{recipe.Store.standart - recipe.Store.amount}</td>
            <td className="tdRecipeList">
              {Math.round(
                (Math.round(Number(recipe.base_weight) * 10) / 100) *
                  (recipe.Store.standart - recipe.Store.amount) *
                  100,
              ) / 100}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default BaseTable;
