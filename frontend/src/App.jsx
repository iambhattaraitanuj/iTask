import React, { useContext, useEffect } from "react";
import Itaskpage from "./Components/Itaskpage";
import Home from "./Components/Home";
import About from "./Components/About";
import Navbar from "./Components/Navbar";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthContext } from "./Components/Context";
import axios from "axios";
import { toast } from "react-toastify";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/itask",
        element: <Itaskpage />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
    ],
  },
]);

const App = () => {
  const { setIsLoggedIn } = useContext(AuthContext);

  const fetchData = async () => {
    await axios
      .get("http://localhost:3001/api/tasks", {
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

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
