/* eslint-disable operator-linebreak */
import React, { useState,useCallback } from 'react';
import { DataGrid, GridToolbar, ruRU } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateStore } from '../../store/recipes/reducer';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';

import Recipe from '../Recipe/Recipe';

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

function BaseTable({ recipes }) {
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = useCallback(() => {
    setOpen(true);
  },[ open ]);

  const handleClose = useCallback(() => {
    setOpen(false);
  },[ open ]);

  const columns = [
    { field: 'id', headerName: 'ID', width: 90, valueGetter: (recipes) => `${recipes.row.id}` },
    {
      field: 'title',
      headerName: 'Наименование',
      width: 150,
      renderCell: (recipes) => //<Link to={`/recipes/${recipes.row.id}`}>{recipes.row.title}</Link>,
      <div>
      <Button variant="outlined" onClick={handleClickOpen}>
      {recipes.row.title}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          Subscribe
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
          <Recipe id={recipes.row.id}/>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </div>
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

export default React.memo(BaseTable);
