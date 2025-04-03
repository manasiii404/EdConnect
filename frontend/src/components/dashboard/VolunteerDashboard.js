import React, { useEffect, useState } from 'react';
import api from '../../utils/api';

const VolunteerDashboard = () => {
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
    <div className="volunteer-dashboard">
      <h1>Volunteer Dashboard</h1>
      
      {profile && (
        <div className="profile-card">
          <h2>Welcome, {profile.profile?.name}</h2>
          <div className="profile-details">
            <p><strong>Qualification:</strong> {profile.profile?.qualification}</p>
            <p><strong>Skills:</strong> {profile.profile?.skills.join(', ')}</p>
            <p><strong>Email:</strong> {profile.email}</p>
          </div>
        </div>
      )}
      
      <div className="dashboard-section">
        <h3>Available Topics</h3>
        <p>You'll see topics that need teaching assistance here.</p>
      </div>
      
      <div className="dashboard-section">
        <h3>Your Sessions</h3>
        <p>Sessions you've volunteered for will appear here.</p>
      </div>
    </div>
  );
};

export default VolunteerDashboard;