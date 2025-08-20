import React, { useState } from "react";
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
        
      });
    } catch (err) {
      setMessage(`❌ Error: ${err.response?.data?.error || err.message}`);
    }
  };

  return (
   <div>
     <div className='navclass'>
        <Adminnav/></div>
          
        <div></div>
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Add New Project</h1>

        {message && (
          <p className="mb-4 text-center text-sm font-semibold text-green-600">
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
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
            className="w-full border border-gray-300 rounded-lg px-4 py-2 h-24 focus:outline-none focus:ring focus:ring-blue-200"
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
          <input
            type="text"
            name="leaderAssigned"
            placeholder="Leader Assigned"
            value={formData.leaderAssigned}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-200"
          />

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
        </form>
      </div>
      
    </div>
    </div>
  );
}

export default AddProject;
