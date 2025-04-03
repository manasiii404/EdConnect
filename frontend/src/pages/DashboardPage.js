import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { getUserType } from '../utils/auth';

// Dashboard Components
import StudentDashboard from '../components/dashboard/StudentDashboard';
import SchoolDashboard from '../components/dashboard/SchoolDashboard';
import VolunteerDashboard from '../components/dashboard/VolunteerDashboard';

const DashboardPage = () => {
  const userType = getUserType();
  
  // Redirect to appropriate dashboard based on user type
  const getRedirectPath = () => {
    switch (userType) {
      case 'student':
        return '/dashboard/student';
      case 'school':
        return '/dashboard/school';
      case 'volunteer':
        return '/dashboard/volunteer';
      default:
        return '/login';
    }
  };

  return (
    <div className="dashboard-container">
      <Routes>
        <Route path="/" element={<Navigate to={getRedirectPath()} />} />
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/school" element={<SchoolDashboard />} />
        <Route path="/volunteer" element={<VolunteerDashboard />} />
      </Routes>
    </div>
  );
};

export default DashboardPage;