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
        <div className="fullgrid mt-19">
            <div className="card">
          <Link to="/leader/leaderhome/allreq/requests/">Requests</Link>
            </div>
            <div className="card">
          <Link to="/leader/leaderhome/allreq/rejected">rejected</Link>
            </div>
            <div className="card">
          <Link to="/leader/leaderhome/allreq/accepted">Accepted</Link>
            </div>
        </div>
      
    </div>
  )
}

export default Allrequests
