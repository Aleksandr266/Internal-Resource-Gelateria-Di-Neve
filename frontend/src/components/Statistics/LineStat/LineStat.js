import React from 'react';
import 'chart.js/auto';

import { DataGrid, GridToolbar, ruRU } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux';
import { loadMarketPrice } from '../../../store/boss/reducer';

import { Line } from "react-chartjs-2";



function LineStat() {
  const { marketPrice, marketPriceTable } = useSelector((state) => state.boss);
  const dispatch = useDispatch();

console.log(marketPriceTable, 'sssssssdddddsssssss');

const data = {
  labels: marketPrice.title,
  datasets: [
    {
      label: "Прайс",
      data: marketPrice.market_price,
      fill: true,
      borderColor: "rgba(245,194,219,1)",
      backgroundColor: 'rgba(245,194,219,0.6)',
     
    },
    {
      label: "Себестоимость",
      data: marketPrice.cost_price,
      fill: true,
      borderColor: 'rgba(203,52,57,1)',
      backgroundColor: "rgba(203,52,57,0.6)",
    },
    {
      label: "Коэффициент Прибыли",
      data:  marketPrice.profitPercentage,
      fill: true,
      borderColor: 'rgba(153,0,0,1)',
      backgroundColor: "rgba(153,0,0,0.6)",
    }
  ]
};

const columns = [
  {
    field: 'id',
    headerName: 'id',
    type: 'number',
    width: 100,
    maxWidth: 500,
    editable: false,
    hide: true,
  
  },
  {
    field: 'title',
    headerName: 'Наименование',
    width: 180,
    editable: false,
    // hide: true,

  },
  {
    field: 'market_price',
    headerName: 'Прайс',
    width: 180,
    editable: false,
  }
  ,
  {
    field: 'cost_price',
    headerName: 'Себестоимость',
    width: 180,
    editable: false,
  }
  ,
  {
    field: 'profit',
    headerName: 'Коэффициент Прибыли',
    width: 180,
    editable: false,
  }
];



  React.useEffect(() => {
    dispatch(loadMarketPrice());
  }, [dispatch]);

  return (
    <>
    <div style={{ width: '100%', height: "auto", marginTop: '3%', }}>
      <Line data={data} />
    </div>
    <DataGrid style={{height: "690px", width: "750px", marginTop: '50px'}}
      rows={marketPriceTable}
      columns={columns}
      // experimentalFeatures={{ newEditingApi: true }}
      localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
      components={{
        Toolbar: GridToolbar,
      }}
    />
    </>
  );
}

export default LineStat;
