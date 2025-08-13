import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Adminnav from './Adminnav'
import Viewproject from './viewproject'
import Viewprojectbyid from './Viewprojectbyid'
import Updateproject from './Updateproject'
import Adminhome from './Adminhome'

function Admin() {
  return (
    <div className='flex flex-col max-sm:flex-row'>
        <Adminnav/>
        <Routes>
            {/* Define routes relative to /admin */}
            <Route path="/adminhome" element={<Adminhome />} /> 
            <Route path="adminhome/project/" element={<Viewproject />} /> {/* Nested route */}
            <Route path="adminhome/project/viewproject/:id" element={<Viewprojectbyid />} /> 
            <Route path="adminhome/project/viewproject/:id/updateproject/:id" element={<Updateproject />} /> 

        </Routes>
      
    </div>
  )
}

export default Admin
