import React, { useEffect } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux';
import { editIngridient } from '../../store/ingridients/reducer'

function Ingridients() {
  
  const dispatch = useDispatch();
  const { ingridients } = useSelector((state) => state.ingridients)

  useEffect(() => {
    dispatch(editIngridient())
  }, [])

  const columns = [
    {
      field: 'id',
      headerName: 'id',
      type: 'number',
      width: 100,
      maxWidth: 500,
      editable: true,
    },
    {
      field: 'title',
      headerName: 'Ингридиент',
      width: 160,
      maxWidth: 500,
      editable: true,
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
      editable: true,
    },
    {
      field: 'dry_matter',
      headerName: 'Сухая смесь',
      type: 'number',
      width: 200,
      editable: true,
    },
    {
      field: 'dry_milk_remainder',
      headerName: 'Сухое молоко',
      type: 'number',
      width: 200,
      maxWidth: 500,      
      editable: true,
    },
    {
      field: 'antifris',
      headerName: 'Антифриз',
      type: 'number',
      width: 150,
      maxWidth: 500,
      editable: true,
    },
    {
      field: 'sugar',
      headerName: 'Сахар',
      type: 'number',
      width: 130,
      maxWidth: 500,      
      editable: true,
    },
    {
      field: 'glycemic_index',
      headerName: 'Гликемический индекс',
      type: 'number',
      width: 250,
      maxWidth: 500,      
      editable: true,
    },
  ];

  return (
    <div style={{ marginTop: 20, height: 500, width: '100%' }}>
      { ingridients &&
      <DataGrid
        rows={ingridients}
        columns={columns}
        disableSelectionOnClick
        components={{
          Toolbar: GridToolbar,
        }}
      />
      }
    </div>
  )
}

export default Ingridients;
