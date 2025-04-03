import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Registration.css';

const VolunteerRegistration = () => {
  const [formData, setFormData] = useState({
    name: '',
    qualification: '',
    skills: [],
    email: '',
    password: '',
    confirmPassword: '',
  });
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const skillOptions = [
    'Mathematics', 'Science', 'Physics', 'Chemistry', 'Biology',
    'English', 'Hindi', 'Social Studies', 'History', 'Geography',
    'Computer Science', 'Art', 'Music', 'Physical Education'
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSkillChange = (e) => {
    const value = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setFormData({
      ...formData,
      skills: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    try {
      setLoading(true);
      setError('');
      
      const { data } = await axios.post('http://localhost:5000/api/auth/register', {
        email: formData.email,
        password: formData.password,
        userType: 'volunteer',
        name: formData.name,
        qualification: formData.qualification,
        skills: formData.skills,
      });
      
      // Save user info and token to localStorage
      localStorage.setItem('userInfo', JSON.stringify(data));
      
      // Redirect to volunteer dashboard
      navigate('/dashboard/volunteer');
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="registration-container">
      <div className="registration-card">
        <h2>Volunteer Registration</h2>
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="qualification">Qualification</label>
            <input
              type="text"
              id="qualification"
              name="qualification"
              value={formData.qualification}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="skills">Skills (Hold Ctrl/Cmd to select multiple)</label>
            <select
              id="skills"
              name="skills"
              multiple
              value={formData.skills}
              onChange={handleSkillChange}
              required
            >
              {skillOptions.map((skill) => (
                <option key={skill} value={skill}>
                  {skill}
                </option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          
          <button type="submit" className="register-button" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
        
        <div className="login-link">
          <p>Already have an account?</p>
          <button onClick={() => navigate('/login')} className="login-redirect-button">
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default VolunteerRegistration;