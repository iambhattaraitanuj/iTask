import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    const { value, name } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setData({
      username: "",
      email: "",
      password: "",
    });
    try {
      await axios
        .post(`http://localhost:3001/auth/signup`, data)
        .then((response) => {
          if (response.status === 200) {
              navigate(-1)
          }
        });
    } catch (err) {
      if (err.response.status === 404) {
        toast.error("This email is already used", {
          theme: "colored",
          position: "bottom-right",
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center pt-24">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-violet-700 mb-6 text-center">
          Sign Up for iTask Manager
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className=" text-gray-700 mb-2" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              name="username"
              value={data.username}
              onChange={handleInput}
              id="name"
              className="focus:border-blue-400 focus:bg-blue-50 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight outline-none  transition-all"
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="mb-4">
            <label className=" text-gray-700 mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={data.email}
              onChange={handleInput}
              id="email"
              className="focus:border-blue-400 focus:bg-blue-50 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight outline-none  transition-all"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-6">
            <label className=" text-gray-700 mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={data.password}
              onChange={handleInput}
              name="password"
              className="focus:border-blue-400 focus:bg-blue-50 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight outline-none  transition-all"
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="flex items-center justify-center mb-4">
            <button
              type="submit"
              className="bg-violet-700 w-full hover:bg-violet-600 text-white font-bold py-2 px-4 rounded focus:outline-none  transition duration-300 ease-in-out"
            >
              Sign Up
            </button>
          </div>
          <div className="text-center">
            <p className="text-gray-700">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-violet-700 hover:text-violet-600 transition duration-300 ease-in-out"
              >
                Log In
              </Link>
            </p>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signup;
