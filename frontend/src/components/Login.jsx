import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from "react-router-dom";
import { setAuthUser } from "../redux/appSlice";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch()
  const navigate = useNavigate();

  const changeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    
    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/user/login",  // Ensure this matches your backend endpoint
        input,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials:true, // Ensure backend supports credentials (cookies)
        }
      );
      
      if (res.data.success) {
        dispatch(setAuthUser(res.data.user));
        toast.success(res.data.message || "Login successful!");
        navigate("/");  // Redirect to the homepage or dashboard
      } else {
        toast.error(res.data.message || "Login failed!");
      }
    } catch (error) {
      console.error("Login Error:", error);
      // Improved error handling
      const errorMessage =
        error.response?.data?.message || "Something went wrong. Please try again.";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <form
        onSubmit={submitHandler}
        className="flex flex-col gap-3 bg-white p-4 w-[20%] shadow-lg rounded-md"
      >
        <h1 className="font-bold text-2xl uppercase my-2">Login</h1>
        <input
          type="email"
          value={input.email}
          name="email"
          placeholder="Email"
          onChange={changeHandler}
          className="border border-gray-400 rounded-md px-2 py-1"
          required
        />
        <input
          type="password"
          value={input.password}
          name="password"
          placeholder="Password"
          onChange={changeHandler}
          className="border border-gray-400 rounded-md px-2 py-1"
          required
        />
        <button
          className="bg-gray-800 text-white my-2 rounded-md p-2 hover:bg-gray-900 transition-all duration-200"
          type="submit"
        >
          Login
        </button>
        <p>
          Don't have an account? <Link to={"/signup"} className="text-blue-600">Signup</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
