/* eslint-disable operator-linebreak */
import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
// import { useSelector } from 'react-redux';
// import RecipeRow from '../RecipeRow/RecipeRow';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// функция для изменения market price
// import { addDataPrice } from '../../store/technolog/reducer';

const columns = [
  { field: 'id', headerName: 'ID', width: 90, valueGetter: (recipes) => `${recipes.row.id}` },
  {
    field: 'title',
    headerName: 'Наименование',
    width: 250,
    minWidth: 200,
    maxWidth: 500,
    renderCell: (marketPrice) => <Link to={`/recipes/${marketPrice.row.id}`}>{marketPrice.row.title}</Link>,
  },
  {
    field: 'market_price',
    headerName: 'Рыночная стоимость',
    width: 250,
    minWidth: 200,
    maxWidth: 500,
    editable: true,
    valueGetter: (marketPrice) => `${marketPrice.row.market_price}`, 
  },
  {
    field: 'cost_price',
    headerName: 'Себестоимость',
    type: 'number',
    width: 250,
    minWidth: 200,
    maxWidth: 500,
    editable: false,
    valueGetter: (marketPrice) => `${marketPrice.row.market_price}`, // ИЗМЕНИТЬ!
  },
  {
    field: 'age',
    headerName: 'Коэффициент прибыли',
    type: 'number',
    width: 250,
    minWidth: 200,
    maxWidth: 500,
    editable: false,
    valueGetter: (marketPrice) => `${marketPrice.row.market_price}`, // ИЗМЕНИТЬ!
  },
  {
    field: 'fullName',
    headerName: 'Потери при производстве',
    width: 250,
    minWidth: 200,
    maxWidth: 500,
    // width: 160,
    valueGetter: (marketPrice) => `${marketPrice.row.market_price}`, 
    // valueGetter: (recipes) =>// ИЗМЕНИТЬ!
    //   `${
    //     Math.round(
    //       (Math.round(Number(recipes.row.base_weight) * 10) / 100) *
    //         (recipes.row.Store.standart - recipes.row.Store.amount) *
    //         100,
    //     ) / 100
    //   }`,
  },
];


function BaseTechnologTable({ marketPrice }) { 
  // console.log(marketPrice, 'Это стейт маркет прайс');
  // const dispatch = useDispatch();

  const handlerEditCommit = (e) => {
    const { id, value } = e;
    console.log(e);
    console.log(e.target);
    // console.log('id', id);
    // console.log('value', value);
    // if (e.value) {
    //   console.log('first');
    //   console.log(e);
    // }
    // dispatch(addDataPrice({ id, value }));
  };

  return (
    <div style={{ height: 300, width: '100%' }}>
      <DataGrid
        rows={marketPrice}
        columns={columns}
        // experimentalFeatures={{ newEditingApi: true }}
        onCellEditCommit={handlerEditCommit}
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

export default BaseTechnologTable;
