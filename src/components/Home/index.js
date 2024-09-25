import React from 'react';
import './index.css'; 
import { Link } from 'react-router-dom';

const Home = () => {
    const token = localStorage.getItem('token');
  return (
    <div className="new-home-container">
      <div className="hero-section">
        <h1 className="hero-title">Stay Organized</h1>
        <p className="hero-subtitle">Manage your daily tasks efficiently and effortlessly.</p>
        {
            token?(
                <Link to="/todos" className="cta-button" >Get Started</Link>
            ):(
                <Link to="/login" className="cta-button" >Get Started</Link>
            )

        }

      </div>
      <div className="feature-section">
        <div className="feature-card">
          <img
            src="https://img.icons8.com/fluency/96/todo-list.png" 
            alt="Create Tasks"
            className="feature-icon"
          />
          <h3 className="feature-title">Create Tasks</h3>
          <p className="feature-description">Easily add and categorize your tasks with a user-friendly interface.</p>
        </div>
        <div className="feature-card">
          <img
            src="https://img.icons8.com/fluency/96/completed-task.png" 
            alt="Track Progress"
            className="feature-icon"
          />
          <h3 className="feature-title">Track Progress</h3>
          <p className="feature-description">Monitor the status of your tasks and stay on top of your goals.</p>
        </div>
        <div className="feature-card ">
          <img
            src="https://img.icons8.com/fluency/96/alarm-clock.png" 
            alt="Set Reminders"
            className="feature-icon"
          />
          <h3 className="feature-title">Set Reminders</h3>
          <p className="feature-description">Never miss a deadline again with timely reminders for your tasks.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
