/* eslint-disable operator-linebreak */
import React from 'react';
import { DataGrid, GridToolbar, ruRU } from '@mui/x-data-grid';
// import { useSelector } from 'react-redux';
// import RecipeRow from '../RecipeRow/RecipeRow';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { changeMarketPrice, changeStandartStore } from '../../store/technolog/reducer';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';

// функция для изменения market price
// import { addDataPrice } from '../../store/technolog/reducer';

const columns = [
  { field: 'id', headerName: 'ID', width: 90, valueGetter: (recipes) => `${recipes.row.id}` },
  {
    field: 'title',
    headerName: 'Наименование',
    width: 215,
    minWidth: 200,
    maxWidth: 500,
    valueGetter: (marketPrice) => `${marketPrice.row.title}`,
  },
  {
    field: 'market_price',
    headerName: 'Рыночная стоимость',
    width: 215,
    minWidth: 200,
    maxWidth: 500,
    editable: true,
    valueGetter: (marketPrice) => `${marketPrice.row.market_price}`,
  },
  {
    field: 'cost_price',
    headerName: 'Себестоимость',
    type: 'number',
    width: 215,
    minWidth: 200,
    maxWidth: 500,
    editable: false,
    valueGetter: (marketPrice) => `${marketPrice.row.cost_price}`,
  },
  {
    field: 'age',
    headerName: 'Коэффициент прибыли',
    type: 'number',
    width: 215,
    minWidth: 200,
    maxWidth: 500,
    editable: false,
    valueGetter: (marketPrice) =>
      `${(marketPrice.row.market_price / marketPrice.row.cost_price).toFixed(2)}`,
  },
  {
    field: 'standartStore',
    headerName: 'Стандарт наличия',
    width: 215,
    minWidth: 200,
    maxWidth: 500,
    editable: true,
    // width: 160,
    valueGetter: (marketPrice) => `${marketPrice.row.standart_store}`,
  },
  {
    field: 'fullName',
    headerName: 'Потери при производстве',
    width: 215,
    minWidth: 200,
    maxWidth: 500,
    // width: 160,
    valueGetter: (marketPrice) =>
      `${Math.round(-1 * (marketPrice.row.production_losses * 100) * 10) / 10}%`,
  },
];

function BaseTechnologTable({ marketPrice }) {
  const dispatch = useDispatch();
  // console.log(marketPrice, 'Это стейт маркет прайс');
  // const dispatch = useDispatch();

  const handlerEditCommit = (e) => {
    if (e.field === 'market_price') {
      const { id, value } = e;
      dispatch(changeMarketPrice({ id, value }));
    }
    if (e.field === 'standartStore') {
      const { id, value } = e;
      console.log(id, value);
      dispatch(changeStandartStore({ id, value }));
    }
  };

  return (
    <div>
      <TableContainer style={{ height: 400, width: '100%' }} component={Paper}>
        <DataGrid
          rows={marketPrice}
          columns={columns}
          // experimentalFeatures={{ newEditingApi: true }}
          onCellEditCommit={handlerEditCommit}
          localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
          components={{
            Toolbar: GridToolbar,
          }}
          pageSize="5"
          // pageSize={5}
          // rowsPerPageOptions={[5]}
          // checkboxSelection
          // disableSelectionOnClick
        />
      </TableContainer>
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

export default BaseTechnologTable;
