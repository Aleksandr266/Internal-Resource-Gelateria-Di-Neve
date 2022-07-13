import React from 'react';
import 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2';
import { DataGrid, GridToolbar, ruRU } from '@mui/x-data-grid';
import Button from '@mui/material/Button';

import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import { useSelector, useDispatch } from 'react-redux';
import { loadProductionVolume } from '../../../store/boss/reducer';


function MarkertPriceAndCost() {
  const { productionVolume } = useSelector((state) => state.boss);
  const dispatch = useDispatch();

  const [period, setPeriod] = React.useState(false)

  console.log(productionVolume)

  const data = {
    labels: productionVolume.title,
    datasets: [{
      data: productionVolume.allTime,
      backgroundColor: [
        "rgba(255,255,153,0.7)",
        "rgba(255,204,102,0.7)",
        "rgba(255,153,0,0.7)",
        "rgba(255,204,153,0.7)",
        "rgba(255,102,51,0.7)",
        "rgba(255,204,204,0.7)",
        "rgba(204,0,51,0.7)",
        "rgba(204,153,153,0.7)",
        "rgba(255,102,153,0.7)",
        "rgba(255,153,204,0.7)",
        "rgba(255,102,204,0.7)",
        "rgba(255,204,255,0.7)",
        "rgba(204,153,204,0.7)",
        "rgba(204,102,255,0.7)",
        "rgba(153,102,204,0.7)",
        "rgba(204,204,255,0.7)",
        "rgba(153,153,204,0.7)",
        "rgba(51,51,255,0.7)",
        "rgba(102,153,255,0.7)",
        "rgba(0,102,255,0.7)",
        "rgba(153,204,255,0.7)",
        "rgba(102,204,255,0.7)",
        "rgba(153,204,204,0.7)",
        "rgba(204,255,255,0.7)",
        "rgba(153,255,204,0.7)",
        "rgba(102,204,153,0.7)",
        "rgba(102,255,153,0.7)",
        "rgba(153,255,153,0.7)",
        "rgba(204,255,204,0.7)",
        "rgba(204,255,102,0.7)",
      ],
      hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"]
    }
  ],
  plugins: {
    labels: {
      render: "percentage",
      fontColor: ["green", "white", "red"],
      precision: 2
    },
  },
   text: "23%",
  }


  const data2 = {
    labels: productionVolume.title,
    datasets: [{
      data: productionVolume.month,
      backgroundColor: [
        "rgba(255,255,153,0.7)",
        "rgba(255,204,102,0.7)",
        "rgba(255,153,0,0.7)",
        "rgba(255,204,153,0.7)",
        "rgba(255,102,51,0.7)",
        "rgba(255,204,204,0.7)",
        "rgba(204,0,51,0.7)",
        "rgba(204,153,153,0.7)",
        "rgba(255,102,153,0.7)",
        "rgba(255,153,204,0.7)",
        "rgba(255,102,204,0.7)",
        "rgba(255,204,255,0.7)",
        "rgba(204,153,204,0.7)",
        "rgba(204,102,255,0.7)",
        "rgba(153,102,204,0.7)",
        "rgba(204,204,255,0.7)",
        "rgba(153,153,204,0.7)",
        "rgba(51,51,255,0.7)",
        "rgba(102,153,255,0.7)",
        "rgba(0,102,255,0.7)",
        "rgba(153,204,255,0.7)",
        "rgba(102,204,255,0.7)",
        "rgba(153,204,204,0.7)",
        "rgba(204,255,255,0.7)",
        "rgba(153,255,204,0.7)",
        "rgba(102,204,153,0.7)",
        "rgba(102,255,153,0.7)",
        "rgba(153,255,153,0.7)",
        "rgba(204,255,204,0.7)",
        "rgba(204,255,102,0.7)",
      ],
      hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"]
    }
  ],
  plugins: {
    labels: {
      render: "percentage",
      fontColor: ["green", "white", "red"],
      precision: 2
    },
  },
   text: "23%",
  }

  const columns = [
    { field: 'id', headerName: 'ID', width: 90, },
 
    {
      field: 'title',
      headerName: 'Наименование',
      width: 150,
      editable: false,
      hide: true,
      valueGetter: (productionVolume) => `${productionVolume.row.title}`,
    },
    {
      field: 'allTime',
      headerName: 'Произведено за период',
      type: 'number',
      width: 150,
      editable: true,
      valueGetter: (productionVolume) => period ? `${productionVolume.row.month}` : productionVolume.allTime ,
    }
  ];

  function handleChange() {
    setPeriod(!period)
  }
 
  console.log(period)

  React.useEffect(() => {
    dispatch(loadProductionVolume());
  }, [dispatch]);
  return (
    <>
      {period  ? 
      <div style={{width: '50%', height: '60%', marginLeft: '4%'}}>
     <Doughnut data={data}
     options={{
            
      elements: {
        
        center: {
          legend: { display: true, position: "right" },
          text: "Red is 2/3 the total numbers",
          color: "#FF6384", // Default is #000000
          fontStyle: "Arial", // Default is Arial
          sidePadding: 20, // Default is 20 (as a percentage)
          minFontSize: 20, // Default is 20 (in px), set to false and text will not wrap.
          lineHeight: 25 // Default is 25 (in px), used for when text wraps
        }
      },
      
    }}/>
     </div> 
     : <div style={{width: '50%', height: '60%', marginLeft: '4%'}}>
     <Doughnut data={data2}
     options={{
            
      elements: {
        
        center: {
          legend: { display: true, position: "right" },
          text: "Red is 2/3 the total numbers",
          color: "#FF6384", // Default is #000000
          fontStyle: "Arial", // Default is Arial
          sidePadding: 20, // Default is 20 (as a percentage)
          minFontSize: 20, // Default is 20 (in px), set to false and text will not wrap.
          lineHeight: 25 // Default is 25 (in px), used for when text wraps
        }
      },
      
    }}/>
     </div> }
  
     <FormControl component="fieldset">
      <FormLabel component="legend"> 	&#9668; За месяц  </FormLabel>
      <FormGroup aria-label="position" row>
        <FormControlLabel
          value="bottom"
          control={<Switch color="primary" 
          checked={period} 
          onChange={() => handleChange()}
          />}
          label="За год &#9658;"
          labelPlacement="bottom"
        />
  
      </FormGroup>
    </FormControl>

    <DataGrid
      rows={productionVolume}
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

export default MarkertPriceAndCost;
