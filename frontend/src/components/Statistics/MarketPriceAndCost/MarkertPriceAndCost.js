import React from 'react';
import 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2';

const data = {
  labales: [
    "Red", "Green", "Yellow", "Blue", "Purple", "Orange", 
  ],
  datasets: [{
    data: [12, 19, 3, 5, 2, 3],
    backgroundColor: [
      'rgb(255,255,204)',
      'rgb(255,204,204)',
      'rgb(204,153,255)',
      'rgb(153,204,255)',
      'rgb(153,204,204)',
      'rgb(204,255,153)',
    
      
    ]
  }]
}

function MarkertPriceAndCost() {
  return (
    <div>
      Отчет по продажам:
      <div style={{width: '750px'}}>
     <Doughnut data={data}/>
     </div>
    </div>
  );
}

export default MarkertPriceAndCost;
