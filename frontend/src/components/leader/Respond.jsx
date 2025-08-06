// import axios from 'axios';
// import React, { useEffect, useState } from 'react'
// import { useNavigate, useParams } from 'react-router-dom';

// function Respond() {
//     const[response,setResponse]=useState({})
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const [respond, setRespond] = useState({});
//     useEffect(() => {
//         const fetchResponse = async () => {
//             try {
//                 const res = await axios.get(`http://localhost:3000/viewmemreqByid/${id}`);
//                 setResponse(res.data);
//                 console.log(res.data);
//             } catch (error) {
//                 console.error('Error fetching response:', error);
           
//         }}
//         fetchResponse();
//         }, [id]);
//   return (
//     <div>
//         <h1>Respond</h1>
//       <div className='formcss'>

//     <h2>project 
//         {response.task?.task || ''}</h2>
//         <p>{response.teamleader}</p>
//       </div>

//     </div>
//   )
// }

// export default Respond



// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';

// function Respond() {
//   const [response, setResponse] = useState(null);
//   const { id } = useParams();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchResponse = async () => {
//       try {
//         const res = await axios.get(`http://localhost:3000/viewmemreqByid/${id}`);
//         if (Array.isArray(res.data) && res.data.length > 0) {
//           setResponse(res.data[0]); // get the first item
//         }
//         console.log(res.data);
//       } catch (error) {
//         console.error('Error fetching response:', error);
//       }
//     };
//     fetchResponse();
//   }, [id]);

//   if (!response) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h1>Respond</h1>
//       <div className="formcss">
//         <h2>User: {response.username?.userName}</h2>
//         <p><strong>Request:</strong> {response.request}</p>
//         <p><strong>Status:</strong> {response.status}</p>
//         <p><strong>Task:</strong> {response.task?.task}</p>

//         <div className='mt-4'>
//           <label htmlFor="">response:</label>  <textarea name="" id="" cols="30" rows="4"></textarea>
//           <button className="btn1 mr-4"
//             onClick={approve}>
//             Approve
//           </button>
//           <button className="btn1"
//             onClick={reject}>
//             Reject
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Respond;

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function Respond() {
  const [response, setResponse] = useState(null);
  const [textResponse, setTextResponse] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResponse = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/viewmemreqByid/${id}`);
        if (Array.isArray(res.data) && res.data.length > 0) {
          setResponse(res.data[0]);
        }
        console.log(res.data);
      } catch (error) {
        console.error('Error fetching response:', error);
      }
    };
    fetchResponse();
  }, [id]);

  const approve = async () => {
    try {
      await axios.put(`http://localhost:3000/leaderresponce/${id}`, {
        status: 'approved',
        response: textResponse
      });
      alert('Request approved!');
      navigate(-1);
    } catch (error) {
      console.error('Error approving:', error);
    }
  };

  const reject = async () => {
    try {
      await axios.put(`http://localhost:3000/leaderresponce/${id}`, {
        status: 'rejected',
        response: textResponse
      });
      alert('Request rejected!');
      navigate(-1);
    } catch (error) {
      console.error('Error rejecting:', error);
    }
  };

  if (!response) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Respond</h1>
      <div className="formcss">
        <h2>User: {response.username?.userName}</h2>
        <p><strong>Request:</strong> {response.request}</p>
        <p><strong>Status:</strong> {response.status}</p>
        <p><strong>Task:</strong> {response.task?.task}</p>

        <div className='mt-4'>
          <label>Response:</label>
          <textarea
            cols="30"
            rows="4"
            value={textResponse}
            onChange={(e) => setTextResponse(e.target.value)}
          ></textarea>
          <br />
          <button className="btn1 mr-4" onClick={approve}>Approve</button>
          <button className="btn1" onClick={reject}>Reject</button>
        </div>
      </div>
    </div>
  );
}

export default Respond;
