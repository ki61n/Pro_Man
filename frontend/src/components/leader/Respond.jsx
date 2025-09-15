

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Leadernav from './Leadernav';

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
       <div className='navclass'>
        <Leadernav />
      </div>
     <div className='sm:mt-30 mx-15'> 
      <div className="bg-purple-200 p-10 rounded-2xl">
        <h1 className='mx-[45%] text-4xl'>Respond</h1>
       <table className='mx-20'>
        <tr><td className='w-2xs'><strong>User:</strong></td>
        <td>{response.username?.userName}</td></tr>  
        <tr>
          <td><strong>Request:</strong></td>
          <td>{response.request}</td>
        </tr>
        <tr>
          <td><strong>Status:</strong></td>
          <td> {response.status}</td>
        </tr>
        <tr>
          <td><strong>Task:</strong></td>
          <td>{response.task?.task}</td>
        </tr>
        <tr>
          <td><strong>Response:</strong></td>
        </tr>



       </table>
        <div className=''>
          <br />
          <textarea
            className="w-[80%] h-35 border p-5 mx-20 my-5 rounded-3xl"
            
            value={textResponse}
            plaseholder="Write your response here..."
            onChange={(e) => setTextResponse(e.target.value)}
          ></textarea>
          <br />
          <div className='my-5 w-full flex justify-center'><button className="btn1 mr-4" onClick={approve}>Approve</button>
          <button className="btn1" onClick={reject}>Reject</button></div>
        </div>
      </div></div>
    </div>
  );
}

export default Respond;
