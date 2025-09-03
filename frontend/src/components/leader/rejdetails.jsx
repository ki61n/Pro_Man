
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {  useParams } from 'react-router-dom';
import Leadernav from './Leadernav';

function Rejdetails() {
  const [response, setResponse] = useState(null);
  const { id } = useParams();

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

  

  if (!response) {
    return <div>Loading...</div>;
  }

  return (
    <div>
       <div className='navclass'>
        <Leadernav />
      </div>
      <h1>Respond</h1>
      <div className="formcss">
        <h2>User: {response.username?.userName}</h2>
        <p><strong>Request:</strong> {response.request}</p>
        <p><strong>Status:</strong> {response.status}</p>
        <p><strong>Task:</strong> {response.task?.task}</p>
        <p><strong>Responce :</strong> {response.response}</p>


      
      </div>
    </div>
  );
}

export default Rejdetails;

