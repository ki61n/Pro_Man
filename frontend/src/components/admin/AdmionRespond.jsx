


import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AdmionRespond() {
  const [allRequests, setAllRequests] = useState([]); // keep original data
  const [filteredRequests, setFilteredRequests] = useState([]); // filtered data
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/ViewleaderRequest`);
        setAllRequests(response.data);
        setFilteredRequests(response.data); // show all initially
        console.log(response.data);
      } catch (err) {
        console.error("Error fetching requests:", err);
      }
    };
    fetchRequests();
  }, []);

  const handleFilter = (status) => {
    if (status === "all") {
      setFilteredRequests(allRequests);
    } else {
      const filtered = allRequests.filter((r) => r.status === status);
      setFilteredRequests(filtered);
    }
  };

  return (
    <div className="p-6">
      {/* Filter Buttons */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => handleFilter("all")}
          className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
        >
          All
        </button>
        <button
          onClick={() => handleFilter("pending")}
          className="px-4 py-2 rounded-lg bg-yellow-200 hover:bg-yellow-300"
        >
          Pending
        </button>
        <button
          onClick={() => handleFilter("accepted")}
          className="px-4 py-2 rounded-lg bg-green-200 hover:bg-green-300"
        >
          Accepted
        </button>
        <button
          onClick={() => handleFilter("rejected")}
          className="px-4 py-2 rounded-lg bg-red-200 hover:bg-red-300"
        >
          Rejected
        </button>
      </div>

      {/* Title */}
      <h1 className="text-2xl font-bold mb-4">Admin Requests</h1>

      {/* Requests Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredRequests.length > 0 ? (
          filteredRequests.map((r, i) => (
            <div
              key={i}
              className={` shadow-lg rounded-xl p-4 flex flex-col justify-between ${r.status==='pending'? 'bg-blue-200':r.status==='accepted'?'bg-green-200':'bg-red-200'} `}
            >
              <div className={` ${r.status==='pending'? 'bg-blue-100':r.status==='accepted'?'bg-green-100':'bg-red-100'}  rounded-lg p-5`}>
                <p className="font-semibold text-lg">{r.lname?.userName || "Unknown User"}</p>
                <p className="text-gray-600">{r.project?.projectName || "No Project"}</p>
                <p className={`mt-2 text-sm italic `}>{r.request}</p>
                <p className="mt-2 text-sm italic">{r.status}</p>

              </div>
              {r.status==='pending' ?

              <button
                className="btn1 mt-4"
                onClick={() => navigate(`/admin/adminhome/requests/replay/${r._id}`)}
              >
                Respond
              </button> :
              <button className="btn1 mt-4" onClick={() => navigate(`details/${r._id}`)}>
                View Details
              </button>}
            </div>
          ))
        ) : (
          <p className="text-gray-500">No requests found</p>
        )}
      </div>
    </div>
  );
}

export default AdmionRespond;
