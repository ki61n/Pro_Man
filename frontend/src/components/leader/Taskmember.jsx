import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function Taskmember() {
  const { id } = useParams();
  const [mem, setMem] = useState([]); // initialize as empty array
const navigate=useNavigate()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/viewMembersById/${id}`);
        // const data = await response.json(); // parse the JSON from the fetch response
        setMem(response.data); // set the parsed data
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  return (
    
    <div>
      <h1>Task Members</h1>
      <div className="fullgrid">
        {mem.map((r, i) => (
          <React.Fragment key={i}>
            {r.asignMembers.map((member, j) => (
              <div className="minicard" key={member._id || j}>
                <h1>{member.userName}</h1>
                <button className='btn1' onClick={()=>{navigate(`/leader/leaderhome/project_task/projectmembers/${id}/addtasks/${member._id}`)}}>add task</button>
                <button className='btn1' onClick={()=>{navigate(`/leader/leaderhome/project_task/projectmembers/${id}/viewtasks/${member._id}`)}}>view task</button>
                <button className='btn1'onClick={()=>{navigate(`/leader/leaderhome/project_task/projectmembers/${id}/updatetasks/${member._id}`)}}>update task</button>
              </div>
            ))}
          </React.Fragment>
        ))}
        
      </div>
    </div>

  );
}

export default Taskmember;
