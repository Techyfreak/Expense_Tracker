import React,{useEffect} from 'react'
import Graph from '../components/Graph'
import Form from '../components/Form'
import { useNavigate } from 'react-router-dom'


export default function Main() {
  const navigate = useNavigate();
  useEffect(() => {
  if(!localStorage.getItem('appUser')) {
    navigate("/")
  }
}, [])
  return (
    <div className="grid md:grid-cols-2 gap-4">
        <Graph/>
        <Form/>
      </div> 
  )
}
