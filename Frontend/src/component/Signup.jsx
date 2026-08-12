import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Signup = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  
 
  const navigate = useNavigate();

  const MultipleData = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const registerFrom = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/user/signup",
        
          user,
        
        {
          withCredentials: true,
        },
      );

      setUser({username:"",email:"",password:""});
      
      console.log(response);
     localStorage.setItem("token", response.data.token);
      toast.success("Signup Successfull!")
       setTimeout(()=>{
           window.location.href = "/";
        },200);
         

    } catch (error) {
      toast.error(error.message || "Signup Failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-2">
          Create Account
        </h1>

        <p className="text-gray-500 text-center mb-8">Sign up to get started</p>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-2">
            Username
          </label>

          <input
            type="text"
            name="username"
            value={user.username}
            placeholder="Enter your username"
            className="border border-gray-300 rounded-lg outline-none py-3 px-4 mb-5 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
            onChange={MultipleData}
          />

          <label className="text-sm font-medium text-gray-700 mb-2">
            Email
          </label>

          <input
            type="email"
            name="email"
            value={user.email}
            onChange={MultipleData}
            placeholder="Enter your email"
            className="border border-gray-300 rounded-lg outline-none py-3 px-4 mb-5 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
          />

          <label className="text-sm font-medium text-gray-700 mb-2">
            Password
          </label>

          <input
            type="password"
            name="password"
            value={user.password}
            onChange={MultipleData}
            placeholder="Enter your password"
            className="border border-gray-300 rounded-lg outline-none py-3 px-4 mb-6 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
          />

          <button
            type="button"
            onClick={registerFrom}
            className="bg-blue-600 py-3 rounded-lg text-white font-semibold hover:bg-blue-700 transition cursor-pointer"
          >
            Create Account
          </button>

          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 font-medium hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
