import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      <h1>Welcome to Task Management System</h1>
      <div className="home-content">
        <p>Manage your tasks efficiently with our task management system.</p>
        <div className="action-buttons">
          <Link to="/tasks" className="primary-button">
            Go to Tasks
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage; 