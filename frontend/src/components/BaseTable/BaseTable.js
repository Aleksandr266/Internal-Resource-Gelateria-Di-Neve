/* eslint-disable operator-linebreak */
import React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
// import { useSelector } from 'react-redux';
// import RecipeRow from '../RecipeRow/RecipeRow';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateStore } from '../../store/recipes/reducer';

const columns = [
  { field: 'id', headerName: 'ID', width: 90, valueGetter: (recipes) => `${recipes.row.id}` },
  {
    field: 'title',
    headerName: 'Наименование',
    width: 250,
    minWidth: 200,
    maxWidth: 500,
    renderCell: (recipes) => <Link to={`/recipes/${recipes.row.id}`}>{recipes.row.title}</Link>,
  },
  {
    field: 'base_weight',
    headerName: 'Кол.Мол.Базы на Кг',
    width: 250,
    minWidth: 200,
    maxWidth: 500,
    editable: false,
    valueGetter: (recipes) => `${recipes.row.base_weight}`,
  },
  {
    field: 'amount',
    headerName: 'Наличие на складе',
    type: 'number',
    width: 250,
    minWidth: 200,
    maxWidth: 500,
    editable: true,
    valueGetter: (recipes) => `${recipes.row.Store.amount}`,
  },
  {
    field: 'age',
    headerName: 'План производства',
    type: 'number',
    width: 250,
    minWidth: 200,
    maxWidth: 500,
    editable: true,
    valueGetter: (recipes) => `${recipes.row.Store.standart - recipes.row.Store.amount}`,
  },
  {
    field: 'fullName',
    headerName: 'Итоговое кол. базы',
    width: 250,
    minWidth: 200,
    maxWidth: 500,
    // width: 160,
    valueGetter: (recipes) =>
      `${
        Math.round(
          (Math.round(Number(recipes.row.base_weight) * 10) / 100) *
            (recipes.row.Store.standart - recipes.row.Store.amount) *
            100,
        ) / 100
      }`,
  },
];

function BaseTable({ recipes }) {
  const dispatch = useDispatch();

  const handlerEditCommit = (e) => {
    const { id, value } = e;
    console.log('id', id);
    console.log('value', value);
    // if (e.value) {
    //   console.log('first');
    //   console.log(e);
    // }
    dispatch(updateStore({ id, value }));
  };

  return (
    <div style={{ height: 300, width: '100%' }}>
      <DataGrid
        rows={recipes}
        columns={columns}
        // experimentalFeatures={{ newEditingApi: true }}
        onCellEditCommit={handlerEditCommit}
        components={{
          Toolbar: GridToolbar,
        }}
        // pageSize={5}
        // rowsPerPageOptions={[5]}
        // checkboxSelection
        // disableSelectionOnClick
      />
    </div>
    // <table className="tableRecipelist" cellSpacing={3} cellPadding={1}>
    //   <tbody>
    //     <tr>
    //       <th className="thRecipeList">Наименование</th>
    //       <th className="thRecipeList">Кол.Мол.Базы на Кг</th>
    //       <th className="thRecipeList">Наличие на складе</th>
    //       <th className="thRecipeList">План производства</th>
    //       <th className="thRecipeList">Итоговое кол. базы</th>
    //     </tr>
    //     {recipes.map((recipe) => (
    //       <RecipeRow key={recipe.id} recipe={recipe} />
    //     ))}
    //   </tbody>
    // </table>
  );
}

export default BaseTable;
