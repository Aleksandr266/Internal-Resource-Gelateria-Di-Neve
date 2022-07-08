import React, { useState } from 'react';
import './style.css';
// import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
// import { loadRecipes } from '../../store/recipes/reducer';

function Recipe() {
  // const { recipes, status, error } = useSelector((state) => state.recipes);
  // const dispatch = useDispatch();
  const [recipes, setRecipe] = useState([]);
  const { id } = useParams();

  // React.useEffect(() => {
  //   dispatch(loadRecipes());
  // }, [dispatch]);

  React.useEffect(() => {
    fetch(`/recipes/${id}`)
      .then((res) => res.json())
      // .then((res) => console.log(res))
      .then((res) => setRecipe(res));
  }, []);

  const [recipe] = recipes.filter((el, i) => i === 0);

  return (
    <>
    { recipe
      && <div>
      <h1 className="titleRecipes">{recipe['Recipe.title']}</h1>
      <div className="boxTableRecipe">
        <table className="tableRecipe" cellSpacing={3} cellPadding={10}>
        <tbody>
          <tr>
            <th className="thRecipe">Ингридиенты</th>
            <th className="thRecipe">Для производства</th>
          </tr>
          {
            recipes.map((el) => (
            <tr>
              <td className="tdRecipe">{el['Ingridient.title']}</td>
              <td className="tdRecipe">{el.weight}</td>
            </tr>
            ))
          }
          </tbody>
        </table>
      </div>
    </div>
    }
    </>
  );
}

export default Recipe;
