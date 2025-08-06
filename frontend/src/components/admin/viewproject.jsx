// import React, { useEffect, useState } from 'react'

// function Viewproject() {
//     const [data,setData]=useState([])
//     useEffect(()=>{
//         const fetchprojects=async ()=>{
//             try{
//         const {data:responce}=await axios.get('http://localhost:3000/viewprojects')
//             setData(responce)
//         }catch(error){
//             console.error(error.message);
//         }
//     }
//     fetchprojects()
// },[])
        
    


    
//   return (
//     <div>        
//       <h1> view project</h1>
              

//       <div className="grid grid-cols-12" >
//         {data.map((r,i)=>(
//       <div className='card flex flex-col justify-around items-baseline gap-5' key={i} >
//         <h2>Project name: {r.projectName}</h2>
//         <p>Project Description: {r.projectDescription}</p>
//         <button className='btn1'>view project</button>

//       </div>
//       ))}
//       </div>      

//     </div>
//   )
// }

// export default Viewproject

import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import axios
import { useNavigate } from 'react-router-dom';

function Viewproject() {
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

  return (
    <div>
      <h1>View Project</h1>
      <div className="fullgrid" >
        {data.map((r, i) => (
          <div className="card flex flex-col justify-around max-w-[50rem] gap-5 col-span-4" key={i}>
            <h2>Project Name: {r.projectName}</h2>
            <p>Project Description: {r.projectDescription}</p>
            <button className="btn1" onClick={()=>{ navigate(`viewproject/${r._id}`)}}>View Project</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Viewproject;
