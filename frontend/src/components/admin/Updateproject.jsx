
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function Updateproject() {
  const { id } = useParams();
  const [data, setData] = useState({});
  const[udata,setUdata]=useState([])
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [leader, setLeader] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [uname,setUname]=useState([])
  const [uid,setUid]=useState([])
const navigate=useNavigate()
  useEffect(() => {
    const getProject = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/viewproject/${id}`);
        setData(response.data);
        setName(response.data.projectName);
        setDescription(response.data.projectDescription);
        setLeader(response.data.leaderAssigned?.userName || '');
        setDueDate(response.data.dueDate);
        console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    const getusers=async ()=>{
      try{
        const userdata= await axios.get('http://localhost:3000/viewallusers')
        setUdata(userdata.data)
        setUname(userdata.data.map((user)=>user.userName))
        setUid(userdata.data.map((user)=>user._id))
        console.log(userdata.data.map((user)=>user.userName));
        

        console.log(userdata.data)
      }
      catch(err){
        console.log(err)
      }
    }
    getusers()

    getProject();
  }, []);

  const update = async (e) => {
    e.preventDefault();
    try {
      const updatedProject = {
        projectName: name,
        projectDescription: description,
        leaderAssigned: leader,
        dueDate: dueDate,
      };
      const response = await axios.put(`http://localhost:3000/updatepro/${id}`, updatedProject);
      console.log('Project updated:', response.data);
      alert('Project updated successfully!');
      navigate(-1)
    } catch (err) {
      console.error('Error updating project:', err);
      alert('Failed to update project.');
    }
  };

  return (
    <div>
      <h1>Update Project</h1>
      <form className="formcss" onSubmit={update}>
        <label>Project Name:</label>
        <input
          type="text"
          name="projectName"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input-fields"
        />
        <br />
        <label>Project Description:</label>
        <textarea
          name="projectDescription"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="input-fields"
        />
        <br />
        <label>Leader:</label>
         <select name="leaderAssigned" id="leaderAssigned" className="input-fields" onChange={(e) => setLeader(e.target.value)}>
  {udata.map((user, i) => (
    <option value={user._id} key={i}>
      {user.userName}
    </option>
  ))}
</select>
        <input
          type="text"
          name="leaderAssigned"
          value={leader}
          onChange={(e) => setLeader(e.target.value)}
          className="input-fields"
          disabled
        />
        <br />
        <label>Due Date:</label>
        <input
          type="date"
          name="dueDate"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="input-fields"
        />
        <br />
      
        <input type="submit" value="Update Project" className="btn1" />
      </form>
    </div>
  );
}

export default Updateproject;