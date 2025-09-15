import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Leadernav from './Leadernav';

function  Acceptedreq() {
    const [res, setRes] =useState([]);
    const id=localStorage.getItem('id')
    const navigate=useNavigate()
    useEffect(()=>{
        const requests=async ()=>{
            const response=await axios.get(`http://localhost:3000/viewmemreqByidacc/${id}`);
            setRes(response.data)
            console.log(response.data);
            
        }
        requests();
    },[])
  return (
    <div>
         <div className='navclass'>
        <Leadernav />
      </div>
        <h1>Leader Request</h1>
        <div className='mt-19 mx-10'><div className='fullgrid'>    
            {res.map((r,i)=>(
            <div className='card col-span-3 p-5 rounded-xl bg-linear-to-tl from-green-300 to-green-500' key={i}>
                <div>
                <p>{r.username?.userName || ''}</p>
                <p>{r.task?.task || ''}</p>
                <p>{r.request}</p>
                </div>
                <button className='btn1 mb-[auto]'
                onClick={()=>navigate(`/leader/leaderhome/requests/view/${r._id}`)}>view details</button>

            </div>
            ))}
        </div></div>
      
    </div>
  )
}

export default Acceptedreq

