
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function Rejdetails() {
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

  // const approve = async () => {
  //   try {
  //     await axios.put(`http://localhost:3000/leaderresponce/${id}`, {
  //       status: 'approved',
  //       response: textResponse
  //     });
  //     alert('Request approved!');
  //     navigate(-1);
  //   } catch (error) {
  //     console.error('Error approving:', error);
  //   }
  // };

  // const reject = async () => {
  //   try {
  //     await axios.put(`http://localhost:3000/leaderresponce/${id}`, {
  //       status: 'rejected',
  //       response: textResponse
  //     });
  //     alert('Request rejected!');
  //     navigate(-1);
  //   } catch (error) {
  //     console.error('Error rejecting:', error);
  //   }
  // };

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

        {/* <div className='mt-4'>
          <label>Response:</label>
          <textarea
            cols="30"
            rows="4"
            value={textResponse}
            onChange={(e) => setTextResponse(e.target.value)}
          ></textarea>
          <br />
          
        </div> */}
      </div>
    </div>
  );
}

export default Rejdetails;

