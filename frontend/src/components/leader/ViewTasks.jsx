import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

function ViewTasks() {
    const [viewtasks, setViewasks] = useState({});
    const{id, mid}= useParams()
    console.log('id',id, mid);
    useEffect(()=>{
        const fetchViewtasks = async () => {
            try{
                const response = await axios.get(`http://localhost:3000/viewAssignedTaskById/${id}/${mid}`)
                setViewasks(response.data)
                console.log(response.data);
                

            }catch(error){
                console.error(error);
            }

}
fetchViewtasks()},[])
    

  return (
    <div>
        <h1>
            View Tasks
        </h1>
      <div className='formcss'>
        <label>Task Name:</label><br />
        {viewtasks.task}  <br />
        <label htmlFor="">Task Description</label><br />
         {viewtasks.TaskDescription}
         <label htmlFor="">Due Date</label><br />
         {viewtasks.dueDate}
         

      </div>
    </div>
  )
}

export default ViewTasks
