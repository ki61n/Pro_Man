import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Membernav() {
   const navigate=useNavigate()
  return (
     <div className="flex">
      <ul className="flex gap-3">
        <li>
          <Link to="/member/memberhome">Home</Link> 
        </li>
        <li>
          <Link to="/member/memberhome/memtask">Tasks</Link> 
        </li>
        <li>
          <Link to="/member/memberhome/requests">Requests</Link>
        </li>
        <li>
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
    </div>
  )
}

export default Membernav
