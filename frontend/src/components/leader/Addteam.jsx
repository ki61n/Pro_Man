import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Leadernav from './Leadernav';

function Addteam() {
  const [users, setUsers] = useState([]); 
  const [filteredUsers, setFilteredUsers] = useState([]); 
  const [addmember, setAddmember] = useState([]);
  const [mem, setMem] = useState([]);
  const { id,mm } = useParams();
  const navigate = useNavigate();
  // Calculate total member cards for use in render
  const totalCards = mem.reduce((acc, r) => acc + (r.asignMembers?.length || 0), 0);
console.log(mm);

  useEffect(() => {
    const members = async () => {
      try {
        // Get all members
        const response = await axios.get('http://localhost:3000/viewtaskmembers');
        setUsers(response.data);

        // Filter only users with userType === "user"
        const filtered = response.data.filter((u) => u.userType === "user");
        setFilteredUsers(filtered);
        console.log(filtered);
        

        // Get already assigned members
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
        // remove if already selected
        return prev.filter((id) => id !== value);
      } else {
        // add if not selected
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
    if(addmember.length + totalCards > mm){
      alert(`Cannot add more than ${mm} members. You have already added ${totalCards} members.`);
      return;
    }else{
    try {
      const response = await axios.post('http://localhost:3000/addmembers', details);
      console.log(response.data);
      alert('Team Added Successfully');
    } catch (error) {
      console.error(error);
      alert('Error Occurred');
    }
  }};

  return (
    <div>
      <div className='navclass'><Leadernav/></div>
      <div  className='sm:mt-19 mx-10 my-5'>
        <h1 className='text-5xl '>Add Team Members</h1>
        {/* <div className="fullgrid gap-7 my-6 ">
          {filteredUsers.map((r, i) => (
            <div className="minicard col-span-2 p-5 hover:scale-105"  key={i}>
              <h1>{r.userName}</h1>
              <input 
                type="checkbox" 
                value={r._id} 
                className='transform scale-150 mt-3 translate-x-30'
                onChange={handleCheckboxChange} 
              />
            </div>
          ))}
        </div> */}
        <div className={`fullgrid gap-7 my-6 ${ totalCards > 0 ? "hidden" : ""}`} >
  {filteredUsers.map((r, i) => {
    const isChecked = addmember.includes(r._id);
    return (
      <label 
        key={i} 
        className={`minicard col-span-2 p-5 cursor-pointer hover:scale-105 transition 
          ${isChecked ? "bg-blue-100 border-blue-500 border-2" : ""}`}
      >
        <h1>{r.userName}</h1>
        <input 
          type="checkbox" 
          value={r._id} 
          checked={isChecked}
          onChange={handleCheckboxChange} 
          className="hidden"   // hides the actual checkbox
        />
      </label>
    );
  })}
  <button className="btn1" onClick={handleSubmit}>
            Submit
          </button>
</div>

        
        <div className='bg-blue-100 p-5 rounded-2xl'>
          <h1 className='text-3xl mt-3'>Project Team  </h1>
          <div className="fullgrid">
            
            {mem.map((r, i) => (
              <React.Fragment key={i}>
                {r.asignMembers.map((member, j) => (
                  <div className="minicard col-span-2 my-7 flex justify-center items-center bg-linear-to-t from-sky-500 to-indigo-500" key={j}>
                    <h1 className='text-xl'>{member.userName}</h1>
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
          <div className='flex gap-5 mb-10 justify-around mx-46'>

                      <h2 className="font-bold mb-2">Total Members: {totalCards}</h2>

          
          <button 
            className='btn1' 
            onClick={() => navigate(`/leader/leaderhome/lproject/lprodetails/${id}/updateteam/${id}/${mm}`)}
          >
            Add More Members
          </button>
        </div>
        </div>
      </div>
    </div>
  );
}

export default Addteam;
