import Membernav from './membernav'
import { Route, Routes } from 'react-router-dom'
import Memberhome from './Memberhome'
import MemTasks from './MemTasks'
import Requests from './Requests'

function Member() {
  return (
    <div>
      <Membernav/>
      <Routes>
        <Route path="/memberhome" element={<Memberhome/>} />
        <Route path='/memberhome/memtask' element={<MemTasks/>} />
        <Route path='/memberhome/requests/:tid/:lid' element={<Requests/>} />
      </Routes>
    </div>
  )
}

export default Member
