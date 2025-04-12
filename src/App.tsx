import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import TasksPage from './pages/TasksPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <nav className="app-nav">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/tasks" className="nav-link">Tasks</Link>
        </nav>
        <main className="app-main">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/tasks" element={<TasksPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
