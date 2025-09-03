import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Leadernav from './Leadernav';

function Lproject() {
    const id=localStorage.getItem('id')
    // console.log('id :',id);
    const[data,setData]=useState([])
    const navigate=useNavigate()
    useEffect(()=>{
        const projects=async ()=>{
            try{
            const responce=await axios.get(`http://localhost:3000/pname/${id}`)
            setData(responce.data)
            console.log(responce.data);
            }catch(error){
                console.log(error);
            }
            
        }
        projects()
    },[])
  return (
    <div>
       <div className='navclass'>
        <Leadernav />
      </div>
        <div className="grid grid-cols-12 gap-2 mx-5 sm:mx-12 sm:mt-20 mb-5">
                  <h1 className='text-2xl sm:text-5xl lg:col-start-5 font-bold col-span-11 col-start-2 p-5'>Leader Project</h1>

            {data.map((r , i)=>(
        <div className="card bg-linear-to-br from-blue-300 to-purple-500 flex flex-col justify-around  gap-5 col-span-12 lg:col-span-4 sm:col-span-6 rounded-2xl p-5 shadow-2xl hover:shadow-purple-400" key={i}>
            <h2 className=' text-3xl font-sans '>{r.projectName}</h2>
            <p className='overflow-scroll h-29 scrollbar-hide ' >project description: <br /><span className=''>{r.projectDescription}</span> </p>
            <div className=' gap-5 flex w-full bg-purple-300 p-2 rounded-lg justify-end'>
            <button className='btn1 hover:scale-105 hover:bg-purple-200 duration-300' onClick={()=>{navigate(`lprodetails/${r._id}`)}}>view details</button>
            <button className='btn1  hover:scale-105 hover:bg-purple-200 duration-300 hover:text-blue-700' onClick={()=>{navigate(`request/${r._id}`)}}> Request</button>
            </div>

        </div>))}
      </div>
    </div>
  )
}

export default Lproject

