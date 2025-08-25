// import React, { useEffect, useState } from 'react'
// import Adminnav from './Adminnav'
// import axios from 'axios';

// function Viewusers() {
//     const [users, setUsers] = useState([]);
//     useEffect(() => {
//         const fetchUsers = async () => {
//             const response = await axios.get('http://localhost:3000/viewmembers');
//             const data = await response.data;
//             setUsers(data);
//             console.log(data);

//         };
//         fetchUsers();
//     }, []);
//     const leaders = users.filter(user => user.userType === 'leader');
//     const members = users.filter(user => user.userType === 'user');

//     console.log(leaders);
//     console.log(members);

//     return (
//   <div>
//       <div className='navclass'><Adminnav/> </div>
//       <div className='sm:mt-20 flex'>
//            <h1 className='text-3xl font-bold'>View Users</h1>
//              <button className='btn1'>view all users</button> <button className='btn1'>view leaders</button> <button className='btn1'>view members</button>
             
//         </div>
//       <div>
//         <h2 className='text-2xl font-bold'>Leaders</h2>
//         <ul>
//           {leaders.map(users => (
//             <li key={users.id}>{users.name}</li>
//           ))}
//         </ul>
//       </div>
//       <div>
//         <h2 className='text-2xl font-bold'>Members</h2>
//         <ul>
//           {members.map(users => (
//             <li key={users.id}>{users.name}</li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   )
// }

// export default Viewusers
import React, { useEffect, useState } from 'react'
import Adminnav from './Adminnav'
import axios from 'axios';

function Viewusers() {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/viewallusers');
        setUsers(response.data);
        console.log(response.data);
        
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    fetchUsers();
  }, []);

  const filteredUsers = users.filter((u) => {
    if (filter === "all") return true;
    if (filter === "leader") return u.userType === "leader";
    if (filter === "member") return u.userType === "user";
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50 scrollbar-hide">
      {/* Navbar */}
      <div className="navclass">
        <Adminnav />
      </div>

      {/* Header & Filter Buttons */}
      <div className="sm:mt-20 flex flex-col items-center ">
        <h1 className="text-3xl font-bold mb-4">View Users</h1>
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-lg ${filter === "all" ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
          >
            View All
          </button>
          <button
            onClick={() => setFilter("leader")}
            className={`px-4 py-2 rounded-lg ${filter === "leader" ? "bg-green-500 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
          >
            Leaders
          </button>
          <button
            onClick={() => setFilter("member")}
            className={`px-4 py-2 rounded-lg ${filter === "member" ? "bg-purple-500 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
          >
            Members
          </button>
        </div>
      </div>

      {/* Users Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-8 pb-10">
        {filteredUsers.map((u) => (
          <div
            key={u._id}
            className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center hover:shadow-xl transition"
          >
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gray-200 text-xl font-bold text-gray-600">
              {u.userName.charAt(0).toUpperCase()}
            </div>
            <h2 className="mt-4 text-lg font-semibold">{u.userName}</h2>
            <span
              className={`mt-2 px-3 py-1 text-sm font-medium rounded-full ${
                u.userType === "leader"
                  ? "bg-green-100 text-green-700"
                  : "bg-purple-100 text-purple-700"
              }`}
            >
              {u.userType === "leader" ? "Leader" : u.userType === "admin" ?"admin":"member"}
            </span>
            <span className={`mt-2 px-3 py-1 text-sm font-medium rounded-full ${
                u.projectAsignedStat === "assigned"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-purple-700"
              }`}>{u.projectAsignedStat}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Viewusers;
