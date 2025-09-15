import React from 'react'
import { Link } from 'react-router-dom'
import Leadernav from './Leadernav';

function Allrequests() {
  const id=localStorage.getItem('id');
  return (
    <div>
       <div className='navclass'>
        <Leadernav />
      </div>
        <div className="fullgrid mt-19 mx-10 gap-7 my-6 -100 p-20">
            <div className="card col-span-4 row-span-4  rounded-2xl  bg-linear-to-bl from-blue-500 to-purple-700 hover:scale-110 duration-300">
          <Link to="/leader/leaderhome/allreq/requests/" className='w-full h-[25rem]    flex justify-center items-center  '><label htmlFor="" className=' '  >New Requests</label></Link>
            </div>
            <div className="card col-span-4 row-span-4 rounded-2xl bg-linear-to-bl from-red-500 to-red-600    hover:scale-110 duration-300">
          <Link to="/leader/leaderhome/allreq/rejected" className='w-full h-full flex justify-center items-center '><label htmlFor="">rejected</label></Link>
            </div>
            <div className="card col-span-4 row-span-4 rounded-2xl bg-linear-to-bl from-green-500 to-green-600 hover:scale-110 duration-300">
          <Link to="/leader/leaderhome/allreq/accepted" className='w-full h-full    flex justify-center items-center '><label htmlFor="">Accepted</label></Link>
            </div>
        </div>
      
    </div>
  )
}

export default Allrequests
