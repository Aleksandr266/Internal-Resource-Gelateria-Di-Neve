import React from 'react';
import './style.css';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loadRecipes } from '../../store/recipes/reducer';

function RecipesList() {
  const navigate = useNavigate();
  // const state = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const { recipes, status, error } = useSelector((state) => state.recipes);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(loadRecipes());
  }, [dispatch]);

  console.log(status);
  console.log(error);

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
              <tr key={recipe.id}>
                <td className="tdRecipeList">
                  <button variant="outlined" onClick={() => navigate(`/recipes/${recipe.id}`)}>
                    {recipe.title}
                  </button>
                </td>
                <td className="tdRecipeList">{recipe.base_weight}</td>
                <td className="tdRecipeList">
                  0
                  {/* <input
                  className="input"
                  onChange={(e) => e.target.value}
                  placeholder={el}
                  required></input>
                <button onClick={save}>сохранить</button> */}
                </td>
                <td className="tdRecipeList">0</td>
                <td className="tdRecipeList">0</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RecipesList;
