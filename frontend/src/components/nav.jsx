import React from 'react'
import { Link } from 'react-router-dom'

function Nav() {
  return (
     <div className="flex">
      <ul className="flex gap-3">
        <li>
          <Link to="/">Home</Link> 
        </li>
        <li>
          <Link to="/projects">Project</Link> 
        </li>
        <li>
          <Link to="/Contacts">Contacts</Link>
        </li>
         <li>
          <Link to="/faq">FAQ</Link>
        </li>
        <li>
         
        </li>
      </ul>
    </div>
  )
}

export default Nav
