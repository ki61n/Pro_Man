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

function Reqres() {
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const { tid } = useParams();
  const navigate = useNavigate();
  const id = localStorage.getItem('id');

  useEffect(() => {
    if (!id) {
      console.error('No ID found in localStorage');
      return;
    }

    const fetchResponse = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/viewmemreqBy/${tid}/${id}`);
        
        if (Array.isArray(res.data) && res.data.length > 0) {
          setResponses(res.data);
        } else {
          setResponses([]);
        }

        console.log(res.data);
      } catch (error) {
        console.error('Error fetching response:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchResponse();
  }, [tid, id]);

  // Optional: Redirect if any response is already accepted
  useEffect(() => {
    const alreadyAccepted = responses.find(r => r.status === 'accepted');
    if (alreadyAccepted) {
      alert('This request has already been accepted!');
      navigate('/leaderhome');
    }
  }, [responses, navigate]);

  if (loading) return <div>Loading...</div>;
  if (responses.length === 0) return <div>No request found.</div>;

  return (
    <div>
      <h1>Respond</h1>
      {responses.map((response, index) => (
        <div key={index} className="formcss" style={{ border: '1px solid #ccc', padding: '15px', marginBottom: '10px' }}>
          <h2>User: {response.username?.userName || 'N/A'}</h2>
          <p><strong>Request:</strong> {response.request || 'No request text'}</p>
          <p><strong>Task:</strong> {response.task?.task || 'No task info'}</p>
          <p><strong>Status:</strong> {response.status || 'No status'}</p>

          <p><strong>responce:</strong> {response.response}</p>
        </div>
      ))}
    </div>
  );
}

export default Reqres;
