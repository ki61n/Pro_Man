import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function MemTasks() {
  const {mid}=localStorage.getItem('id')
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
        <h1>Memory Tasks</h1>
        <div className='fullgrid'>
          {tasks.map((task, index) => (
          <div className='card  col-span-4 ' key={index}>
            <h2>Task :{task.task} </h2>
            <p>Task description: {task.TaskDescription}</p>
            <p>Due Date : {task.dueDate}</p>
            <button className='btn1' onClick={()=>navigate(`/member/memberhome/requests/${task._id}/${task.projectcol.leaderAssigned}`)}>request</button>

          </div>))}

        </div>
      
    </div>
  )
}

export default MemTasks
