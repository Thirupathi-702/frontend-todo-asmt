import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa'; 

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <nav className="bg-gradient-to-r from-blue-500 to-indigo-500 p-4 flex justify-between items-center shadow-lg">
      <h1 className="text-3xl font-bold text-white">Todo App</h1>
      <ul className="flex space-x-6 items-center">
        <li>
          <Link
            to="/"
            className="text-white text-lg font-medium hover:text-gray-200 transition duration-300 ease-in-out"
          >
            Home
          </Link>
        </li>
        {token ? (
          <>
            <li>
              <Link
                to="/profile"
                className="flex items-center text-white text-lg font-medium hover:text-gray-200 transition duration-300 ease-in-out"
              >
                <FaUserCircle className="mr-2 text-2xl" /> {/* Profile Icon */}
                Profile
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="bg-red-400 text-white px-4 py-2 rounded-full hover:bg-red-500 transition duration-300 ease-in-out shadow-md font-medium"
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link
                to="/login"
                className="text-white text-lg font-medium hover:text-gray-200 transition duration-300 ease-in-out"
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                className="text-white text-lg font-medium hover:text-gray-200 transition duration-300 ease-in-out"
              >
                Signup
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
