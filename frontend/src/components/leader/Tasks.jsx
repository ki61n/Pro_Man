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
      <h1>Tasks</h1>
      <form onSubmit={submitdata} className="formcss ml-72">
        <label>Task</label>
        <input
          type="text"
          name="task"
          value={taskData.task}
          placeholder="Enter a task"
          onChange={handleChange}
        />
        <br />

        <label>Task Description</label>
        <input
          type="text"
          name="TaskDescription"
          value={taskData.TaskDescription}
          onChange={handleChange}
        />
        <br />

        <label>Due Date</label>
        <input
          type="date"
          name="dueDate"
          value={taskData.dueDate}
          onChange={handleChange}
        />
        <br />

        <button type="submit" className="btn1">Add Task</button>
      </form>
    </div>
  );
}

export default Tasks;
