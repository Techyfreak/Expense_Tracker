import React, {useEffect} from 'react'
import Expenditure from '../components/Expenditure'
import Investment from '../components/Investment'
import PieChart from '../components/PieChart'
import Savings from '../components/Savings'
import { useNavigate } from 'react-router-dom'


export default function Analysis() {
  const navigate = useNavigate();
  useEffect(() => {
  if(!localStorage.getItem('appUser')) {
    navigate("/")
  }
}, [])
  return (
    <div className="grid md:grid-cols-2 gap-1 ">
        <Expenditure/>
        <Savings/>
        <Investment/>
        <PieChart/>
    </div>
  )
}
