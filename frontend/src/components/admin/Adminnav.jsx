// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';

// function Adminnav() {
//   const navigate = useNavigate();
//   return (
//     <div className=''>
//       <ul className="flex gap-3">
//         <li>
//           <Link to="/admin/adminhome">Home</Link> {/* Use Link for navigation */}
//         </li>
//         <ul className='dropdown'>
//         <li>
//           <Link to="/admin/adminhome/project">Project</Link> {/* Use Link for navigation */}
//           <Link to="/admin/adminhome/project">Add Project</Link> 
//           <Link to="/admin/adminhome/project"> view Project</Link> 
//         </li>
//         </ul>
//         <li>
//           <Link to="/users">Users</Link> {/* Add route for users */}
//         </li>
//         <li>
//           <a
//             href="#"
//             onClick={() => {
//               localStorage.clear(); // Clear localStorage on logout
//               navigate('/'); // Redirect to login page
//             }}
//           >
//             Logout
//           </a>
//         </li>
//       </ul>
//     </div>
//   );
// }

// export default Adminnav;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo1 from '../../assets/logo1.png';
function Adminnav() {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <nav className="bg-gray-800 text-white p-3 flex gap-6 items-center max-sm:flex-col max-sm:w-[15rem] max-sm:max-w sticky">
      <ul className="flex gap-6 items-center max-sm:flex-col">
        <li>
          <Link to="/admin/adminhome">
            <img src={logo1} alt="Logo" className="h-13 hover:scale-110 transition-transform duration-300 rounded-2xl" />
          </Link>
        </li>
        <li>
          <Link to="/admin/adminhome" className="hover:text-yellow-400">
            Home
          </Link>
        </li>

        {/* Dropdown */}
        <li
          className="relative"
          onMouseEnter={() => setShowDropdown(true)}
          onMouseLeave={() => setShowDropdown(false)}
        >
          <button className="hover:text-yellow-400">Projects ▾</button>
          {showDropdown && (
            <ul className="absolute left-0 top-4 mt-2 bg-white text-black shadow-md rounded w-40" >
              <li>
                <Link
                  to="/admin/adminhome/addproject"
                  className="block px-4 py-2 hover:bg-gray-200 hover:rounded-l"
                    onClick={() => setShowDropdown(false)}
                >
                  Add Project
                </Link>
              </li>
              <li>
                <Link
                   to="/admin/adminhome/project"
                  className="block px-4 py-2 hover:bg-gray-200 hover:rounded-l"
                    onClick={() => setShowDropdown(false)}
                >
                  View Projects
                </Link>
              </li>
            </ul>
          )}
        </li>

        <li className="">
          <Link to="/users" className="hover:text-yellow-400">
            Users
          </Link>
        </li>

        <li className="ml-auto">
          <button
            onClick={() => {
              localStorage.clear();
              navigate("/");
            }}
            className="hover:text-red-400"
          >
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Adminnav;
