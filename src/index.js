
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './components/Register';
import Login from './components/Login';
import TodoList from './components/TodoList';
import Profile from './components/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './components/Home';
import Navbar from './components/Navbar';
import { ToastContainer } from 'react-toastify';


import "./index.css"
ReactDOM.render(
  <Router>
    <ToastContainer />
    <Navbar />
    <Routes>
    <Route path="/"  element={<Home/>} />
      <Route path="/register" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/todos" element={<ProtectedRoute><TodoList /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
    </Routes>
  </Router>,
  document.getElementById('root')
);
