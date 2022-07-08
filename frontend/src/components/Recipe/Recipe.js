import React from 'react';
import './style.css';

function Recipe() {
  return (
    <div>
      <h1 className="titleRecipes">{}</h1>
      <div className="boxTableRecipe">
        <table className="tableRecipe" cellSpacing={3} cellPadding={10}>
          <tr>
            <th className="thRecipe">Ингридиенты</th>
            <th className="thRecipe">Для производства</th>
          </tr>
          <tr>
            <td className="tdRecipe">Молочная база №1</td>
            <td className="tdRecipe">{0}</td>
          </tr>
          <tr>
            <td className="tdRecipe">Молоко 3.2% жирности</td>
            <td className="tdRecipe">{0}</td>
          </tr>
          <tr>
            <td className="tdRecipe">Сахар</td>
            <td className="tdRecipe">{0}</td>
          </tr>
          <tr>
            <td className="tdRecipe">Декстроза</td>
            <td className="tdRecipe">{0}</td>
          </tr>
          <tr>
            <td className="tdRecipe">Глюкоза</td>
            <td className="tdRecipe">{0}</td>
          </tr>
          <tr>
            <td className="tdRecipe">Стабилизатор</td>
            <td className="tdRecipe">{0}</td>
          </tr>
          <tr>
            <td className="tdRecipe">Сухое молоко</td>
            <td className="tdRecipe">{0}</td>
          </tr>
          <tr>
            <td className="tdRecipe">Всего</td>
            <td className="tdRecipe">{0}</td>
          </tr>
        </table>
      </div>
    </div>
  );
}

export default Recipe;
