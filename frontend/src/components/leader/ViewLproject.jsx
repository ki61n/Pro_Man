import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Leadernav from './Leadernav';

function ViewLproject() {
   const {id}=useParams()
   console.log(id);
   const [data,setData]=useState({})
   const navigate=useNavigate()
   useEffect(()=>{
    const fetchData=async()=>{
        try{
        const response=await axios.get(`http://localhost:3000/viewproject/${id}`)
        setData(response.data)
        console.log(response.data);
         

    }
    catch(error){
        console.error(error);
    }
}
fetchData()
   },[])
  return (
    <div>
       <div className='navclass'>
        <Leadernav />
      </div >
      <div className='sm:mt-19 my-5 grid grid-cols-12 gap-5 sm:mx-12 sm:my-25 mx-2'><div className='col-span-12'><h1 className='bg-red-400 h-25 rounded-2xl  flex justify-center items-center text-5xl'>{data.projectName}</h1></div>
      <p className='col-span-12 sm:col-span-7 bg-blue-400 row-span-3 h-[60vh] rounded-2xl p-4 overflow-scroll scrollbar-hide'>discription: <br /><span className='m-3'> {data.projectDescription}</span></p>
      <p className='sm:col-start-8 sm:col-span-5 col-span-7 bg-amber-300 rounded-2xl p-4 flex justify-center items-center'><span className=''>due date: {data.dueDate}</span></p>
      <p className='sm:col-start-8 col-span-5 bg-emerald-300 rounded-2xl p-4 flex justify-center items-center'><span>maximum members allowed: {data.maxMembers}</span></p>
      <p className='col-span-12 sm:col-start-8 sm:col-span-5 bg-fuchsia-400 rounded-2xl p-4 flex  justify-between'><span>status : </span><button className='btn1'>on work</button> <button className='btn1'>completed</button> </p>
      <button className='btn1 col-span-7 h-20' onClick={()=>{navigate(`addteam/${id}`)}}>add members</button>
      <button className='btn1 col-span-5' onClick={()=>{navigate(`updateteam/${id}`)}}>update members
      </button></div>
    </div>
  )
}

export default ViewLproject
