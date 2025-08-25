// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import Adminnav from './Adminnav';

// function Viewprojectbyid() {
//   const { id } = useParams();
//   console.log(id);

//   const [data, setData] = useState({});
//   const navigate=useNavigate()
//   useEffect(() => {
//     const projectdata = async () => {
//       try {
//         const response = await axios.get(`http://localhost:3000/viewproject/${id}`);
//         setData(response.data);
//         console.log(response.data);
//       } catch (error) {
//         console.error(error.message);
//       }
//     };
//     projectdata();
//   }, [id]);

//  if (data.dueDate !== undefined) {
//   var date= data.dueDate.split('T')[0];
//    // Output: "2025-08-22"
// } else {
//   console.error("The timestamp variable is undefined");
// }
// console.log(date);

//   return (
//     <div className='font-sans'>
//       <div className='navclass font-serif  '>
//         <Adminnav/></div>
//         <div className='flex justify-center items-center h-full md:grid grid-cols-12 w-screen mt-22 '>
//         <div className=' grid grid-cols-12 gap-4 p-4 bg-blue-100 rounded-lg shadow-lg w-full  col-start-2 col-span-10'>
//       <div className='col-start-1 col-end-13  flex py-2 pb-3 font-serif '><h1 className='mx-auto text-5xl font-bold  text-shadow-purple-400 '>
//         {data.projectName}</h1></div>
//       <div className= 'col-start-1  col-span-7 row-span-8  bg-amber-500 px-16 py-10  h-[28rem] rounded-3xl overflow-hidden'>
//         <h2 className='font-bold mb-5'>Project Description:</h2><div className='overflow-y-scroll scrollbar-hide h-[90%] m-3 transition-transform '> <p className=''>{data.projectDescription}</p></div></div>
//       <div className='col-start-8  col-span-5 row-span-2  bg-blue-400 px-[5%] py-6 rounded-2xl'>
//         <h2 className='font-bold '>Due Date:</h2> { date}</div>
//       <div className='col-start-8  col-span-5 row-span-2  bg-amber-200 px-[5%] py-6 rounded-2xl'>
//         <h2 className='font-bold '>Leader Assigned:</h2> {data.leaderAssigned ? data.leaderAssigned.userName : 'Not Assigned'}</div>
//       <div className='col-start-8  col-span-5 row-span-2 bg-emerald-400 px-[5%] py-6 rounded-2xl'>
//         <h2 className='font-bold '>Maximum Members:</h2> {data.maxMembers}</div>
//       <div className='col-start-8  col-span-5 row-span-2  bg-pink-400 px-[5%] py-6 rounded-2xl'>
//         <h2 className='font-bold '>Status:</h2> {data.projectStatus}</div>
//       <button className='col-start-4 btn1' onClick={()=>{navigate(`updateproject/${id}`)}}>update</button>
//       <button className='col-start-8 btn1 hover:bg-emerald-400'>update status</button>
//     </div></div>
//     <div>
//       <h1>update status</h1>
//       <select name="" id="">
//         <option value="">in progress</option>
//         <option value="">completed</option>
//       </select>
      


//     </div>
//     </div>
//   );
// }

// export default Viewprojectbyid;


import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Adminnav from './Adminnav';

function Viewprojectbyid() {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [click, setClick] = useState(false);
  const navigate = useNavigate();

  // Fetch project data
  useEffect(() => {
    const projectdata = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/viewproject/${id}`);
        setData(response.data);
        setStatus(response.data.projectStatus); // pre-fill current status
      } catch (error) {
        console.error(error.message);
      }
    };
    projectdata();
  }, [id]);

  let date = "";
  if (data.dueDate !== undefined) {
    date = data.dueDate.split('T')[0];
  }

  // Update Status API
  const handleStatusUpdate = async () => {
    if (!status) return;
    setLoading(true);
    try {
      const response = await axios.put(`http://localhost:3000/updatepro/${id}`, {
        projectStatus: status
      });
      setData(response.data); // update UI with new data
      alert("Project status updated successfully ✅");
    } catch (error) {
      console.error(error.message);
      alert("Failed to update status ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='font-sans overflow-x-hidden'>
      <div className='navclass font-serif'>
        <Adminnav />
      </div>

      <div className='flex justify-center items-center h-full md:grid grid-cols-12 w-screen mt-22'>
        <div className='grid grid-cols-12 gap-4 p-4 bg-blue-100 rounded-lg shadow-lg w-full col-start-2 col-span-10'>

          {/* Project Name */}
          <div className='col-start-1 col-end-13 flex py-2 pb-3 font-serif'>
            <h1 className='mx-auto text-5xl font-bold text-shadow-purple-400'>
              {data.projectName}
            </h1>
          </div>

          {/* Project Description */}
          <div className={`col-start-1 col-span-7 row-span-8 bg-amber-500 px-16 py-10 h-[28rem] rounded-3xl overflow-hidden ${click ? 'scale-100 absolute top-22 w-[81.5%] h-[80%]' : 'scale-100'}`} onClick={() => setClick(!click)} >
            <h2 className='font-bold mb-5'>Project Description:</h2>
            <div className={`overflow-y-scroll scrollbar-hide h-[90%] m-3 transition-transform `}>
              <p>{data.projectDescription}</p>
            </div>
          </div>

          {/* Due Date */}
          <div className='col-start-8 col-span-5 row-span-2 bg-blue-400 px-[5%] py-6 rounded-2xl'>
            <h2 className='font-bold'>Due Date:</h2> {date}
          </div>

          {/* Leader */}
          <div className='col-start-8 col-span-5 row-span-2 bg-amber-200 px-[5%] py-6 rounded-2xl'>
            <h2 className='font-bold'>Leader Assigned:</h2>
            {data.leaderAssigned ? data.leaderAssigned.userName : 'Not Assigned'}
          </div>

          {/* Max Members */}
          <div className='col-start-8 col-span-5 row-span-2 bg-emerald-400 px-[5%] py-6 rounded-2xl'>
            <h2 className='font-bold'>Maximum Members:</h2> {data.maxMembers}
          </div>

          {/* Status */}
          <div className='col-start-8 col-span-5 row-span-4 bg-pink-400 px-[5%] py-6 rounded-2xl'>
            <h2 className='font-bold mb-2'>Status:</h2>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full p-2 rounded-lg outline-none"
            >
              <option value=''disabled >current ststus : {data.projectStatus}</option>
              <option value="in progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
            <button
              onClick={handleStatusUpdate}
              disabled={loading}
              className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition disabled:bg-gray-400"
            >
              {loading ? "Updating..." : "Update Status"}
            </button>
          </div>

          {/* Buttons */}
          <button
            className='row-start-10 col-span-7   w-full h-full btn1'
            onClick={() => { navigate(`updateproject/${id}`) }}
          >
            Update Project
          </button>

        </div>
      </div>
    </div>
  );
}

export default Viewprojectbyid;
