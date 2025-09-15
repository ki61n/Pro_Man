import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Membernav from "./membernav";

function Viewtask() {
  const [task, setTask] = useState({});
  const { pid, id } = useParams();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/viewAssignedTaskById/${pid}/${id}`
        );
        setTask(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTask();
  }, [pid, id]);

  const work = async () => {
    try {
      const response =await axios.put(
  `http://localhost:3000/updateAssignTask/${pid}/${id}`,
  { status: "on progress" },
  { headers: { "Content-Type": "application/json" } }
);
      console.log(response.data);
      alert("Status updated to On progress");
    } catch (error) {
      console.error(error);
    }
  };

  const completed = async () => {
    try {
      const response =await axios.put(
  `http://localhost:3000/updateAssignTask/${pid}/${id}`,
  { status: "completed" },
  { headers: { "Content-Type": "application/json" } }
);
      console.log(response.data);
      alert("Status updated to Completed");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Navbar */}
      <div className="navclass">
        <Membernav />
      </div>

      {/* Page Title */}
      <div className="mt-20 text-center">
        <h1 className="text-3xl sm:text-5xl font-bold text-gray-800">
          View Task
        </h1>
      </div>

      {/* Task Card */}
      <div className="mx-4 sm:mx-auto mt-6 w-full sm:w-2/3 lg:w-1/2 bg-white rounded-2xl shadow-lg p-6 sm:p-10 space-y-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-indigo-700">
          {task.task}
        </h2>
        <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
          {task.TaskDescription}
        </p>
        <p className="text-gray-500 text-sm">
          <span className="font-medium text-gray-800">Due:</span>{" "}
          {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "N/A"}
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 mt-4">
          <button
            className="w-full sm:w-auto px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
            onClick={work}
          >
            On Work
          </button>
          <button
            className="w-full sm:w-auto px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition"
            onClick={completed}
          >
            Completed
          </button>
        </div>
      </div>
    </div>
  );
}

export default Viewtask;
