// import axios from 'axios';
// import { useEffect } from 'react';
// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Leadernav from './Leadernav';

// function Leadereq() {
//     const [res, setRes] =useState([]);
//     const [noRequests, setNoRequests] = useState(false);
//     const id=localStorage.getItem('id')
//     const navigate=useNavigate()
//     useEffect(()=>{
//         const requests=async ()=>{
//             const response=await axios.get(`http://localhost:3000/viewmemreqByidstat/${id}`);
//             setRes(response.data)
//             console.log(response.data);
//             if(response.data.length===0){
//               setNoRequests(true);
            
//         }}
//         requests();
//     },[])

//   return (
//     <div>
//          <div className='navclass'>
//         <Leadernav />
//       </div>
//         <h1>Leader Request</h1>
//         {noRequests && <p className="text-red-500">No pending requests</p>}
//         <div className='fullgrid'>    
//             {res.map((r,i)=>(
//             <div className='card col-span-2' key={i}>
//                 <div>
//                 <p>{r.username?.userName || ''}</p>
//                 <p>{r.task?.task || ''}</p>
//                 <p>{r.request}</p>
//                 </div>
//                 <button className='btn1 mb-[auto]'
//                 onClick={()=>navigate(`/leader/leaderhome/requests/replay/${r._id}`)}>Respond</button>

//             </div>
//             ))}
//         </div>
      
//     </div>
//   )
// }

// export default Leadereq

import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Leadernav from './Leadernav';

function Leadereq() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const id = localStorage.getItem('id');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/viewmemreqByidstat/${id}`);
        setRequests(response.data || []);
      } catch (err) {
        console.error("Error fetching requests:", err);
        setError("Failed to load requests. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [id]);

  return (
    <div>
      <div className="navclass">
        <Leadernav />
      </div>
<div className='mt-19 mx-15'>
      <h1 className="text-2xl font-bold my-5">Leader Requests</h1>

      {loading && <p className="text-gray-500">Loading requests...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && requests.length === 0 && (
        <p className="text-red-500">No pending requests</p>
      )}

      <div className="fullgrid gap-5">
        {requests.map((r, i) => (
          <div
            className="card col-span-3 p-5 rounded-xl bg-linear-to-tl from-purple-300 to-blue-500 flex flex-col justify-between"
            key={i}
          >
            <div>
              <p><strong>From:</strong> {r.username?.userName || 'Unknown'}</p>
              <p><strong>Task:</strong> {r.task?.task || 'N/A'}</p>
              <p><strong>Request:</strong> {r.request}</p>
            </div>
            <button
              className="btn1 mt-3 self-end"
              onClick={() => navigate(`/leader/leaderhome/requests/replay/${r._id}`)}
            >
              Respond
            </button>
          </div>
        ))}
      </div></div>
    </div>
  );
}

export default Leadereq;
