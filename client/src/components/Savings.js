import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { saving_data } from '../helper/helper';
import {default as api} from '../store/apiSlice';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);



const config = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Dataset 1',
        data: [25,48,88,20,96,74,56,22],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }
    ],
    options : {
        responsive: true,
        plugins: {
          legend: {
            position: 'top'
          },
          title: {
            display: true,
            text: 'Chart.js Bar Chart',
          },
        },
      }
  };

export default function Savings() {

    const{data, isFetching, isSuccess, isError} = api.useGetLabelsQuery()
    if(!data) return null
    let savingData;
    
    if(isFetching){
        savingData = <div class="dark:text-white">Fetching</div>;
    }else if(isSuccess && saving_data(data)){
        savingData = <Bar data={saving_data(data)}/>
    }else if(isError){
        savingData = <div class="dark:text-white">Error</div>
    }

  return (
    <div className="chart bg-gray-200 py-3 mx-10 rounded-lg max-w-auto mt-10 shadow-inner">
        <h1 class='py-4 font-bold text-xl'>Savings</h1>
         <div class="mx-10">{savingData}</div> 
      </div>
  )
}
