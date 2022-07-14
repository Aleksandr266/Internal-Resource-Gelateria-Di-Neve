/* eslint-disable operator-linebreak */
import React, { useCallback } from 'react';
import { DataGrid, GridToolbar, ruRU } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { updateStore } from '../../store/recipes/reducer';

import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';
import { loadRecipeById } from '../../store/recipes/reducer';

function BaseTable({ recipes }) {
  const dispatch = useDispatch();

  const handleToggle = useCallback(
    (id) => {
      dispatch(loadRecipeById(id));
    },
    [dispatch],
  );

  const columns = [
    { field: 'id', headerName: 'ID', width: 90, valueGetter: (recipes) => `${recipes.row.id}` },
    {
      field: 'title',
      headerName: 'Наименование',
      width: 250,
      renderCell: (
        recipes, //<Link to={`/recipes/${recipes.row.id}`}>{recipes.row.title}</Link>,
      ) => (
        <div>
          <Button variant="outlined" onClick={() => handleToggle(recipes.row.id)}>
            {recipes.row.title}
          </Button>
        </div>
      ),
    },
    {
      field: 'base_weight',
      headerName: 'Кол.Мол.Базы на Кг',
      width: 150,
      editable: false,
      hide: true,
      valueGetter: (recipes) => `${Math.round(Number(recipes.row.base_weight) * 10) / 100}`,
    },
    {
      field: 'amount',
      headerName: 'Наличие на складе',
      type: 'number',
      width: 150,
      editable: true,
      valueGetter: (recipes) => `${recipes.row.Store.amount}`,
    },
    {
      field: 'standart',
      headerName: 'Стандарт',
      type: 'number',
      width: 150,
      editable: false,
      hide: true,
      valueGetter: (recipes) => `${recipes.row.Store.standart}`,
    },
    {
      field: 'plan',
      headerName: 'План производства',
      type: 'number',
      width: 150,
      editable: true,
      valueGetter: (recipes) => `${recipes.row.Store.plan}`,
    },
    {
      field: 'current_plan',
      headerName: 'В работу',
      type: 'number',
      width: 150,
      editable: false,
      valueGetter: (recipes) =>
        `${
          recipes.row.Store.plan - recipes.row.Store.amount < 0
            ? 0
            : Math.round((recipes.row.Store.plan - recipes.row.Store.amount) * 100) / 100
        }`,
    },
    {
      field: 'total_base',
      headerName: 'Итоговое кол. базы',
      width: 150,
      valueGetter: (recipes) => `${recipes.row.total_base}`,
    },
  ];

  const handlerEditCommit = (e) => {
    const { id, field, value } = e;
    dispatch(updateStore({ id, field, value }));
  };

  return (
    <DataGrid
      rows={recipes}
      columns={columns}
      // experimentalFeatures={{ newEditingApi: true }}
      onCellEditCommit={handlerEditCommit}
      localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
      components={{
        Toolbar: GridToolbar,
      }}
    />
  );
}

export default BaseTable;
