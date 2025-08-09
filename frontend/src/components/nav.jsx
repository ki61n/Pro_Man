import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Nav() {
   const navigate=useNavigate()
  return (
     <div className="flex">
      <ul className="flex gap-3">
        <li>
          <Link to="">Home</Link> 
        </li>
        <li>
          <Link to="">Project</Link> 
        </li>
        <li>
          <Link to="">Tasks</Link>
        </li>
         <li>
          <Link to="">Requests</Link>
        </li>
        <li>
         
        </li>
      </ul>
    </div>
  )
}

export default Nav
