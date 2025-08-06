// import axios from 'axios'
// import React, { useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom'

// function Addteam() {
//   const[data,setData]=useState([])
//   const[addmember,setAddmember]=useState([])
//   const[mem,setmem]=useState({})
//   const {id}=useParams()
//   useEffect(()=>{
//     const members=async ()=> {
//       try{
//         const responce=await axios.get('http://localhost:3000/viewmembers')
//         setData(responce.data)
//         console.log(responce.data);
        
//       }
//       catch(error){
//         console.error(error);
        
//       }
//     }
//     const viewteam=async ()=>{
//       try{
//         const memrequest=await axios.get(`http://localhost:3000/viewMembersById/${id}`)
//         setmem(memrequest.data)
//         console.log(memrequest.data);
        
//     }
//     catch(error){
//       console.error(error);

//   }
// }
//     members()
//     viewteam()
//   },[])
// // console.log(memrequest.data.asignMembers.userName);

//   const handleCheckboxChange = (e) => {
//     const value = e.target.value;

//     setAddmember((prev) => {
//       if (prev.includes(value)) {
//         // If already selected, remove it
//         return prev.filter((id) => id !== value);
//       } else {
//         // If not selected, add it
//         return [...prev, value];
//       }
//     });
//   };

// const handleSubmit=async (e)=>{
//   e.preventDefault()
//   const details={
//     project:id,
//     asignMembers:addmember
//   }
//   try{
//     const responce=await axios.post('http://localhost:3000/addmembers',details)
//     console.log(responce.data);
//     alert("Team Added Successfully")
//   }
//   catch(error){
//     console.error(error);
//     alert("Error Occured")
//   }
// }


//   return (
//     <div >
//       <h1>
//         Add Teammembers
//       </h1>
//       <div className='fullgrid'>
//       {data.map((r,i)=>(
//       <div className='minicard' key={i}>
        
//         <h1>{r.userName}</h1>
//         <input type="checkbox" name="" id=""  value={r._id} onChange={handleCheckboxChange}/>
// {console.log(addmember)
// }
//       </div>
//       ))} 
//       </div>
//       <div>
//         <button className='btn1' onClick={handleSubmit}>submit</button>
//       </div>

//       <div>
//         <div>
//           <h1>Project Team</h1>
//           <div className="fullgrid">
//             {mem.asignMembers &&
//               mem.asignMembers.map((member, i) => (
//                 <div className="minicard" key={i}>
//                   <h1>{member.userName}</h1>
//                 </div>
//               ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Addteam


import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function Addteam() {
  const [user, setUSer] = useState([]); // Initialize as an empty array
  const [addmember, setAddmember] = useState([]);
  const [mem, setMem] = useState([]);
  const { id } = useParams();
  const navigate=useNavigate()

  useEffect(() => {
    const members = async () => {
      try {
        const response = await axios.get('http://localhost:3000/viewmembers');
        setUSer(response.data);
        console.log(response.data);
         const memrequest = await axios.get(`http://localhost:3000/viewMembersById/${id}`);
        setMem(memrequest.data);
        console.log(memrequest.data);
      } catch (error) {
        console.error(error);
      }
    };

   
    members();
  }, [id]);

  const handleCheckboxChange = (e) => {
    const value = e.target.value;

    setAddmember((prev) => {
      if (prev.includes(value)) {
        // If already selected, remove it
        return prev.filter((id) => id !== value);
      } else {
        // If not selected, add it
        return [...prev, value];
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const details = {
      project: id,
      asignMembers: addmember,
    };
    try {
      const response = await axios.post('http://localhost:3000/addmembers', details);
      console.log(response.data);
      alert('Team Added Successfully');
    } catch (error) {
      console.error(error);
      alert('Error Occurred');
    }
  };

  const Addmoremember=async (e)=>{
    e.preventDefault()
  }

  return (
    <div>
      <h1>Add Team Members</h1>
      <div className="fullgrid">
      {user.map((r, i) => (
          <div className="minicard" key={i}>
            <h1>{r.userName}</h1>
            <input type="checkbox" name="" id="" value={r._id} onChange={handleCheckboxChange} />
          </div>
        ))}
      </div>
      <div>
        <button className="btn1" onClick={handleSubmit}>
          Submit
        </button>

<button className='btn1' onClick={()=>{navigate(`/leader/leaderhome/lproject/lprodetails/${id}/updateteam/${id}`)}}>add more members</button>
      </div>
      <div>
        <div>
          <h1>Project Team</h1>
          <div className="fullgrid">
          {mem.map((r, i) => (
  <React.Fragment key={i}>
    {r.asignMembers.map((member, j) => (
      <div className="minicard" key={j}>
        <h1>{member.userName}</h1>
      </div>
    ))}
  </React.Fragment>
))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Addteam;