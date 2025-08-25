import React, { useEffect, useState } from 'react'
import logo2 from '../../assets/logo2.png'
import Adminnav from './Adminnav'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import addpro from '../../assets/addpro.jpg'
function Adminhome() {
  const [data, setData] = useState([]); // Initialize as an empty array
  const navigate=useNavigate()
    useEffect(() => {
      const fetchProjects = async () => {
        try {
          const { data: response } = await axios.get('http://localhost:3000/viewprojects'); // Fixed spelling
          setData(response);
          console.log(response);
          
        } catch (error) {
          console.error(error.message);
        }
      };
      fetchProjects();
    }, []);
    const [hover,setHover] = useState(false);

  return (
    <div className='overflow-x-hidden '>
      <div className=' w-full absolute top-0 h-[48%]'>
        <img src={logo2} alt="Admin" className={`w-full h-full object-cover`} />
        <div className='flex justify-end sm:justify-center'><h1 className='   transform -translate-y-7/3 lg:-translate-y-7/4 lg:text-4xl  sm:translate-x-30 text-white   font-bold text-xl sm:text-3xl  '><span className='text-xl font-light'> New way to <br /> </span> manage your projects</h1></div>


      </div>
      
      <div className='flex  flex-col max-sm:flex-row  items-center bg-[rgba(57,57,57,0.22)] text-white w-full gap-6'>
        
        <div className='navclass'>
        <Adminnav/></div>
          
       
                 

      
    </div>
    <p className='text-5xl text-amber-800 h-[46vh] '>  .</p>
    {/* <p>Welcome to the admin dashboard</p> */}
    <div className='flex flex-col gap-4 mx-5 sm:mx-14'>
{/* <div className=' fullgrid shadow-blue-300 ring-1 ring-slate-70/5 rounded-2xl shadow-2xl p-3 gap-9 w-full'>

  <img src={addpro} alt="Add Project" className={`rounded-xl bg-cover h-max  w-full  ${window.innerWidth <= 460 ? 'col-span-9' : 'col-span-12'}`} />
  <h2 className='text-5xl font-black  text-black transform translate-x-3 translate-y-1 font-[Poppins, sans-serif] w-max border-2
   col-span-12 '>Add Project</h2>

<div className=' flex flex-col gap-7 col-start-1 col-end-12 mr-[70px] border-2 w-full'>
  <p className='w-full'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique reprehenderit placeat eos optio fugiat ullam ratione voluptatibus ut nihil? Aut possimus ducimus voluptates fuga rem totam aliquam ab consectetur quibusdam.</p>
  <button className='btn1 w-full h-20' onClick={() => navigate('/admin/adminhome/addproject')}>Add Project</button>
  </div>

</div> */}

<div className="grid grid-cols-1 lg:grid-cols-12 gap-6 shadow-blue-300 ring-1 ring-slate-700/5 rounded-2xl shadow-2xl p-4 w-full mt-20">
  
  {/* Image */}
  <div className="sm:col-span-5 ">
    <img
      src={addpro}
      alt="Add Project"
      className="rounded-xl w-full h-auto object-cover"
    />
  </div>

  {/* Text Content */}
  <div className="sm:col-span-7 flex flex-col justify-center gap-5">
    <h2 className="text-3xl sm:text-5xl font-black text-black font-[Poppins,sans-serif]">
      Add Project
    </h2>
    <p className="text-sm sm:text-base text-gray-800">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique
      reprehenderit placeat eos optio fugiat ullam ratione voluptatibus ut
      nihil? Aut possimus ducimus voluptates fuga rem totam aliquam ab
      consectetur quibusdam.
    </p>
    <button
      className="btn1 w-full sm:w-full h-14 sm:h-16"
      onClick={() => navigate('/admin/adminhome/addproject')}
    >
      Add Project
    </button>
  </div>

</div>

    <h2 className='text-2xl font-bold text-black transform translate-x-10 translate-y-1 font-[Poppins, sans-serif]'>Project List</h2>

    <div className={`overflow-x-auto ring-1  ${hover ? '' :'scrollbar-hide' } ring-slate-700/5 rounded-2xl shadow-2xl p-5  px-1 pb-8  `} onMouseEnter={ () => setHover(true)} onMouseLeave={() => setHover(false)}>
  <div className="flex gap-4 min-w-max ">
    {data.map((r, i) => (
      <div
        className="card rounded-2xl p-4  border w-80 h-60 flex-shrink-0 overflow-hidden transition-transform duration-300 font-[Poppins, sans-serif] hover:scale-105"
        key={i}
      >
        <h2> {r.projectName}</h2>
        <div>Project Description: <p className='h-25 overflow-y-scroll scrollbar-hide'>{r.projectDescription}</p></div>
        <button
          className="btn1"
          onClick={() => navigate(`/admin/adminhome/project/viewproject/${r._id}`)}
        >
          View Project
        </button>
      </div>
    ))}
  </div>
</div>
</div> 


  <div className='w-full h-[15rem] bg-[#000000] mt-20'>
          
        </div>
    </div>
  )
}

export default Adminhome



