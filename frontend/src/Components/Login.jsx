import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./Context";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    const { value, name } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };
  const { setIsLoggedIn } = useContext(AuthContext);

  const fetchData = async () => {
    await axios
      .get(`http://localhost:3001/api/tasks`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        if (response.data.error === "Unauthorized") {
          toast.error("Unauthorized. Please login", {
            theme: "colored",
            position: "bottom-right",
          });
          setIsLoggedIn(false);
        } else {
          setIsLoggedIn(true);
        }
      });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(`http://localhost:3001/auth/login`, data)
        .then((response) => {
          setData({
            email: "",
            password: "",
          });
          localStorage.setItem("token", response.data.token);
          fetchData();
          navigate('/');
        });
    } catch (err) {
      if (err.response.status === 404) {
        toast.error("Incorrect email or password", {
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
          Log In to iTask Manager
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="text-gray-700 mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={data.email}
              onChange={handleInput}
              className="focus:border-blue-400 focus:bg-blue-50 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight outline-none  transition-all"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-6">
            <label className="text-gray-700 mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={data.password}
              name="password"
              onChange={handleInput}
              className="focus:border-blue-400 focus:bg-blue-50 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight outline-none  transition-all"
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="flex items-center justify-center mb-4">
            <button
              type="submit"
              className="bg-violet-700 w-full hover:bg-violet-600 text-white font-bold py-2 px-4 rounded focus:outline-none  transition-all"
            >
              Log In
            </button>
          </div>
          <div className="text-center">
            <p className="text-gray-700">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-violet-700 hover:text-violet-600 transition duration-300 ease-in-out"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
