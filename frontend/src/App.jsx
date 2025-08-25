import './App.css';
import Login from './components/login';
import { Route, Routes } from 'react-router-dom';
import Admin from './components/admin/Admin';
import Leader from './components/leader/Leader';
import Member from './components/member/Member';
import Viewproject from './components/admin/viewproject';
import Nav from './components/nav';
import Home from './components/Home';
import Aboutas from './components/Aboutas';
import Faq from './components/Faq';

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} /> 
        <Route path="/about" element={<Aboutas />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/admin/*" element={<Admin />} />
        <Route path="/leader/*" element={<Leader />} />
        <Route path="/member/*" element={<Member />} />
                {/* <Route path="/project" element={<Viewproject />} /> */}

      </Routes>
    </>
  );
}

export default App;