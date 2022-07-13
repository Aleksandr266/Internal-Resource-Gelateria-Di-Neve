import React, { useEffect } from 'react';
import { DataGrid, GridToolbar, ruRU } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux';
import { editIngridients, getIngridients } from '../../store/ingridients/reducer';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Ingridients() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { ingridients } = useSelector((state) => state.ingridients);

  const handlerEditCommit = (e) => {
    fetch('/ingridients/editPriceIngridients', {
      method: 'POST',
      body: JSON.stringify({ id: e.row.id, price: e.value }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };

  useEffect(() => {
    dispatch(getIngridients());
  }, [dispatch]);

  const handlerEditCommit = (e) => {
    dispatch(editIngridients(e));
  };

  const columns = [
    {
      field: 'id',
      headerName: 'id',
      type: 'number',
      width: 100,
      maxWidth: 500,
      editable: false,
    },
    {
      field: 'title',
      headerName: 'Ингридиент',
      width: 160,
      maxWidth: 500,
      editable: false,
    },
    {
      field: 'price',
      headerName: 'Цена',
      type: 'number',
      width: 150,
      maxWidth: 500,
      editable: true,
    },
    {
      field: 'fat',
      headerName: 'Содержание жира',
      type: 'number',
      width: 200,
      editable: false,
    },
    {
      field: 'dry_matter',
      headerName: 'Сухая смесь',
      type: 'number',
      width: 200,
      editable: false,
    },
    {
      field: 'dry_milk_remainder',
      headerName: 'Сухое молоко',
      type: 'number',
      width: 200,
      maxWidth: 500,
      editable: false,
    },
    {
      field: 'antifris',
      headerName: 'Антифриз',
      type: 'number',
      width: 150,
      maxWidth: 500,
      editable: false,
    },
    {
      field: 'sugar',
      headerName: 'Сахар',
      type: 'number',
      width: 130,
      maxWidth: 500,
      editable: false,
    },
    {
      field: 'glycemic_index',
      headerName: 'Гликемический индекс',
      type: 'number',
      width: 250,
      maxWidth: 500,
      editable: false,
      hide: true,
    },
  ];

  console.log('ingridients', ingridients);

  return (
    <div>
      <Button
        style={{ marginTop: 10 }}
        onClick={() => navigate('/formAddIngridients')}
        variant="outlined">
        Добавить ингридиент
      </Button>
      {ingridients && (
        <TableContainer style={{ marginTop: 10, height: 500, width: '100%' }} component={Paper}>
          <DataGrid
            rows={ingridients}
            columns={columns}
            disableSelectionOnClick
            localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
            onCellEditCommit={handlerEditCommit}
            components={{
              Toolbar: GridToolbar,
            }}
          />
        </TableContainer>
      )}
    </div>
  );
}

export default Ingridients;
