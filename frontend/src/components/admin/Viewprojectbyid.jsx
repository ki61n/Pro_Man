// import axios from 'axios';
// import React, { useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom'

// function Viewprojectbyid() {
//     const {id}= useParams()
//     console.log(id);
    
//     const [data,setData]=useState([])
//     useEffect(()=>{
//         const projectdata=async ()=>{
//         try{
//             const response=await axios.get(`http://localhost:3000/viewproject/${id}`)
//             setData(response.data)
//             console.log(response.data);
            
//         }
//         catch (error) {
//         console.error(error.message);
//       }
    
//     }
// projectdata()},[id])
//   return (
//     <div>
//         <h1>project name:{data.projectNamename}</h1>
//         <p> project description:{data.projectDescription}</p>
//         <p> duedate:{data.dueDate}</p>
//         <p>leader assigned: {data.leaderAssigned.userName}</p>
//         <p>maximum members: {data.maxMembers}</p>
//         <p>status:{data.projectStatus}</p>
//         {/* <p>leaderid : {data.leaderAssigned._id}</p> */}
      
//     </div>
//   )
// }

// export default Viewprojectbyid

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function Viewprojectbyid() {
  const { id } = useParams();
  console.log(id);

  const [data, setData] = useState({});
  const navigate=useNavigate()
  useEffect(() => {
    const projectdata = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/viewproject/${id}`);
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error.message);
      }
    };
    projectdata();
  }, [id]);

  return (
    <div>
      <h1>Project Name: {data.projectName}</h1>
      <p>Project Description: {data.projectDescription}</p>
      <p>Due Date: {data.dueDate}</p>
      <p>
        Leader Assigned: {data.leaderAssigned ? data.leaderAssigned.userName : 'Not Assigned'}
      </p>
      <p>Maximum Members: {data.maxMembers}</p>
      <p>Status: {data.projectStatus}</p>
      <button className='btn1' onClick={()=>{navigate(`updateproject/${id}`)}}>update</button>
    </div>
  );
}

export default Viewprojectbyid;