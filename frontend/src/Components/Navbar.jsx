import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./Context";
import { Menu, X } from "lucide-react"; // For the hamburger and close icons

const Navbar = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for menu toggle

  const handleAuth = () => {
    if (isLoggedIn) {
      localStorage.clear();
      setIsLoggedIn(false);
    }
  };

  return (
    <div>
      <nav className="flex items-center justify-between px-5 py-4 bg-violet-700">
        {/* Logo */}
        <a href="/" className="text-2xl text-white">
          <strong>iTask Manager</strong>
        </a>

        {/* Hamburger Menu */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white focus:outline-none"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Navigation Links */}
        <ul
          className={`${
            isMenuOpen ? "flex" : "hidden"
          } md:flex flex-col md:flex-row items-center py-6 md:p-0 gap-3 md:gap-4  absolute md:static bg-violet-700 md:bg-transparent w-full md:w-auto left-0 top-[60px] md:top-0 md:translate-y-0`}
        >
          <li className="w-full md:w-auto">
            <Link
              className="block text-center md:inline-block rounded-md p-2 text-white hover:bg-violet-500 transition"
              to="/"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
          </li>
          <li className="w-full md:w-auto">
            <Link
              className="block text-center md:inline-block rounded-md p-2 text-white hover:bg-violet-500 transition"
              to="/about"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
          </li>
          <li className="w-full md:w-auto">
            <Link
              className="block text-center md:inline-block rounded-md p-2 text-white hover:bg-violet-500 transition"
              to="/itask"
              onClick={() => setIsMenuOpen(false)}
            >
              Your Tasks
            </Link>
          </li>
          <li className="md:w-auto ">
            <Link
              className={`block text-center md:inline-block ${
                isLoggedIn
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-violet-500 hover:bg-violet-400"
              } rounded-md p-2 transition text-white w-[75px]`}
              to="/login"
              onClick={() => setIsMenuOpen(false)}
            >
              <button onClick={handleAuth} type="submit">
                {isLoggedIn ? "Log Out" : "Log In"}
              </button>
            </Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
};

export default Navbar;
