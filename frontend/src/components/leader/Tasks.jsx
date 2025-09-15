import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Leadernav from './Leadernav';

function Tasks() {
  const { id, mid } = useParams(); 
  const [taskData, setTaskData] = React.useState({
    task: '',
    TaskDescription: '',
    dueDate: '',
  });
const navigate=useNavigate()
  const handleChange = (e) => {
    setTaskData({
      ...taskData,
      [e.target.name]: e.target.value,
    });
  };

  const submitdata = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/assigntask', {
        project: id,
        projectcol:id,
        member: mid,
        ...taskData,
      });
      alert('Task added successfully')
      console.log('Task added successfully:', response.data);
      // Optionally reset form
      setTaskData({ task: '', TaskDescription: '', dueDate: '' });
      navigate(`/leader/leaderhome/project_task/projectmembers/${id}/viewtasks/${mid}`);
    } catch (error) {
      console.error('Error adding task:', error.message);
      alert(error.message)
    }
  };

  return (
    <div>
       <div className='navclass'>
        <Leadernav />
      </div>
      <div className='mt-19 mx-15 flex flex-col'><h1 className='mx-auto text-5xl'>Tasks</h1>
      <form onSubmit={submitdata} className="w-[70%] bg-green-400 mx-auto p-15 grid gap-2 rounded-3xl mt-10">
        <label>Task</label>
        <input
          type="text"
          name="task"
          value={taskData.task}
          placeholder="Add a task"
          onChange={handleChange}
          className='p-2 rounded-lg border-2'
        />
        <br />

        <label>Task Description</label>
        <textarea
          type="text"
          name="TaskDescription"
          value={taskData.TaskDescription}
          onChange={handleChange}
          
          className='p-2 rounded-lg border-2 max-h-35 min-h-30'
        />
        <br />

        <label>Due Date</label>
        <input
          type="date"
          name="dueDate"
          value={taskData.dueDate}
          onChange={handleChange}
          className='p-2 rounded-lg border-2'
        />
        <br />

        <button type="submit" className="btn1">Add Task</button>
      </form></div>
    </div>
  );
}

export default Tasks;
