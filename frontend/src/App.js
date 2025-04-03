// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { isAuthenticated } from './utils/auth';
import './index.css';

// Pages
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import NotFoundPage from './pages/NotFoundPage';

// Auth Components
import Login from './components/auth/Login';
import StudentRegistration from './components/auth/StudentRegistration';
import SchoolRegistration from './components/auth/SchoolRegistration';
import VolunteerRegistration from './components/auth/VolunteerRegistration';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register/student" element={<StudentRegistration />} />
          <Route path="/register/school" element={<SchoolRegistration />} />
          <Route path="/register/volunteer" element={<VolunteerRegistration />} />
          
          {/* Protected Routes */}
          <Route 
            path="/dashboard/*" 
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            } 
          />
          
          {/* 404 Route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;