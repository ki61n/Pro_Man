import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Leadernav from './Leadernav';

function ViewLproject() {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [date, setDate] = useState(""); // ✅ state for formatted date
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/viewproject/${id}`);
        setData(response.data);
        console.log(response.data);

        if (response.data.dueDate) {
          const formatted = response.data.dueDate.split('T')[0];
          setDate(formatted); // ✅ save formatted date
          console.log("Formatted date:", formatted);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  const status_work = async () => {
    try {
      await axios.put(`http://localhost:3000/updatepro/${id}`, { projectStatus: "In Progress" });
      setData(prevData => ({ ...prevData, projectStatus: "In Progress" }));
      alert("Status updated to 'In Progress'");
    } catch (error) {
      console.error(error);
      alert("Failed to update status");
    }
  }
  const status_completed = async () => {
    try {
      await axios.put(`http://localhost:3000/updatepro/${id}`, { projectStatus: "Completed" });
      setData(prevData => ({ ...prevData, projectStatus: "Completed" }));
      alert("Status updated to 'Completed'");
    } catch (error) {
      console.error(error);
      alert("Failed to update status");
    }
  }
  return (
    <div>
      <div className='navclass'>
        <Leadernav />
      </div>
      <div className='sm:mt-19 my-5 grid grid-cols-12 gap-5 sm:mx-12 sm:my-25 mx-2'>
        
        <div className='col-span-12'>
          <h1 className='bg-red-400 h-25 rounded-2xl flex justify-center items-center text-5xl'>
            {data.projectName}
          </h1>
        </div>

        <p className='col-span-12 sm:col-span-7 bg-blue-400 row-span-3 h-[60vh] rounded-2xl p-4 overflow-scroll scrollbar-hide'>
          <strong>Description:</strong> <br />
          <span className='m-3'>{data.projectDescription}</span>
        </p>

        <p className='sm:col-start-8 sm:col-span-5 col-span-7 bg-amber-300 rounded-2xl p-4 flex justify-center items-center'>
          <span>Due date: {date}</span>
        </p>

        <p className='sm:col-start-8 col-span-5 bg-emerald-300 rounded-2xl p-4 flex justify-center items-center'>
          <span>Maximum members allowed: {data.maxMembers}</span>
        </p>

        <p className='col-span-12 sm:col-start-8 sm:col-span-5 bg-fuchsia-400 rounded-2xl p-4 flex justify-between'>
          <span>Status:{data.projectStatus} </span> 
          <div className='flex gap-2'>
            <button className='btn1' onClick={status_work}>On Work</button>
            <button className='btn1' onClick={status_completed}>Completed</button>
          </div>
        </p>

        <button 
          className='btn1 col-span-7 h-20' 
          onClick={() => navigate(`addteam/${id}/${data.maxMembers}`)}
        >
          Add Members
        </button>

        <button 
          className='btn1 col-span-5' 
          onClick={() => navigate(`updateteam/${id}/${data.maxMembers}`)}
        >
          Update Members
        </button>
      </div>
    </div>
  );
}

export default ViewLproject;
