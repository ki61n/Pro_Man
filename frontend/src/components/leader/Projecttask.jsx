import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Leadernav from './Leadernav';

function Projecttask() {
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
       <div className='mt-19 mx-15'>
         <h1 className='text-5xl ml-5 my-5'>Learn Project</h1>
        <div className="grid grid-cols-12 gap-2 ">
            {data.map((r , i)=>(
        <div className="card flex flex-col justify-around max-w-[50rem] gap-5 col-span-4 bg-linear-to-bl from-purple-500 to-pink-400 p-5 rounded-3xl " key={i}>
            <h2>{r.projectName}</h2>
            <p>project description: <br />{r.projectDescription} </p>
            <button className='btn1' onClick={()=>{navigate(`/leader/leaderhome/project_task/projectmembers/${r._id}`)}}>view details</button>
        </div>))}
      </div>
       </div>
    </div>
  )
}

export default Projecttask

