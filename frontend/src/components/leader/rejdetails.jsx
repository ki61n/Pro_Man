
// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import {  useParams } from 'react-router-dom';
// import Leadernav from './Leadernav';

// function Rejdetails() {
//   const [response, setResponse] = useState(null);
//     const [projects,setProjects]=useState('')
//   const { id } = useParams();

//   useEffect(() => {
//     const fetchResponse = async () => {
//       try {
//         const res = await axios.get(`http://localhost:3000/viewmemreqByid/${id}`);
//         if (Array.isArray(res.data) && res.data.length > 0) {
//           setResponse(res.data[0]);
//         }
//         const project=await axios.get(`http://localhost:3000/pname/${response?.task?.project}`);
//         setProjects(project.data)
//         console.log(project.data);

//         console.log(res.data);
//       } catch (error) {
//         console.error('Error fetching response:', error);
//       }
//     };
//     fetchResponse();
//   }, [id]);

  

//   if (!response) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//        <div className='navclass'>
//         <Leadernav />
//       </div>
//       <div className='mt-19 mx-15 '><h1 className='text-4xl font-bold ml-5 mb-5'>Respond</h1>
//       <div className=" bg-amber-200 p-8 rounded-2xl grid gap-5">
//        <table>
//         <tr>
//           <td> <strong>From</strong></td> <td>{response.username?.userName}</td>
//         </tr>
//         <tr>
//           <td> <strong>Project</strong></td> <td>{projects.projectName}</td>
//         </tr>
//         <tr> <td><strong>Request</strong> </td><td>{response.request}</td>
//         </tr>
//         <tr><td><strong>Status</strong> </td><td><label htmlFor="" className='text-red-600'>{response.status}</label></td>
//        </tr>
//        <tr> <td><strong>Task</strong></td> <td>{response.task?.task}</td>
//         </tr>
//         <tr><td><strong>Responce </strong></td> <td>{response.response}</td></tr>
//        </table>

      
//       </div></div>
//     </div>
//   );
// }

// export default Rejdetails;

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Leadernav from './Leadernav';

function Rejdetails() {
  const [response, setResponse] = useState(null);
  const [project, setProject] = useState(null);
  const { id } = useParams();

  // Step 1: Fetch response data
  useEffect(() => {
    const fetchResponse = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/viewmemreqByid/${id}`);
        if (Array.isArray(res.data) && res.data.length > 0) {
          setResponse(res.data[0]);
        }
        console.log(res.data);
      } catch (error) {
        console.error('Error fetching response:', error);
      }
    };
    fetchResponse();
  }, [id]);

  // Step 2: Fetch project details when response is available
  useEffect(() => {
    const fetchProject = async () => {
      if (response?.task?.project) {
        try {
          const res = await axios.get(`http://localhost:3000/pname/${response.task.project}`);
          setProject(res.data[0]);
          console.log(res.data);
        } catch (error) {
          console.error('Error fetching project:', error);
        }
      }
    };
    fetchProject();
  }, [response]);

  if (!response) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className='navclass'>
        <Leadernav />
      </div>
      <div className='mt-19 mx-15 '>
        <h1 className='text-4xl font-bold ml-5 mb-5'>Respond</h1>
        <div className="bg-amber-200 p-8 rounded-2xl grid gap-5">
          <table className="table-auto">
            <tbody>
              <tr>
                <td><strong>From</strong></td>
                <td>{response.username?.userName}</td>
              </tr>
              <tr>
                <td><strong>Project</strong></td>
                <td>{project?.projectName || "Loading..."}</td>
              </tr>
              <tr>
                <td><strong>Task</strong></td>
                <td>{response.task?.task}</td>
              </tr>
              <tr>
                <td><strong>Request</strong></td>
                <td>{response.request}</td>
              </tr>
              <tr>
                <td><strong>Status</strong></td>
                <td><label className='text-red-600'>{response.status}</label></td>
              </tr>
              
              <tr>
                <td><strong>Response</strong></td>
                <td>{response.response}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Rejdetails;
