import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Membernav from './membernav';

function Requests() {
  const [details, setDetails] = useState({ request: '' });
  const [message, setMessage] = useState('');
  const { tid, lid } = useParams();

  const teamleader = lid;
  const task = tid;
  const requestedmember = localStorage.getItem('id');
  const username=requestedmember

  const send = async (e) => {
    e.preventDefault();

    if (!details.request.trim()) {
      setMessage('Request message cannot be empty.');
      return;
    }

    const data = {
      request: details.request,
      teamleader,
      task,
      requestedmember,
      username
    };

    try {
      const response = await axios.post('http://localhost:3000/memberRequest', data);
      console.log('Request sent successfully:', response.data);
      alert('Request sent successfully!');
      setDetails({ request: '' });
    } catch (error) {
      console.error('Error sending request:', error);
      setMessage('Failed to send request. Please try again.');
    }

    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className='mt-19 mx-15'>
            <div className='navclass'><Membernav/></div>
<div className=" mt-29 mx-15 grid justify-center gap-5 bg-linear-300 from-red-300 to-red-400 p-25 rounded-2xl">
      <h1 className='text-4xl mx-5'>Request</h1>
      {message && <p>{message}</p>}
      <form onSubmit={send} className='flex flex-col gap-3 bg-linear-300 from-red-300 to-pink-400 p-5 rounded-2xl w-2xl '>
        <label htmlFor="request">Topic</label>
        <textarea
        placeholder='Write your request here...'
        className='border-2 border-black rounded-lg max-h-35 min-h-30'
          name="request"
          id="request"
          cols="40"
          rows="5"
          value={details.request}
          onChange={(e) => setDetails({ ...details, request: e.target.value })}
        ></textarea>
        <button className="btn1 hover:bg-pink-300 hover:border-2">Send</button>
      </form>
    </div></div>
  );
}

export default Requests;
