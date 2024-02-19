import React, { useState } from 'react'
import 'boxicons'
import {default as api} from '../store/apiSlice';


export default function List() {

    const{data, isFetching, isSuccess, isError} = api.useGetLabelsQuery()
    let use;
    if(localStorage.getItem('appUser')) {
    use = JSON.parse(localStorage.getItem('appUser')).username;
     }
    const [deleteTransaction] = api.useDeleteTransactionMutation()

    const handleClick=(e)=>{
        if(!e.target.dataset.id)return 0;
        deleteTransaction({_id:e.target.dataset.id})
    }


    let Transactions;
    if(isFetching){
        Transactions = <div>Fetching</div>;
    }else if(isSuccess){
        Transactions = data.filter(item => item.username === use ).map((v,i)=><Transaction key={i} category={v} handler={handleClick}/>)
    }else if(isError){
        Transactions = <div>Error</div>
    }

   
  return (
    <div className="flex flex-col py-6 gap-3">
        <h1 className='py-4 font-bold text-xl dark:text-white'>Histroy</h1>
        {Transactions}
    </div>
  )
}

function Transaction({category,handler}){
    if(!category)return null;
    return(
        <div className='item flex justify-center bg-gray-50 py-3 rounded-r' style={{borderRight:`8px solid ${category.color??"#e5e5e5"}`}}>
            <button className='px-3' onClick={handler}><box-icon data-id={category._id??""} color={category.color??"#e5e5e5"} size="20px" name="trash"></box-icon></button>
            <span className='block w-full'>{category.name??""}</span>
        </div>
    )
}