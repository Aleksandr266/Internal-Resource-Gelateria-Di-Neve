import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// import {UPDATE_STORE} from '../../store/stores/actionTypes';
import { updateStore } from '../../store/recipes/reducer';

import './style.css';

function BaseRow({ recipe }) {
  const dispatch = useDispatch();
  // const store = useSelector((state) => state.stores)

  const [input, setInput] = useState(false);

  function changeAmount(e) {
    setInput(true);
  }

  function inputValue(e) {
    const value = e.target.value;
    console.log(value);
    if (e.charCode === 13) {
      dispatch(updateStore({ id: recipe.id, value }));
      setInput(false);
    }
  }

  return (
    <>
      <tr key={recipe.id}>
        <td className="tdRecipeRow">
          <Link to={`/recipes/${recipe.id}`}>{recipe.title}</Link>
        </td>
        <td className="tdRecipeRow">{Math.round(Number(recipe.base_weight) * 10) / 100}</td>
        {input ? (
          <input type="text" onKeyPress={inputValue} className="inputRecipeRow" />
        ) : (
          <td className="tdRecipeRow" onDoubleClick={changeAmount}>
            {recipe.Store.amount}
          </td>
        )}
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
