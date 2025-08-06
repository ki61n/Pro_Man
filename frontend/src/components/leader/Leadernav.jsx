import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Leadernav() {
   const navigate=useNavigate()
  return (
     <div className="flex">
      <ul className="flex gap-3">
        <li>
          <Link to="/leader/leaderhome">Home</Link> 
        </li>
        <li>
          <Link to="/leader/leaderhome/lproject">Project</Link> 
        </li>
        <li>
          <Link to="/leader/leaderhome/project_task">Tasks</Link>
        </li>
         <li>
          <Link to="/leader/leaderhome/requests">Requests</Link>
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

export default Leadernav
