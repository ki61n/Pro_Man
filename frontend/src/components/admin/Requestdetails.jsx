import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function RequestDetails() {
  const [request, setRequest] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/viewreqByid/${id}`);
          setRequest(res.data);
        
        console.log(res.data);
      } catch (error) {
        console.error("Error fetching request details:", error);
      }
    };
    fetchRequest();
  }, [id]);

  if (!request) {
    return <div className="p-6">Loading details...</div>;
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Request Details</h1>

      <div className="bg-white shadow-lg rounded-xl p-6 space-y-4">
        {/* ✅ User + Project from arrays */}
        <p><strong>User:</strong> {request.lname?.userName || "Unknown User"}</p>
        <p><strong>Project:</strong> {request.project?.projectName || "No Project"}</p>

        <p><strong>Request:</strong> {request.request}</p>

        <p>
          <strong>Status:</strong>{" "}
          <span
            className={
              request.status === "pending"
                ? "text-blue-600 font-semibold"
                : request.status === "approved"
                ? "text-green-600 font-semibold"
                : "text-red-600 font-semibold"
            }
          >
            {request.status}
          </span>
        </p>

        {/* ✅ Display Admin Response */}
        <p>
          <strong>Admin Response:</strong>{" "}
          {request.response}
        </p>
      </div>

      <div className="mt-6">
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
        >
          Back
        </button>
      </div>
    </div>
  );
}

export default RequestDetails;
