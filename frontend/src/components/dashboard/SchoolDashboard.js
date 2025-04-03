import React, { useState, useEffect } from 'react';
import { useAuth } from '../auth/AuthContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './SchoolDashboard.css';

// Sub-components
import SchoolProfile from './SchoolProfile';
import ClassManagement from './ClassManagement';
import VolunteerRequests from './VolunteerRequests';
import StudentPerformance from './StudentPerformance';
import VolunteerActivity from './VolunteerActivity';

const SchoolDashboard = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);
  const [volunteers, setVolunteers] = useState([]);

  useEffect(() => {
    // Fetch initial data
    fetchClasses();
    fetchStudents();
    fetchVolunteers();
  }, []);

  const fetchClasses = async () => {
    try {
      // Replace with actual API call
      const mockClasses = [
        { id: 1, name: 'Class 10A', subject: 'Mathematics', syllabus: 'math_syllabus.pdf' },
        { id: 2, name: 'Class 9B', subject: 'Science', syllabus: 'science_syllabus.pdf' }
      ];
      setClasses(mockClasses);
    } catch (error) {
      toast.error('Failed to fetch classes');
    }
  };

  const fetchStudents = async () => {
    try {
      // Replace with actual API call
      const mockStudents = [
        { id: 1, name: 'Rahul Sharma', classId: 1, attendance: '85%', performance: 'A' },
        { id: 2, name: 'Priya Patel', classId: 1, attendance: '92%', performance: 'A+' },
        { id: 3, name: 'Amit Singh', classId: 2, attendance: '78%', performance: 'B' }
      ];
      setStudents(mockStudents);
    } catch (error) {
      toast.error('Failed to fetch students');
    }
  };

  const fetchVolunteers = async () => {
    try {
      // Replace with actual API call
      const mockVolunteers = [
        { id: 1, name: 'Dr. Sunil Kumar', subject: 'Mathematics', hoursTaught: 15, rating: 4.8 },
        { id: 2, name: 'Prof. Neha Gupta', subject: 'Science', hoursTaught: 22, rating: 4.9 }
      ];
      setVolunteers(mockVolunteers);
    } catch (error) {
      toast.error('Failed to fetch volunteers');
    }
  };

  const handleCreateClass = (newClass) => {
    setClasses([...classes, { ...newClass, id: classes.length + 1 }]);
    toast.success('Class created successfully!');
  };

  const handleAddStudents = (classId, studentIds) => {
    // Update students with class information
    const updatedStudents = students.map(student => 
      studentIds.includes(student.id) ? { ...student, classId } : student
    );
    setStudents(updatedStudents);
    toast.success('Students added to class!');
  };

  const handleUploadSyllabus = (classId, file) => {
    // Update class with new syllabus
    setClasses(classes.map(cls => 
      cls.id === classId ? { ...cls, syllabus: file.name } : cls
    ));
    toast.success('Syllabus uploaded successfully!');
  };

  const handleRequestVolunteer = (request) => {
    toast.success(`Volunteer requested for ${request.subject} in ${request.className}`);
    // Here you would typically send this to your backend
  };

  return (
    <div className="school-dashboard">
      <header className="dashboard-header">
        <h1>School Dashboard</h1>
        <div className="user-info">
          <span>Welcome, {user?.schoolName}</span>
          <button onClick={logout} className="logout-btn">Logout</button>
        </div>
      </header>

      <nav className="dashboard-nav">
        <button 
          className={activeTab === 'profile' ? 'active' : ''}
          onClick={() => setActiveTab('profile')}
        >
          School Profile
        </button>
        <button 
          className={activeTab === 'classes' ? 'active' : ''}
          onClick={() => setActiveTab('classes')}
        >
          Class Management
        </button>
        <button 
          className={activeTab === 'volunteers' ? 'active' : ''}
          onClick={() => setActiveTab('volunteers')}
        >
          Volunteer Requests
        </button>
        <button 
          className={activeTab === 'performance' ? 'active' : ''}
          onClick={() => setActiveTab('performance')}
        >
          Student Performance
        </button>
        <button 
          className={activeTab === 'activity' ? 'active' : ''}
          onClick={() => setActiveTab('activity')}
        >
          Volunteer Activity
        </button>
      </nav>

      <main className="dashboard-content">
        {activeTab === 'profile' && <SchoolProfile school={user} />}
        {activeTab === 'classes' && (
          <ClassManagement 
            classes={classes} 
            students={students}
            onCreateClass={handleCreateClass}
            onAddStudents={handleAddStudents}
            onUploadSyllabus={handleUploadSyllabus}
          />
        )}
        {activeTab === 'volunteers' && (
          <VolunteerRequests 
            classes={classes}
            onRequestVolunteer={handleRequestVolunteer}
          />
        )}
        {activeTab === 'performance' && (
          <StudentPerformance 
            students={students} 
            classes={classes}
          />
        )}
        {activeTab === 'activity' && (
          <VolunteerActivity 
            volunteers={volunteers}
            classes={classes}
          />
        )}
      </main>
    </div>
  );
};

export default SchoolDashboard;