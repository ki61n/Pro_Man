import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

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
        <h1>Learn Project</h1>
        <div className="grid grid-cols-12 gap-2">
            {data.map((r , i)=>(
        <div className="card flex flex-col justify-around max-w-[50rem] gap-5 col-span-4 " key={i}>
            <h2>{r.projectName}</h2>
            <p>project description: <br />{r.projectDescription} </p>
            <button className='btn1' onClick={()=>{navigate(`lprodetails/${r._id}`)}}>view details</button>
        </div>))}
      </div>
    </div>
  )
}

export default Lproject

