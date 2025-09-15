import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo1 from '../../assets/logo1.png';
import menuimg from '../../assets/menu.jpg';
function Membernav() {
  const [menu, setMenu] = useState(false);
   const navigate=useNavigate()
  return (
     <div className="sm:hover:ring-1 hover:ring-slate-400 sm:bg-black">
         <img src={menuimg} alt="Logo" className="fixed left-3 top-3 h-8 hover:scale-110 transition-transform duration-300 rounded-b-full  z-50  sm:hidden " onClick={() => setMenu(!menu)} />
         <nav className={`bg-[rgba(57,57,57,0.22)] text-white p-3 flex gap-6 items-center max-sm:flex-col max-sm:w-[15rem] ] max-sm:sticky backdrop-blur-xl  duration-500 ${window.innerWidth <= 640 ? menu ? 'translate-x-0' : '-translate-x-full':''} transition-transform duration-300`}>
           <ul className="flex gap-6 items-center max-sm:flex-col max-sm:h-[98svh] w-full max-sm:justify-center max-sm:gap-10 max-sm:mt-10 max-sm:mb-10">
             <li>
               <Link to="/leader/leaderhome">
                 <img src={logo1} alt="Logo" className="h-13 hover:scale-110 transition-transform duration-300 rounded-2xl" />
               </Link>
             </li>
        <li className='hover:text-amber-300'>
           <Link to="/member/memberhome">Home</Link> 
        </li>
        <li className='hover:text-amber-300'>
         <Link to="/member/memberhome/memtask">Tasks</Link> 
        </li>
        <li className='hover:text-amber-300'>
          <Link to="/member/memberhome/requests">Requests</Link>
        </li>
         
        <li className='hover:text-red-400'>
          <a
            href="#"
            onClick={() => {
              localStorage.clear(); 
              navigate('/');
            }}
          >
            Logout
          </a>
        </li>
      </ul>
      </nav>
    </div>
  )
}

export default Membernav
