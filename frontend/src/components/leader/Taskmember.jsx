// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import Leadernav from './Leadernav';

// function Taskmember() {
//   const { id } = useParams();
//   const [mem, setMem] = useState([]); // initialize as empty array
// const navigate=useNavigate()
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(`http://localhost:3000/viewMembersById/${id}`);
//         // const data = await response.json(); // parse the JSON from the fetch response
//         setMem(response.data); // set the parsed data
//         console.log(response.data);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchData();
//   }, [id]);

//   return (
    
//     <div>
//        <div className='navclass'>
//         <Leadernav />
//       </div>
//       <div className='mt-19 mx-15'>
//         <h1 className='mx-5 text-5xl'>Task Members</h1>
//       <div className="fullgrid flex gap-5">
//         {mem?.map((r, i) => (
//           <React.Fragment key={i}>
//             {r.asignMembers.map((member, j) => (
//               <div className="minicard w-[15rem] h-[20rem] p-5 grid gap-5 rounded-3xl bg-linear-to-br from-red-600 to to-blue-600" key={member._id || j}>
//                 <h1 className='text-2xl'>{member.userName}</h1>
//                 <button className='btn1' onClick={()=>{navigate(`/leader/leaderhome/project_task/projectmembers/${id}/addtasks/${member._id}`)}}>add task</button>
//                 <button className='btn1' onClick={()=>{navigate(`/leader/leaderhome/project_task/projectmembers/${id}/viewtasks/${member._id}`)}}>view task</button>
//                 <button className='btn1'onClick={()=>{navigate(`/leader/leaderhome/project_task/projectmembers/${id}/updatetasks/${member._id}`)}}>update task</button>
//               </div>
//             ))}
//           </React.Fragment>
//         )) || <p className='text-8xl text-red-500 mt-15'>No members assigned.</p>}
        
//       </div>
//       </div>
//     </div>

//   );
// }

// export default Taskmember;


import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Leadernav from './Leadernav';

function Taskmember() {
  const { id } = useParams();
  const [mem, setMem] = useState([]); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/viewMembersById/${id}`);
        setMem(response.data || []);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div>
      <div className="navclass">
        <Leadernav />
      </div>

      <div className="mt-19 mx-15">
        <h1 className="mx-5 text-5xl">Task Members</h1>

        <div className="fullgrid flex gap-5 flex-wrap">
          {mem.length > 0 ? (
            mem.map((r, i) => (
              <React.Fragment key={i}>
                {r.asignMembers?.length > 0 ? (
                  r.asignMembers.map((member, j) => (
                    <div
                      className="minicard w-[15rem] h-[20rem] p-5 grid gap-5 rounded-3xl bg-gradient-to-br from-red-600 to-blue-600 text-white shadow-lg"
                      key={member._id || j}
                    >
                      <h1 className="text-2xl">{member.userName}</h1>
                      <button
                        className="btn1"
                        onClick={() =>
                          navigate(
                            `/leader/leaderhome/project_task/projectmembers/${id}/addtasks/${member._id}`
                          )
                        }
                      >
                        Add Task
                      </button>
                      <button
                        className="btn1"
                        onClick={() =>
                          navigate(
                            `/leader/leaderhome/project_task/projectmembers/${id}/viewtasks/${member._id}`
                          )
                        }
                      >
                        View Task
                      </button>
                      <button
                        className="btn1"
                        onClick={() =>
                          navigate(
                            `/leader/leaderhome/project_task/projectmembers/${id}/updatetasks/${member._id}`
                          )
                        }
                      >
                        Update Task
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-lg text-gray-500">No members assigned.</p>
                )}
              </React.Fragment>
            ))
          ) : (
            <p className="text-2xl text-red-500 mt-15">No members found for this project.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Taskmember;
