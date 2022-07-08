import React from 'react';
import { Link} from 'react-router-dom';
import './style.css'

function BaseRow({recipe}) {
  return (
    <>
         <tr key={recipe.id}>
            <td className="tdRecipeRow">
              <Link to={`/recipes/${recipe.id}`}>{recipe.title}</Link>
            </td>
            <td className="tdRecipeRow">{Math.round(Number(recipe.base_weight) * 10) / 100}</td>
            <td className="tdRecipeRow">{recipe.Store.amount}</td>
            <td className="tdRecipeRow">{recipe.Store.standart - recipe.Store.amount}</td>
            <td className="tdRecipeRow">
              {Math.round(
                (Math.round(Number(recipe.base_weight) * 10) / 100) *
                  (recipe.Store.standart - recipe.Store.amount) *
                  100,
              ) / 100}
            </td>
          </tr>
    </>
  );
}

export default BaseRow;
