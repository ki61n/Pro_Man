import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Ensure axios is imported

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({});
  const [data, setData] = useState('');
  const navigate = useNavigate(); // Correct usage of useNavigate

  const validation = () => {
    const newErrors = {};
    if (!email.trim()) newErrors.email = 'Email is required';
    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 4) newErrors.password = 'Password must be at least 4 characters';
    return newErrors;
  };

  const handlelogin = async (e) => {
    e.preventDefault();
    const validationErrors = validation();
    if (Object.keys(validationErrors).length > 0) {
      setError(validationErrors);
      return;
    }
    setError({});
    try {
      const response = await axios.post('http://localhost:3000/login', {
        email: email,
        password: password,
      });
      setData(response.data);

      if (response.data.error) {
        alert(response.data.error);
        return;
      }
      if (response.data.token) {
        localStorage.setItem('token', response.data.token); // Fixed typo
      }
      if (response.data.id) {
        localStorage.setItem('id', response.data.id);
      }
      if (response.data.userType === 'admin') {
        navigate('/admin/adminhome');
        console.log("admin panel");
        
      } else if (response.data.userType === 'leader') {
        navigate('/leader/leaderhome');
        console.log("leader panel");
      } else if (response.data.userType === 'user') {
        navigate('/member/memberhome');
        console.log("user panel");
      } else {
        alert('Unknown role or login failed');
      }
    } catch (error) {
      alert('Login failed');
      console.log(error);
    }
  };

  return (
    <div>
      <div className="flex justify-center items-center h-[100svh] bg-blue-100 flex-col gap-[50px]">
        <h1 className="text-5xl font-bold">Login Page</h1>
        <form onSubmit={handlelogin} className="formcss">
          <span>Email</span>
          <input
            type="text"
            name="email"
            placeholder="email"
            className="input-fields"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {error.email && <div className="error-text">{error.email}</div>}
          <br />
          <span>Password</span>
          <input
            type="password"
            name="password"
            placeholder="password"
            className="input-fields"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error.password && <div className="error-text">{error.password}</div>}
          <br />
          <button className="btn1">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;