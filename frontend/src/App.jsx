import './App.css';
import Login from './components/login';
import { Route, Routes } from 'react-router-dom';
import Admin from './components/admin/Admin';
import Leader from './components/leader/Leader';
import Member from './components/member/Member';
import Viewproject from './components/admin/viewproject';
import Nav from './components/nav';

function App() {

  return (
    <>
    <Nav />
      <Routes>
        <Route path="/" element={<Login />} /> 
        <Route path="/admin/*" element={<Admin />} />
        <Route path="/leader/*" element={<Leader />} />
        <Route path="/member/*" element={<Member />} />
                {/* <Route path="/project" element={<Viewproject />} /> */}

      </Routes>
    </>
  );
}

export default App;