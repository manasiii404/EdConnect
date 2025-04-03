import React from 'react';
import { Link } from 'react-router-dom';
import './EntitySelection.css';

const EntitySelection = () => {
  return (
    <div className="entity-selection-container">
      <div className="entity-selection-card">
        <h2>Welcome to EdConnect</h2>
        <p>Connecting Schools with Expert Volunteers</p>
        
        <h3>I am a...</h3>
        <div className="entity-buttons">
          <Link to="/register/student" className="entity-button">
            Student
          </Link>
          <Link to="/register/school" className="entity-button">
            School
          </Link>
          <Link to="/register/volunteer" className="entity-button">
            Volunteer
          </Link>
        </div>
        
        <div className="login-section">
          <p>Already have an account?</p>
          <Link to="/login" className="login-button">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EntitySelection;