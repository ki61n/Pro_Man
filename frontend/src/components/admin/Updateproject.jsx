

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Adminnav from './Adminnav';

function Updateproject() {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [udata, setUdata] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [leader, setLeader] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [maxMembers, setMaxMembers] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const getProject = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/viewproject/${id}`);
        setData(response.data);
        setName(response.data.projectName);
        setDescription(response.data.projectDescription);
        setLeader(response.data.leaderAssigned?._id || '');
        setDueDate(response.data.dueDate.split('T')[0]); // yyyy-mm-dd
        setMaxMembers(response.data.maxMembers || '');
      } catch (err) {
        console.log(err);
      }
    };

    const getUsers = async () => {
      try {
        const userdata = await axios.get('http://localhost:3000/viewmembers');
        setUdata(userdata.data);
      } catch (err) {
        console.log(err);
      }
    };

    getUsers();
    getProject();
  }, [id]);
 
  const update = async (e) => {
    e.preventDefault();
    try {
      const updatedProject = {
        projectName: name,
        projectDescription: description,
        leaderAssigned: leader,
        dueDate: dueDate,
        maxMembers: maxMembers,
      };
      await axios.put(`http://localhost:3000/updatepro/${id}`, updatedProject);
      alert('Project updated successfully!');
      navigate(-1);
    } catch (err) {
      console.error('Error updating project:', err);
      alert('Failed to update project.');
    }
  };

  return (
    <div className="font-sans overflow-hidden">
      <div className="navclass font-serif">
        <Adminnav />
      </div>

      <div className="flex justify-center items-center h-full md:grid grid-cols-12 w-screen mt-30">
        <div className="grid grid-cols-12 gap-4 p-6 bg-blue-100 rounded-lg shadow-lg w-full col-start-2 col-span-10">
          
          {/* Title */}
          <div className="col-start-1 col-end-13 flex py-2 pb-3 font-serif ">
            <h1 className=" text-5xl font-bold text-shadow-purple-400"> UPDATE PROJECT</h1>
          </div>

          <form 
            onSubmit={update} 
            className="col-start-1 col-span-12 grid grid-cols-12 gap-4"
          >
            {/* Project Name */}
            <div className="col-start-1 col-span-7 bg-amber-500 px-8 py-6 rounded-2xl hover:scale-102 duration-500">
              <label className="block font-bold mb-2">Project Name:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 rounded-lg outline-none"
              />
            </div>

            {/* Due Date */}
            <div  className="col-start-8 col-span-5 bg-blue-400 px-6 py-6 rounded-2xl hover:scale-102 duration-500">
              <label className="block font-bold mb-2">Due Date:</label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full p-2 rounded-lg outline-none h-full"
              />
            </div>

            {/* Project Description */}
            <div className="col-start-1 col-span-7 bg-amber-200 px-8 py-6 rounded-2xl row-span-2 hover:scale-102 duration-500">
              <label className="block font-bold mb-2">Project Description:</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full  p-2 rounded-lg outline-none resize-none h-[80%] scrollbar-hide "
              />
            </div>

            {/* Leader */}
            <div className="col-start-8 col-span-5  bg-emerald-400 px-6 py-4 rounded-2xl hover:scale-102 duration-500">
              <label className="block font-bold mb-2">Leader:</label>
              <select
                value={leader}
                onChange={(e) => setLeader(e.target.value)}
                className="w-full p-2 rounded-lg outline-none"
              >
                {udata.map((user) => (
                  <option key={user._id} value={user._id} className={`${user.userType ==='leader' ? 'bg-fuchsia-400': 'bg-emerald-300'}`}>
                    {user.userName}
                  {user.userType === 'leader' ? '  -           L' : '  -           m'}

                    {console.log(udata.userType)}
                  </option>
                ))}
              </select>
            </div>

            {/* Max Members */}
            <div className="col-start-8 col-span-5 bg-pink-300 px-6 py-4 rounded-2xl hover:scale-102 duration-500">
              <label className="block font-bold mb-2">Maximum Members:</label>
              <input
                type="number"
                value={maxMembers}
                onChange={(e) => setMaxMembers(e.target.value)}
                className="w-full p-2 rounded-lg outline-none"
                min="1"
              />
            </div>

            {/* Submit Button */}
            <div className="col-start-5 col-span-4 flex justify-center mt-6">
              <button
                type="submit"
                className="btn1 w-full bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded-xl"
              >
                Update Project
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Updateproject;

