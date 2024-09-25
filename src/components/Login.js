import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from './Loader'; 
const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);
      localStorage.setItem('token', res.data.token);
      navigate('/todos');
    } catch (error) {
      toast.error('Incorrect email or password', {
        position: 'top-center',
      });
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="relative flex items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-purple-600 overflow-hidden">
      <ToastContainer />
      <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full opacity-30 transform -translate-x-20 -translate-y-20 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-56 h-56 bg-white rounded-full opacity-30 transform translate-x-20 translate-y-20 animate-pulse"></div>

      <div className="bg-white shadow-xl rounded-2xl p-8 w-96 z-10 backdrop-blur-md bg-opacity-70">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Welcome Back</h2>
        {loading ? ( 
          <Loader />
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email or Phone</label>
              <input
                type="text"
                name="email"
                id="email"
                placeholder="Enter your email or phone"
                onChange={handleChange}
                required
                className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 transition ease-in-out duration-150"
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
                className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 transition ease-in-out duration-150"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-2 rounded-lg shadow-md transition duration-200 transform hover:scale-105"
            >
              Log In
            </button>
          </form>
        )}
        <p className="text-center mt-6 text-sm text-gray-600">
          Don't have an account? <a href="/register" className="text-blue-600 hover:text-blue-700 font-medium">Register</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
