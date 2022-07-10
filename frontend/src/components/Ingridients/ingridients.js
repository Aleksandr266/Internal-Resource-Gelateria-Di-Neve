import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';

function Ingridients() {
  const [rows, setRows] = useState('');

  useEffect(() => {
    fetch('/ingridients', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setRows(
          res.map((el) => {
            return {
              id: el.id,
              title: el.title,
              price: el['IngridientPrices'][0].price,
              fat: el.fat,
              dry_matter: el.dry_matter,
              dry_milk_remainder: el.dry_milk_remainder,
              antifris: el.antifris,
              sugar: el.sugar,
              glycemic_index: el.glycemic_index,
            };
          }),
        );
      });
  }, []);

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
    <div style={{ height: 500, width: '100%' }}>
      {rows && <DataGrid rows={rows} columns={columns} disableSelectionOnClick />}
    </div>
  );
}

export default Ingridients;
