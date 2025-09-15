import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Leadernav from './Leadernav';

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
       <div className='navclass'>
        <Leadernav />
      </div>
        <div className='mt-19 mx-15 flex flex-col'><h1 className=' mx-auto text-5xl '>
            View Tasks
        </h1>
      <div className='w-[80%] bg-pink-400 mx-auto p-15 grid gap-5 rounded-3xl mt-10 '>
        <div className='flex gap-5'><label>Task Name:</label>
        <label className='text-xl'>{viewtasks?.task || 'no task added'} </label> </div>
        <label htmlFor="">Task Description</label>
        <label htmlFor="">{viewtasks?.TaskDescription || 'no task added'}</label>
         <label htmlFor="">Due Date</label>
        <label htmlFor="">{viewtasks.dueDate?.substring(0,10) || 'no due date'}</label>  


      </div></div>
    </div>
  )
}

export default ViewTasks
