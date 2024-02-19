import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import {default as api} from '../store/apiSlice';
import {Pie} from 'react-chartjs-2'
import { Piechart_data} from '../helper/helper';

ChartJS.register(ArcElement, Tooltip, Legend);


export default function PieChart() {
    const{data, isFetching, isSuccess, isError} = api.useGetLabelsQuery()
    let pieData;
    
    if(isFetching){
        pieData = <div>Fetching</div>;
    }else if(isSuccess){
        pieData = <Pie {...Piechart_data(data)}/>
    }else if(isError){
        pieData = <div>Error</div>
    }
  return (
    <div className="chart bg-gray-200 py-3 mx-10 rounded-lg max-w-auto mt-10 shadow-inner">
        <h1 class='py-4 font-bold text-xl'>Total</h1>
        <div class="mx-10">{pieData}</div> 
    </div>
  )
}
