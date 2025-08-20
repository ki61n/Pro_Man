import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Nav from "./nav";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});
  const [register, setRegister] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isSignup, setIsSignup] = useState(false);

  const navigate = useNavigate();

  // Validation for login
  const validation = () => {
    const newErrors = {};
    if (!email.trim()) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";
    else if (password.length < 4)
      newErrors.password = "Password must be at least 4 characters";
    return newErrors;
  };

  // Login handler
  const handleLogin = async (e) => {
    e.preventDefault();
    const validationErrors = validation();
    if (Object.keys(validationErrors).length > 0) {
      setError(validationErrors);
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/login", {
        email,
        password,
      });

      if (response.data.error) {
        alert(response.data.error);
        return;
      }

      if (response.data.token)
        localStorage.setItem("token", response.data.token);
      if (response.data.id) localStorage.setItem("id", response.data.id);

      const role = response.data.userType;
      if (role === "admin") navigate("/admin/adminhome");
      else if (role === "leader") navigate("/leader/leaderhome");
      else if (role === "user") navigate("/member/memberhome");
      else alert("Unknown role");
    } catch (error) {
      alert("Login failed");
      console.error(error);
    }
  };

  // Register handler
  const handleRegister = async (e) => {
    e.preventDefault();
    const regErrors = {};
    if (!register.userName.trim()) regErrors.name = "Name is required";
    if (!register.email.trim()) regErrors.email = "Email is required";
    if (!register.password) regErrors.password = "Password is required";
    if (register.password !== register.confirmPassword)
      regErrors.confirmPassword = "Passwords do not match";

    if (Object.keys(regErrors).length > 0) {
      setError(regErrors);
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/register", {
        userName: register.userName,
        email: register.email,
        password: register.password,
      });

      if (response.data.error) {
        alert(response.data.error);
        return;
      }

      alert("Registration successful!");
      setRegister({
        userName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      setIsSignup(false);
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Registration failed");
    }
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-gray-100">
      {/* Nav bar */}
      <div className="absolute z-10 w-full">
        <Nav />
      </div>

      {/* Slider wrapper */}
      <div
        className="flex h-full transition-transform duration-500 ease-in-out"
        style={{
          transform: isSignup ? "translateX(-50%)" : "translateX(0)",
          width: "200%", // holds both login & register side by side
        }}
      >
        {/* LOGIN */}
        <div className="flex items-center justify-center w-full bg-blue-100 px-4 py-10">
          <form
            onSubmit={handleLogin}
            className="bg-white p-6 rounded shadow-md w-full max-w-md"
          >
            <h2 className="text-2xl font-semibold mb-4">Login</h2>

            <label>Email</label>
            <input
              type="text"
              className="w-full border p-2 mb-2 input-scale"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {error.email && (
              <p className="text-red-500 text-sm">{error.email}</p>
            )}

            <label>Password</label>
            <input
              type="password"
              className="w-full border p-2 mb-2 input-scale"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error.password && (
              <p className="text-red-500 text-sm">{error.password}</p>
            )}

            <button className="bg-blue-500 text-white w-full py-2 mt-4 rounded">
              Login
            </button>
            <p className="mt-4 text-center text-sm">
              Don’t have an account?
            </p>
            <button
              className="hover:bg-green-500 hover:text-white text-green-500 text-2xl w-full py-2 mt-2 rounded"
              onClick={(e) => {
                e.preventDefault();
                setIsSignup(true);
              }}
            >
              Sign Up
            </button>
          </form>
        </div>

        {/* REGISTER */}
        <div className="flex items-center justify-center w-full bg-gray-50 px-4 py-10">
          <form
            onSubmit={handleRegister}
            className="bg-white p-6 rounded shadow-md w-full max-w-md"
          >
            <h2 className="text-2xl font-semibold mb-4">Register</h2>

            <label>Name</label>
            <input
              type="text"
              className="w-full border p-2 mb-2 input-scale"
              value={register.userName}
              onChange={(e) =>
                setRegister({ ...register, userName: e.target.value })
              }
            />
            {error.name && (
              <p className="text-red-500 text-sm">{error.name}</p>
            )}

            <label>Email</label>
            <input
              type="text"
              className="w-full border p-2 mb-2 input-scale"
              value={register.email}
              onChange={(e) =>
                setRegister({ ...register, email: e.target.value })
              }
            />
            {error.email && (
              <p className="text-red-500 text-sm">{error.email}</p>
            )}

            <label>Password</label>
            <input
              type="password"
              className="w-full border p-2 mb-2 input-scale"
              value={register.password}
              onChange={(e) =>
                setRegister({ ...register, password: e.target.value })
              }
            />
            {error.password && (
              <p className="text-red-500 text-sm">{error.password}</p>
            )}

            <label>Confirm Password</label>
            <input
              type="password"
              className="w-full border p-2 mb-2 input-scale"
              value={register.confirmPassword}
              onChange={(e) =>
                setRegister({
                  ...register,
                  confirmPassword: e.target.value,
                })
              }
            />
            {error.confirmPassword && (
              <p className="text-red-500 text-sm">{error.confirmPassword}</p>
            )}

            <button className="bg-green-500 text-white w-full py-2 mt-4 rounded">
              Register
            </button>
            <p className="mt-4 text-center text-sm">Already have an account?</p>
            <button
              className="hover:bg-blue-500 hover:text-white text-2xl text-blue-600 w-full py-2 mt-2 rounded"
              onClick={(e) => {
                e.preventDefault();
                setIsSignup(false);
              }}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
