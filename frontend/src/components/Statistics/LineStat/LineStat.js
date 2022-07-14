import React from 'react';
import 'chart.js/auto';
// import { Chat as ChatJS, Title,Tooltip,LineElement,Legend } from 'chart.js';
// ChartJs.register(
//   Title, Tooltip, LineElement, Legend, Line, LineElement
// )
import { useSelector, useDispatch } from 'react-redux';
import { loadMarketPrice } from '../../../store/boss/reducer';

import { Line } from "react-chartjs-2";

// const data = {
//   labels: ["Пломбир", "Лимон", "Шоколад", "Лайм", "Манго", "Тирамиссу"],
//   datasets: [
//     {
//       label: "Прайс",
//       data: marketPrice.title,
//       fill: true,
//       borderColor: "rgba(245,194,219,1)",
//       backgroundColor: 'rgba(245,194,219,0.6)',
     
//     },
//     {
//       label: "Себестоимость",
//       data: [23, 45, 65, 31, 24, 60],
//       fill: true,
//       borderColor: 'rgba(203,52,57,1)',
//       backgroundColor: "rgba(203,52,57,0.6)",
//     }
//   ]
// };

function LineStat() {
  const { marketPrice } = useSelector((state) => state.boss);
  const dispatch = useDispatch();

  

console.log(marketPrice, 111111111111111111111)

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
    }
  ]
};



  React.useEffect(() => {
    dispatch(loadMarketPrice());
  }, [dispatch]);

  return (
    <div style={{ width: '80%', height: '80%', marginTop: '3%', }}>
      <Line data={data} />
    </div>
  );
}

export default LineStat;
