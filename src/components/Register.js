import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from './Loader';

const Signup = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 
    try {
      const res = await axios.post('https://backend1-5dga.onrender.com/api/auth/signup', formData);
      localStorage.setItem('token', res.data.token);
      navigate('/todos'); 
    } catch (error) {
      console.error('Error during signup:', error);
      setLoading(false); // Stop loading on error
      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message, {
          position: 'top-center', 
        });
      } else {
        toast.error('Signup failed. Please try again.', {
          position: 'top-center', 
        });
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-blue-500">
      <ToastContainer />

      <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full opacity-30 transform -translate-x-20 -translate-y-20 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-56 h-56 bg-white rounded-full opacity-30 transform translate-x-20 translate-y-20 animate-pulse"></div>

      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md z-10 backdrop-blur-md bg-opacity-70 mx-4">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Create Your Account</h2>
        {loading ? (
          <div className="flex items-center justify-center py-4">
           <Loader/>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Enter your name"
                onChange={handleChange}
                required
                className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:border-green-500 focus:ring focus:ring-green-200 transition ease-in-out duration-150"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
                onChange={handleChange}
                required
                className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:border-green-500 focus:ring focus:ring-green-200 transition ease-in-out duration-150"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter your password"
                onChange={handleChange}
                required
                className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:border-green-500 focus:ring focus:ring-green-200 transition ease-in-out duration-150"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-semibold py-2 rounded-lg shadow-md transition duration-200 transform hover:scale-105"
            >
              Register
            </button>
          </form>
        )}
        <p className="text-center mt-6 text-sm text-gray-600">
          Already have an account? <a href="/login" className="text-green-600 hover:text-green-700 font-medium">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
