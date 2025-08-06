import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Adminnav() {
  const navigate = useNavigate();
  return (
    <div className=''>
      <ul className="flex gap-3">
        <li>
          <Link to="/admin/adminhome">Home</Link> {/* Use Link for navigation */}
        </li>
        <li>
          <Link to="/admin/adminhome/project">Project</Link> {/* Use Link for navigation */}
        </li>
        <li>
          <Link to="/users">Users</Link> {/* Add route for users */}
        </li>
        <li>
          <a
            href="#"
            onClick={() => {
              localStorage.clear(); // Clear localStorage on logout
              navigate('/'); // Redirect to login page
            }}
          >
            Logout
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Adminnav;