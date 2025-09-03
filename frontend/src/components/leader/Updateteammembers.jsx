import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Leadernav from './Leadernav';

function Updateteammembers() {
  const [allUsers, setAllUsers] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const { id } = useParams(); // project ID

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get all users
        const usersRes = await axios.get('http://localhost:3000/viewmembers');
        setAllUsers(usersRes.data);

        // Get assigned members of the project
        const projectTeamRes = await axios.get(`http://localhost:3000/viewMembersById/${id}`);
        const assigned = projectTeamRes.data[0]?.asignMembers || [];
        const assignedIds = assigned.map(member => member._id);
        setSelectedMembers(assignedIds);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [id]);

  const handleCheckboxChange = (e) => {
    const value = e.target.value;
    setSelectedMembers(prev =>
      prev.includes(value) ? prev.filter(id => id !== value) : [...prev, value]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedData = {
        asignMembers: selectedMembers,
      };
      const res = await axios.put(`http://localhost:3000/updateMembers/${id}`, updatedData);
      console.log(res.data);
      alert('Team updated successfully');
    } catch (err) {
      console.error(err);
      alert('Error updating team');
    }
  };

  return (
    <div>
       <div className='navclass'>
        <Leadernav />
      </div>
      <h1>Update Team Members</h1>
      <form onSubmit={handleSubmit}>
        <div className="fullgrid">
          {allUsers.map((user, index) => (
            <div className="minicard" key={index}>
              <h3>{user.userName}</h3>
              <input
                type="checkbox"
                value={user._id}
                checked={selectedMembers.includes(user._id)}
                onChange={handleCheckboxChange}
              />
            </div>
          ))}
        </div>
        <button className="btn1" type="submit">Update Team</button>
      </form>
    </div>
  );
}

export default Updateteammembers;
