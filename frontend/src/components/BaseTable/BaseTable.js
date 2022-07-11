/* eslint-disable operator-linebreak */
import React from 'react';
import { DataGrid, GridToolbar, ruRU } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateStore } from '../../store/recipes/reducer';

function BaseTable({ recipes }) {
  const dispatch = useDispatch();

  const columns = [
    { field: 'id', headerName: 'ID', width: 90, valueGetter: (recipes) => `${recipes.row.id}` },
    {
      field: 'title',
      headerName: 'Наименование',
      width: 150,
      renderCell: (recipes) => <Link to={`/recipes/${recipes.row.id}`}>{recipes.row.title}</Link>,
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
