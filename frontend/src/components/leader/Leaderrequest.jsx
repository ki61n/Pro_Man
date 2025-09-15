import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Leadernav from './Leadernav';

function Leaderrequest() {
  const [details, setDetails] = useState({ request: '' });
  const [message, setMessage] = useState('');
  const { pid } = useParams();

  const project = pid;
  const teamleader = localStorage.getItem('id');

  const send = async (e) => {
    e.preventDefault();

    if (!details.request.trim()) {
      setMessage('Request message cannot be empty.');
      return;
    }

    const data = {
      request: details.request,
      teamleader,
      project,
    
    };

    try {
      const response = await axios.post('http://localhost:3000/leaderRequest', data);
      console.log('Request sent successfully:', response.data);
      alert('Request sent successfully!');
      setDetails({ request: '' });
    } catch (error) {
      console.error('Error sending request:', error);
      setMessage('Failed to send request. Please try again.');
    }

    setTimeout(() => setMessage(''), 3000);
  };

  return (<div>
     <div className='navclass'>
        <Leadernav />
      </div>
    <div className="bg-amber-400 mt-25 flex items-center justify-center flex-col p-25 mx-15 ">
      <h1 className='text-4xl mb-5'>Request</h1>
      {message && <p>{message}</p>}
      <div><form onSubmit={send} className='grid justify-center bg-blue-50 p-10 rounded-2xl'>
        <label htmlFor="request">Topic</label>
        <textarea
        className='block border-2 border-black my-5 p-2'
        placeholder='Write your request here...'
          name="request"
          id="request"
          cols="60"
          rows="5"
          value={details.request}
          onChange={(e) => setDetails({ ...details, request: e.target.value })}
        ></textarea>
        <button className="btn1">Send</button>
      </form></div>
    </div></div>
  );
}

export default Leaderrequest;
