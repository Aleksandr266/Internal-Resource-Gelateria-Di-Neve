/* eslint-disable operator-linebreak */
import React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateStore } from '../../store/recipes/reducer';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  display: 'flex',
  flexDirection: 'column',
  height: 400,
  flexGrow: 3,
}));

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
    valueGetter: (recipes) => `${recipes.row.base_weight}`,
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
    field: 'age',
    headerName: 'План производства',
    type: 'number',
    width: 150,
    editable: true,
    valueGetter: (recipes) => `${recipes.row.Store.standart - recipes.row.Store.amount}`,
  },
  {
    field: 'fullName',
    headerName: 'Итоговое кол. базы',
    width: 150,
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
    dispatch(updateStore({ id, value }));
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={6} md={8}>
        <Item>
          <DataGrid
            rows={recipes}
            columns={columns}
            // experimentalFeatures={{ newEditingApi: true }}
            onCellEditCommit={handlerEditCommit}
            components={{
              Toolbar: GridToolbar,
            }}
          />
        </Item>
      </Grid>
    </Grid>
  );
}

export default BaseTable;
