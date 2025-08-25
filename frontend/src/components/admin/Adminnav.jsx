

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo1 from '../../assets/logo1.png';
import menuimg from '../../assets/menu.jpg';
function Adminnav() {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showDropdown2, setShowDropdown2] = useState(false);

  const [menu, setMenu] = useState(false);

  return (<div className="sm:hover:ring-1 hover:ring-slate-400 sm:bg-black">
    <img src={menuimg} alt="Logo" className="fixed left-3 top-3 h-8 hover:scale-110 transition-transform duration-300 rounded-b-full  z-50  sm:hidden " onClick={() => setMenu(!menu)} />
    <nav className={`bg-[rgba(57,57,57,0.22)] text-white p-3 flex gap-6 items-center max-sm:flex-col max-sm:w-[15rem] ] max-sm:sticky backdrop-blur-xl  duration-500 ${window.innerWidth <= 640 ? menu ? 'translate-x-0' : '-translate-x-full':''} transition-transform duration-300`}>
      <ul className="flex gap-6 items-center max-sm:flex-col max-sm:h-[98svh] w-full">
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

        <li className=" relative"
        onMouseEnter={() => setShowDropdown2(true)}
          onMouseLeave={() => setShowDropdown2(false)}>
          <button>Users</button>
          {showDropdown2 && (
            <ul className="absolute left-0 top-4 mt-2 bg-white text-black shadow-md rounded w-40" >
              <li>
                <Link
                  to="/admin/adminhome/viewleaders"
                  className="block px-4 py-2 hover:bg-gray-200 hover:rounded-l"
                    onClick={() => setShowDropdown2(false)}
                >
                 users
                </Link>
              </li>
             
            </ul>
          )}
        </li>

        <li className=" max-sm:mt-auto max-sm:text-black sm:ml-auto">
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
    </div>
  );
}

export default Adminnav;
