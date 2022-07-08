import React from 'react';
import './style.css';
import { useNavigate } from 'react-router-dom';

function RecipesList() {
  const navigate = useNavigate();
  const state = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  function save() {
    // отправляем феч на внесение изменений в базу
    // и еще один феч на внесение элементов на страницу из базы
  }

  return (
    <div>
      <h1 className="titleRecipesList">{}</h1>
      <div className="boxTableRecipeList">
        <table className="tableRecipelist" cellSpacing={3} cellPadding={1}>
          <tr>
            <th className="thRecipeList">Наименование</th>
            <th className="thRecipeList">Кол.Мол.Базы на Кг</th>
            <th className="thRecipeList">Наличие на складе</th>
            <th className="thRecipeList">План производства</th>
            <th className="thRecipeList">Итоговое кол. базы</th>
          </tr>
          {
            state.map((el, i) => (
              <tr key={i}>
            <td className="tdRecipeList"><button variant="outlined" onClick={() => navigate('/recipes')}>{el}</button></td>
            <td className="tdRecipeList">{el}</td>
            <td className="tdRecipeList">
              <input className='input' onChange={(e) => e.target.value} placeholder={el} required></input>
              <button onClick={save}>сохранить</button>
            </td>
            <td className="tdRecipeList">{el}</td>
            <td className="tdRecipeList">{el}</td>
              </tr>
            ))
          }
        </table>
      </div>
    </div>
  );
}

export default RecipesList;
