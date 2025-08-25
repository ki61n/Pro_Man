import React from 'react'
import { Link } from 'react-router-dom'
import logo1 from '../assets/logo1.png'
function Nav() {
  return (
     <div className="flex h-20 bg-amber-100 items-center sm:bg-black text-white ">
      <ul className="flex gap-3 p-8 w-full items-center">
        <li>
                  <Link to="/">
                    <img src={logo1} alt="Logo" className="h-13 hover:scale-110 transition-transform duration-300 rounded-2xl" />
                  </Link>
                </li>
        <li>
          <Link to="/">Home</Link> 
        </li>
         
        <li>
          <Link to="/about">About Us</Link>
        </li>
        <li>
        </li>
         <li>
          <Link to="/faq">FAQ</Link>
        </li>
        <li>
         
        </li>
        <li className='ml-auto'>
          <Link to="/Login">Login</Link> 
        </li>
      </ul>
    </div>
  )
}

export default Nav
