import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

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
      <h1>{data.projectName}</h1>
      <p>discription: {data.projectDescription}</p>
      <p>due date: {data.dueDate}</p>
      <p>maximum members allowed: {data.maxMembers}</p>
      <p>status : <button className='btn1'>on work</button> <button className='btn1'>completed</button> </p>
      <button className='btn1 ' onClick={()=>{navigate(`addteam/${id}`)}}>add members</button>
      <button className='btn1' onClick={()=>{navigate(`updateteam/${id}`)}}>update members
      </button>
    </div>
  )
}

export default ViewLproject
