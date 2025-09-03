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
    <div className="formcss">
      <h1>Request</h1>
      {message && <p>{message}</p>}
      <form onSubmit={send}>
        <label htmlFor="request">Topic</label>
        <textarea
          name="request"
          id="request"
          cols="40"
          rows="5"
          value={details.request}
          onChange={(e) => setDetails({ ...details, request: e.target.value })}
        ></textarea>
        <button className="btn1">Send</button>
      </form>
    </div></div>
  );
}

export default Leaderrequest;
