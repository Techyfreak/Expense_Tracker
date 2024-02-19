import React from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import {default as api} from '../store/apiSlice';
import {Line} from 'react-chartjs-2'
import {expenditure_data} from '../helper/helper'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );


//const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
const config = {
    labels :  ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Dataset 1',
        data: [25,48,88,20,96,74,56,22],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
     },
    //   {
    //     label: 'Dataset 2',
    //     data: [44,55,36,7,88,45,63,55,63],
    //     borderColor: 'rgb(53, 162, 235)',
    //     backgroundColor: 'rgba(53, 162, 235, 0.5)',
    //   },
    ],
  
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: (ctx) => 'Point Style: ' + ctx.chart.data.datasets[0].pointStyle,
        }
      }
    }
};
  

export default function Expenditure() {

    const{data, isFetching, isSuccess, isError} = api.useGetLabelsQuery()
    if(!data) return null

    let expenditureData;
    
    if(isFetching){
        expenditureData = <div class="dark:text-white">Fetching</div>;
    }else if(isSuccess && expenditure_data(data)){
        expenditureData = <Line data={expenditure_data(data)}/>
    }else if(isError){
        expenditureData = <div class="dark:text-white">Error</div>
    }

  return (
    <div className="chart bg-gray-200 py-3 mx-10 rounded-lg max-w-auto mt-10 shadow-inner">
    <h1 class='py-4 font-bold text-xl '>Expenditure</h1>
    <div class="mx-10">{expenditureData}</div>
    </div>
  )
}
