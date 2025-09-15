import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Membernav from './membernav';

function  Myrequests() {
  const id=localStorage.getItem('id')
  const mid = id; // Assuming 'id' is the member ID from localStorage
  console.log("Member ID:", id);
  
  const [tasks, setTasks] = useState([])
  const navigate=useNavigate()
  useEffect(()=>{
    const fetchTasks = async () => {
      try{
        const response=await axios.get(`http://localhost:3000/viewmembertask/${mid}`)
        setTasks(response.data)
        console.log(response.data);
        
      }catch(error){
        console.error(error)
      }}
      fetchTasks()

  },[])

  return (
    <div>
      <div className='navclass'><Membernav/></div>
       <div className='mt-19 mx-15'> <h1>Member Tasks</h1>
        <div className='fullgrid'>
          {tasks.map((task, index) => (
          <div className='card  col-span-4  p-5 grid gap-5 rounded-3xl bg-linear-to-bl from-blue-500 to-yellow-400 hover:scale-105' key={index}>
            <h2>Task :{task.task} </h2>
            <p>Task description: {task.TaskDescription}</p>
            <p>Due Date : {task.dueDate}</p>
            <button className='btn1' onClick={()=>navigate(`/member/memberhome/myrequests/${task._id}/${task.projectcol.leaderAssigned}`)}>myrequest</button>

          </div>))}

        </div></div>
      
    </div>
  )
}

export default Myrequests


