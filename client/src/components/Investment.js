import React from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Colors
} from 'chart.js';

import { PolarArea } from 'react-chartjs-2';
import { investment_data } from '../helper/helper';
import {default as api} from '../store/apiSlice';

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend,Colors);

export const config = {
    labels: ['Red','Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: '# of Votes',
        data: [12,3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
          'rgba(255, 159, 64, 0.5)',
        ],
        borderWidth: 0.5,
      },
    ],
  };

export default function Investment() {
    const{data, isFetching, isSuccess, isError} = api.useGetLabelsQuery()
    if(!data) return null

    let investData;
    
    if(isFetching){
        investData = <div class="dark:text-white">Fetching</div>;
    }else if(isSuccess && investment_data(data)){
        investData = <PolarArea data={investment_data(data)}/>
    }else if(isError){
        investData = <div class="dark:text-white">Error</div>
    }
  return (
    <div className="chart bg-gray-200 py-3 mx-10 rounded-lg max-w-auto mt-10 shadow-inner">
        <h1 class='py-4 font-bold text-xl '>Investment</h1>
    <div class="mx-10">{investData}</div>
    </div>
  )
}
