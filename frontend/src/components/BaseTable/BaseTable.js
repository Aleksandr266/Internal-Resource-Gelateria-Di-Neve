/* eslint-disable operator-linebreak */
import React, { useCallback } from 'react';
import { DataGrid, GridToolbar, ruRU } from '@mui/x-data-grid';
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
import { toggleRecipe } from '../../store/recipes/reducer';

import Recipe from '../Recipe/Recipe';

function PaperComponent(props) {
  return (
    <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}

function BaseTable({ recipes }) {
  const dispatch = useDispatch();

  const handleToggle = useCallback(
    (id) => {
      dispatch(toggleRecipe(id));
    },
    [dispatch],
  );

  // const handleClose = useCallback((id) => {
  //   dispatch(toggleRecipe(id));
  // }, []);

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
          <Dialog
            open={recipes.row.isOpen}
            onClose={() => handleToggle(recipes.row.id)}
            PaperComponent={PaperComponent}
            aria-labelledby="draggable-dialog-title">
            <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
              Subscribe
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                <Recipe
                  style={{ cursor: 'move' }}
                  id="draggable-dialog-title"
                  recipeId={recipes.row.id}
                />
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button autoFocus onClick={() => handleToggle(recipes.row.id)}>
                Cancel
              </Button>
              <Button onClick={() => handleToggle(recipes.row.id)}>Subscribe</Button>
            </DialogActions>
          </Dialog>
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
