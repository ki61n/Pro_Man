
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Leadernav from './Leadernav';

function UpdateTask() {
  const { id, mid } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    task: '',
    TaskDescription: '',
    dueDate: ''
  });

  const [loading, setLoading] = useState(true);

  // Fetch existing task details
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/viewAssignedTaskById/${id}/${mid}`);
        const taskData = response.data;

        setFormData({
          task: taskData.task,
          TaskDescription: taskData.TaskDescription,
          dueDate: taskData.dueDate?.substring(0, 10) || ''
        });

        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch task', error);
        setLoading(false);
      }
    };

    fetchTask();
  }, [id, mid]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/updateAssignTask/${id}/${mid}`, formData);
      alert('Task updated successfully!');
      navigate(`/leader/leaderhome/project_task/projectmembers/${id}/viewtasks/${mid}`);
    } catch (error) {
      console.error('Error updating task:', error);
      alert('Failed to update task');
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div> <div className='navclass'>
        <Leadernav />
      </div>
    <div className="formcss">
      <h1>Update Task</h1>
      <form onSubmit={handleSubmit}>
        <label>Task Name:</label><br />
        <input
          type="text"
          name="task"
          value={formData.task}
          onChange={handleChange}
          required
        /><br /><br />
<br />
        <label>Task Description:</label><br />
        <textarea
          name="TaskDescription"
          value={formData.TaskDescription}
          onChange={handleChange}
          required
        ></textarea><br /><br />

        <label>Due Date:</label><br />
        <input
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
          required
        /><br /><br />

        <button className='btn1' type="submit">Update Task</button>
      </form>
    </div></div>
  );
}

export default UpdateTask;
