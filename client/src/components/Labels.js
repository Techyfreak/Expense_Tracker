import React from 'react'
import {default as api} from '../store/apiSlice';
import { getLabels } from '../helper/helper';


export default function Labels() {

    const{data, isFetching, isSuccess, isError} = api.useGetLabelsQuery()
    let user;
    if(localStorage.getItem('appUser')) {
    user = JSON.parse(localStorage.getItem('appUser')).username;
    }

    let Transactions;
    
    if(isFetching){
        Transactions = <div>Fetching</div>;
    }else if(isSuccess){
        
        Transactions = getLabels(data.filter(item => item.username === user ),"type").map((v,i)=> <LabelComponents key={i} data={v}/>)
    }else if(isError){
        Transactions = <div>Error</div>
    }
  return (
    <>
    {Transactions}
    </>
  )
}

function LabelComponents({data}){
    if (!data)return<></>
    return(
        <div className="labels flex justify-between">
        <div className='flex gap-2'>
            <div className='w-2 h-2 rounded py-3' style={{backgroundColor:data.color??"#f9c74f"}}></div>
        <h3 className='text-md dark:text-white'>{data.type??""}</h3>
        </div>
        <h3 className='font-bold dark:text-white'>{Math.round(data.percent)??0}%</h3>
        </div>
    )
}
