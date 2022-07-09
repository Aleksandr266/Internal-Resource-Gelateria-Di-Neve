/* eslint-disable operator-linebreak */
import React from 'react';
import { DataGrid, GridCellEditStopReasons } from '@mui/x-data-grid';
// import { useSelector } from 'react-redux';
import RecipeRow from '../RecipeRow/RecipeRow';
import { Link } from 'react-router-dom';

function BaseTable({ recipes }) {
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

  return (
    <div style={{ height: 300, width: '100%' }}>
      <DataGrid
        rows={recipes}
        columns={columns}
        onCellEditStop={(params, event) => {
          // console.log(params);
          // console.log(event);
          // console.log('params.reason', params.reason);
          if (params.reason === GridCellEditStopReasons.cellFocusOut) {
            // console.log('first');
            event.defaultMuiPrevented = true;
          }
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
