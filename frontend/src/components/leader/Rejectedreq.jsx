import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Leadernav from './Leadernav';

function Rejectedreq() {
    const [res, setRes] =useState([]);
    const id=localStorage.getItem('id')
    const navigate=useNavigate()
    useEffect(()=>{
        const requests=async ()=>{
            const response=await axios.get(`http://localhost:3000/viewmemreqByidrej/${id}`);
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
        <div className='mt-19 mx-15'><h1>Leader Request</h1>
        <div className='fullgrid gap-5'>    
            {res.map((r,i)=>(
            <div className='card col-span-3 p-5 rounded-xl bg-linear-to-tl from-red-300 to-red-500' key={i}>
                <div>
                <p>{r.username?.userName || ''}</p>
                <p>{r.task?.task || ''}</p>
                <p>{r.request}</p>
               <p className="mt-2 text-sm italic">{r.status}</p>
                </div>
                <button className='btn1 mb-[auto]'
                onClick={()=>navigate(`/leader/leaderhome/requests/view/${r._id}`)}>view details</button>

            </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default Rejectedreq

