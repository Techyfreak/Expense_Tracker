import React, {useEffect} from 'react'
import {Chart,ArcElement} from 'chart.js'
import {default as api} from '../store/apiSlice';
import {Doughnut} from 'react-chartjs-2'
import Labels from './Labels'
import { chart_data, getTotal } from '../helper/helper';
import { useNavigate } from 'react-router-dom';
import loader from '../Assets/loader.gif';

Chart.register(ArcElement);


export default function Graph() {
    
    const navigate = useNavigate();
    const{data, isFetching, isSuccess, isError} = api.useGetLabelsQuery()
    let user;
    let values;
    if(!localStorage.getItem('appUser')) {
        navigate("/")
    }else{
        user = JSON.parse(localStorage.getItem('appUser')).username;
    }
    if(data){
        values = data.filter(item => item.username === user );
    }
    
    
    let graphData;
    
    if(isFetching){
        graphData = " ";
    }else if(isSuccess){
        graphData = <Doughnut {...chart_data(data.filter(item => item.username === user ))}/>
    }else if(isError){
        graphData = <div>Error</div>
    }
  return (

    <div className='flex justify-content max-w-xs mx-auto'>
        <div className="item">
            <div className="chart relative">
               {graphData}
                <h3 className='title mb-4 font-bold dark:text-white' style={{
                    position:"absolute",
                    left:"0",
                    right: "0",
                    top: "40%",
                    marginLeft: "auto",
                    marginRight: "auto",
                    }}>Total
                <span className='block text-3xl text-emerald-400'>₹{getTotal(values)??0}</span>
                </h3>
            </div>
            <div className='flex flex-col py-10 gap-4 '>
                <Labels/>
            </div>
        </div>
    </div>
  )
}
