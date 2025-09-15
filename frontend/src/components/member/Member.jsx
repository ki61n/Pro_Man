import Membernav from './membernav'
import { Route, Routes } from 'react-router-dom'
import Memberhome from './Memberhome'
import MemTasks from './MemTasks'
import Requests from './Requests'
import Myrequests from './Myrequests'
import Reqres from './Reqres'
import Viewtask from './viewtask'

function Member() {
  return (
    <div>
      
      <Routes>
        <Route path="/memberhome" element={<Memberhome/>} />
        <Route path='/memberhome/memtask' element={<MemTasks/>} />
        <Route path='/memberhome/memtask/task/:pid/:id' element={<Viewtask/>} />
        <Route path='/memberhome/requests' element={<Myrequests/>} />
        <Route path='/memberhome/sendrequests/:tid/:lid' element={<Requests/>} />
        <Route path='/memberhome/myrequests/:tid/:lid' element={<Reqres/>} />
      </Routes>
    </div>
  )
}

export default Member
