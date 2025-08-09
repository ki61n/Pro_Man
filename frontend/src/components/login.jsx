import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Nav from './nav';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({});
  const [register, setRegister] = useState({
    userName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  // const [position, setPosition] = useState({x: 0, y: 0});
    const [isSignup, setIsSignup] = useState(false);


  const navigate = useNavigate();

  const validation = () => {
    const newErrors = {};

    if (!email.trim()) newErrors.email = 'Email is required';
    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 4) newErrors.password = 'Password must be at least 4 characters';

    return newErrors;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const validationErrors = validation();
    if (Object.keys(validationErrors).length > 0) {
      setError(validationErrors);
      return;
    }

    setError({});
    try {
      const response = await axios.post('http://localhost:3000/login', {
        email,
        password
      });

      if (response.data.error) {
        alert(response.data.error);
        return;
      }

      if (response.data.token) localStorage.setItem('token', response.data.token);
      if (response.data.id) localStorage.setItem('id', response.data.id);

      const role = response.data.userType;
      if (role === 'admin') navigate('/admin/adminhome');
      else if (role === 'leader') navigate('/leader/leaderhome');
      else if (role === 'user') navigate('/member/memberhome');
      else alert('Unknown role');

    } catch (error) {
      alert('Login failed');
      console.log(error);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const regErrors = {};
    if (!register.userName.trim()) regErrors.name = 'Name is required';
    if (!register.email.trim()) regErrors.email = 'Email is required';
    if (!register.password) regErrors.password = 'Password is required';
    if (register.password !== register.confirmPassword)
      regErrors.confirmPassword = 'Passwords do not match';

    if (Object.keys(regErrors).length > 0) {
      setError(regErrors);
      return;
    }

    setError({});
    try {
      const response = await axios.post('http://localhost:3000/register', {
        userName: register.userName,
        email: register.email,
        password: register.password
      });

      if (response.data.error) {
        alert(response.data.error);
        return;
      }

      alert('Registration successful!');
      setRegister({ userName: '', email: '', password: '', confirmPassword: '' });
      moveleft();
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Registration failed');
    }
  };

  const moveright = (e) => {
    e.preventDefault();
    setPosition(prev=>({...prev, x: prev.x + 1}));
  };
const moveleft=(e)=>{
        e.preventDefault();
        setPosition(prev=>({...prev, x: prev.x - 1}));

}
  return (



    
    <div className="min-h-screen flex  items-center justify-center bg-blue-100 px-4 py-10">
      {/* <Nav /> */}
      <div  className={`
          absolute top-0 left-0 w-full h-full bg-white
          flex flex-col items-center justify-center
          transition-transform duration-500 ease-in-out
          ${isSignup ? "-translate-x-full" : "translate-x-0"}
        `}
      >
      <h1 className="text-4xl font-bold mb-8">Login Page</h1>


      {/* Login Form */}
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md w-full max-w-md mb-10">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>

        <label>Email</label>
        <input
          type="text"
          className="w-full border p-2 mb-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {error.email && <p className="text-red-500">{error.email}</p>}

        <label>Password</label>
        <input
          type="password"
          className="w-full border p-2 mb-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error.password && <p className="text-red-500">{error.password}</p>}

        <button className="bg-blue-500 text-white w-full py-2 mt-4 rounded">Login</button>
        <label >dont have an account?</label>
        <button className="bg-blue-500 text-white w-full py-2 mt-4 rounded"
        onClick={(e) =>{ e.preventDefault(); setIsSignup(true)}}>Signup</button>

      </form>
    </div>
<div className={`
          absolute top-0 left-0 w-full h-full bg-gray-50
          flex flex-col items-center justify-center
          transition-transform duration-500 ease-in-out
          ${isSignup ? "translate-x-0" : "translate-x-full"}
        `}
      >
      {/* Registration Form */}
      <form onSubmit={handleRegister} className="bg-white p-6 rounded shadow-md w-full max-w-md ">
        <h2 className="text-2xl font-semibold mb-4">Register</h2>

        <label>Name</label>
        <input
          type="text"
          className="w-full border p-2 mb-2"
          value={register.userName}
          onChange={(e) => setRegister({ ...register, userName: e.target.value })}
        /> 
        {error.name && <p className="text-red-500">{error.name}</p>}

        <label>Email</label>
        <input
          type="text"
          className="w-full border p-2 mb-2"
          value={register.email}
          onChange={(e) => setRegister({ ...register, email: e.target.value })}
        />
        {error.email && <p className="text-red-500">{error.email}</p>}

        <label>Password</label>
        <input
          type="password"
          className="w-full border p-2 mb-2"
          value={register.password}
          onChange={(e) => setRegister({ ...register, password: e.target.value })}
        />
        {error.password && <p className="text-red-500">{error.password}</p>}

        <label>Confirm Password</label>
        <input
          type="password"
          className="w-full border p-2 mb-2"
          value={register.confirmPassword}
          onChange={(e) => setRegister({ ...register, confirmPassword: e.target.value })}
        />
        {error.confirmPassword && <p className="text-red-500">{error.confirmPassword}</p>}

        <button className="bg-green-500 text-white w-full py-2 mt-4 rounded">Register</button>
        <label >go to login</label>
        <button className="bg-green-500 text-white w-full py-2 mt-4 rounded" onClick={(e) => { e.preventDefault(); setIsSignup(false); }}>login</button>

      </form>
    </div>
    </div>
  );
}

export default Login;




// import { useState } from "react";

// export default function AuthPage() {
//   const [isSignup, setIsSignup] = useState(false);

//   return (
//     <div className="relative w-full h-screen bg-gray-100 overflow-hidden">
//       {/* Login Container */}
//       <div
//         className={`
//           absolute top-0 left-0 w-full h-full bg-white
//           flex flex-col items-center justify-center
//           transition-transform duration-500 ease-in-out
//           ${isSignup ? "-translate-x-full" : "translate-x-0"}
//         `}
//       >
//         <h1 className="text-3xl font-bold mb-6">Login</h1>
//         <input
//           type="email"
//           placeholder="Email"
//           className="border border-gray-300 p-2 mb-4 w-64 rounded"
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           className="border border-gray-300 p-2 mb-6 w-64 rounded"
//         />
//         <button className="bg-blue-500 text-white px-6 py-2 rounded">
//           Login
//         </button>
//         <p className="mt-4">
//           Don't have an account?{" "}
//           <button
//             onClick={() => setIsSignup(true)}
//             className="text-blue-500 underline"
//           >
//             Sign up
//           </button>
//         </p>
//       </div>

//       {/* Register Container */}
//       <div
//         className={`
//           absolute top-0 left-0 w-full h-full bg-gray-50
//           flex flex-col items-center justify-center
//           transition-transform duration-500 ease-in-out
//           ${isSignup ? "translate-x-0" : "translate-x-full"}
//         `}
//       >
//         <h1 className="text-3xl font-bold mb-6">Register</h1>
//         <input
//           type="text"
//           placeholder="Username"
//           className="border border-gray-300 p-2 mb-4 w-64 rounded"
//         />
//         <input
//           type="email"
//           placeholder="Email"
//           className="border border-gray-300 p-2 mb-4 w-64 rounded"
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           className="border border-gray-300 p-2 mb-6 w-64 rounded"
//         />
//         <button className="bg-green-500 text-white px-6 py-2 rounded">
//           Sign Up
//         </button>
//         <p className="mt-4">
//           Already have an account?{" "}
//           <button
//             onClick={() => setIsSignup(false)}
//             className="text-green-500 underline"
//           >
//             Login
//           </button>
//         </p>
//       </div>
//     </div>
//   );
// }
