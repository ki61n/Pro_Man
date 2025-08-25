import React, { useEffect, useState } from "react";
import axios from "axios";
import Adminnav from "./Adminnav";

function AddProject() {
  const [formData, setFormData] = useState({
    projectName: "",
    projectDescription: "",
    dueDate: "",
    leaderAssigned: "",
    maxMembers: "",
    
  });

  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]); // State to hold users
  useEffect(()=>{
    const fetchuser=async ()=>{
      try{
    const response=await axios.get("http://localhost:3000/viewmembers")
    setUsers(response.data);
    console.log(response.data);
    console.log(users.data);
    
    }catch(error){
      console.error("Error fetching users:", error);
    }
  };
  fetchuser();
}, []);

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/addproject", formData);
      setMessage("✅ Project added successfully!");
      setFormData({
        projectName: "",
        projectDescription: "",
        dueDate: "",
        leaderAssigned: "",
        maxMembers: "",
        
      })
      console.log(res.data);
    } catch (err) {
      setMessage(`❌ Error: ${err.response?.data?.error || err.message}`);
    }
  };

  return (
   <div>
     <div className='navclass'>
        <Adminnav/></div>
          
        <div></div>
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6 ">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-4xl ">
        <h1 className="text-2xl font-bold mb-6 text-center">Add New Project</h1>

        {message && (
          <p className="mb-4 text-center text-sm font-semibold text-green-600">
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Project Name */}
          <input
            type="text"
            name="projectName"
            placeholder="Project Name"
            value={formData.projectName}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-200"
          />

          {/* Project Description */}
          <textarea
            name="projectDescription"
            placeholder="Project Description"
            value={formData.projectDescription}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2  focus:outline-none focus:ring focus:ring-blue-200 input-scale col-start-2 row-span-5"
          />

          {/* Due Date */}
          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-200"
          />

          {/* Leader Assigned */}
          {/* <input
            type="text"
            name="leaderAssigned"
            placeholder="Leader Assigned"
            value={formData.leaderAssigned}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-200"
          /> */}
          <select
            name="leaderAssigned"
            id="leaderAssigned"
            value={formData.leaderAssigned}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-200 hover:bg-red-400  overflow-y-auto" // Changed: Added fixed height and vertical scroll
            size={1} // Ensures it's a dropdown, not a listbox
          >
            <option value="">Select Leader</option>
            {users.map((user) => (
              <option
                key={user._id}
                value={user._id}
                className={`${user.userType === 'leader' ? 'bg-cyan-300 border-black hover:bg-red-400' : 'bg-fuchsia-300'} border-2`}
              >
                {user.userName}
                {user.userType === 'leader' ? '(Leader)' : '(member)'}
              </option>
            ))}
          </select>
          {/* Changed: Added h-[3rem] and overflow-y-auto to make the select box fixed height and scrollable when options overflow */}
          {/* ...existing code... */}

          {/* Max Members */}
          <input
            type="number"
            name="maxMembers"
            placeholder="Max Members"
            value={formData.maxMembers}
            onChange={handleChange}
            required
            min="1"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-200"
          />

         

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Add Project
          </button>
          </div>
        </form>
      </div>
      
    </div>
    </div>
  );
}

export default AddProject;
