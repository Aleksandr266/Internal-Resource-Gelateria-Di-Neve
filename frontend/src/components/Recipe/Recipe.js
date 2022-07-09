import React from 'react';
import './style.css';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loadRecipeById, removeRecipeIngridients } from '../../store/recipes/reducer';

function Recipe() {
  const { id } = useParams();
  const { recipeIngridients } = useSelector((state) => state.recipes);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(loadRecipeById(id));
    return () => dispatch(removeRecipeIngridients());
  }, [dispatch, id]);

  return (
    <>
      {recipeIngridients.length && (
        <div>
          <h1 className="titleRecipes">{recipeIngridients[0]['Recipe.title']}</h1>
          <div className="boxTableRecipe">
            <table className="tableRecipe" cellSpacing={3} cellPadding={10}>
              <tbody>
                <tr>
                  <th className="thRecipe">Ингридиенты</th>
                  <th className="thRecipe">Для производства</th>
                </tr>
                {recipeIngridients.map((ingridient) => (
                  <tr key={ingridient.ingridient_id}>
                    <td className="tdRecipe">{ingridient['Ingridient.title']}</td>
                    <td className="tdRecipe">{ingridient.weight}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}

export default Recipe;
