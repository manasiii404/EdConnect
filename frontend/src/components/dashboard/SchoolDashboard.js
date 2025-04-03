import React, { useEffect, useState } from 'react';
import api from '../../utils/api';

const SchoolDashboard = () => {
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
    <div className="school-dashboard">
      <h1>School Dashboard</h1>
      
      {profile && (
        <div className="profile-card">
          <h2>Welcome, {profile.profile?.name}</h2>
          <div className="profile-details">
            <p><strong>Location:</strong> {profile.profile?.location}</p>
            <p><strong>Email:</strong> {profile.email}</p>
          </div>
        </div>
      )}
      
      <div className="dashboard-section">
        <h3>Upload Curriculum Needs</h3>
        <p>This feature will allow you to upload subjects or topics that need assistance.</p>
        <button className="btn btn-primary" disabled>Upload Curriculum (Coming Soon)</button>
      </div>
      
      <div className="dashboard-section">
        <h3>Scheduled Sessions</h3>
        <p>You'll see scheduled volunteer sessions here.</p>
      </div>
    </div>
  );
};

export default SchoolDashboard;