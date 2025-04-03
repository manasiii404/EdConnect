import React, { useEffect, useState } from 'react';
import api from '../../utils/api';

const StudentDashboard = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await api.get('/users/profile');
        setProfile(data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="student-dashboard">
      <h1>Student Dashboard</h1>
      
      {profile && (
        <div className="profile-card">
          <h2>Welcome, {profile.profile?.name}</h2>
          <div className="profile-details">
            <p><strong>School:</strong> {profile.profile?.school}</p>
            <p><strong>Class:</strong> {profile.profile?.class}</p>
            <p><strong>Roll Number:</strong> {profile.profile?.rollNumber}</p>
            <p><strong>Email:</strong> {profile.email}</p>
          </div>
        </div>
      )}
      
      <div className="dashboard-section">
        <h3>Available Sessions</h3>
        <p>You'll see available learning sessions here once they're scheduled.</p>
      </div>
    </div>
  );
};

export default StudentDashboard;