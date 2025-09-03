import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Leadernav from './Leadernav'
import Lproject from './Lproject'
import ViewLproject from './ViewLproject'
import Addteam from './Addteam'
import Leaderhome from './Leaderhome'
import Updateteammembers from './Updateteammembers'
import Tasks from './Tasks'
import Projecttask from './Projecttask'
import Taskmember from './Taskmember'
import ViewTasks from './ViewTasks'
import UpdateTask from './UpdateTask'
import Leadereq from './leaderreq'
import Respond from './Respond'
import Allrequests from './Allrequests'
import Acceptedreq from './Acceptedreq'
import Rejectedreq from './Rejectedreq'
import Rejdetails from './rejdetails'
import Leaderrequest from './Leaderrequest'

function Leader() {
  return (
    <div>

      <Routes>
        <Route path='/leaderhome' element={<Leaderhome />} />
        <Route path='leaderhome/lproject' element={<Lproject />} />     
         <Route path='leaderhome/lproject/lprodetails/:id' element={<ViewLproject />} />
         <Route path='leaderhome/lproject/lprodetails/:id/addteam/:id' element={<Addteam />} />
          <Route path='leaderhome/lproject/lprodetails/:id/updateteam/:id' element={<Updateteammembers />} />

         <Route path='/leaderhome/project_task' element={<Projecttask/>}/>
         <Route path='/leaderhome/project_task/projectmembers/:id' element={<Taskmember />} />
          <Route path='leaderhome/project_task/projectmembers/:id/addtasks/:mid' element={<Tasks/>}/>
          <Route path='leaderhome/project_task/projectmembers/:id/viewtasks/:mid' element={<ViewTasks/>}/>
          <Route path='leaderhome/project_task/projectmembers/:id/updatetasks/:mid' element={<UpdateTask/>}/>
         
         <Route path='leaderhome/allreq' element={<Allrequests />} /> 
         <Route path='leaderhome/allreq/requests' element={<Leadereq />} /> 
          <Route path='leaderhome/allreq/accepted' element={<Acceptedreq />} /> 
           <Route path='leaderhome/allreq/rejected' element={<Rejectedreq />} /> 
          <Route path='leaderhome/requests/replay/:id' element={<Respond   />} /> 
          <Route path='leaderhome/requests/view/:id' element={<Rejdetails   />} /> 

        <Route path='leaderhome/lproject/request/:pid' element={<Leaderrequest />} />     

      </Routes>
    </div>
  )

  
}

export default Leader
