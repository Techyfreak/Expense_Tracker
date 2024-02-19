import React, { useState, useEffect } from 'react'
import {useForm} from 'react-hook-form'
import List from "./List"
import {default as api} from '../store/apiSlice'


export default function Form() {
    
    // const [currentUser,setCurrentUser] = useState(undefined)
    const {register, handleSubmit, resetField} = useForm();
    const [addTransaction] = api.useAddTransactionMutation();
        
    
    const onSubmit=async(data)=>{
        if(!data) {console.log("no data")};
        if(localStorage.getItem('appUser')){
            const user = JSON.parse(localStorage.getItem('appUser')).username;
            data['username'] = user;
            if(data.type === 'Expenditure'){
                data['color'] = "#9667ab"
            }
            else if(data.type === 'Investment'){
                data['color'] = '#FCBE44'
            }
            else if(data.type==='Savings'){
                data['color'] = '#4b77bf'
            }
            await addTransaction(data).unwrap();
            resetField('name');
            resetField('amount');
        }
    }

  return (
    <div className="form max-w-sm mx-auto w-96">
        <h1 className='font-bold pb-4 text-xl dark:text-white'>Transaction</h1>
        <form id ="form" onSubmit={handleSubmit(onSubmit)}>
            <div className='grid gap-4'>
                <div className='input-group'>
                    <input type="text" {...register('name')} placeholder='Salary,House Rent' style={{width:"100%"}}/>
                </div>
                <select className='form-input' {...register('type')}>
                     <option value="Investment">Investment</option>
                     <option value="Expenditure">Expenditure</option>
                     <option value="Savings">Savings</option>
                </select>
                <div className='input-group'>
                    <input type="text" {...register('amount')} placeholder='Amount' style={{width:"100%"}}/>
                </div>
                <div className="submit-btn">
                    <button className='border py-2 text-white bg-indigo-500 w-full'>Make Transaction</button>
                </div>
            </div>
        </form>
        <List/>
    </div>
  )
}
