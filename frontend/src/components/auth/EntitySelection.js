// frontend/src/components/auth/EntitySelection.js
import React from 'react';
import { Link } from 'react-router-dom';

const EntitySelection = () => {
  return (
    <div className="bg-white shadow-md rounded-lg p-8">
      <h2 className="text-2xl font-bold text-secondary-800 mb-2">Welcome to EdConnect</h2>
      <p className="text-gray-600 mb-6">Connecting Schools with Expert Volunteers</p>
      
      <h3 className="text-lg font-medium text-secondary-700 mb-4">I am a...</h3>
      <div className="space-y-4">
        <Link
          to="/register/student"
          className="block w-full bg-primary-600 hover:bg-primary-700 text-white py-3 px-4 rounded-md transition duration-300 text-center font-medium"
        >
          Student
        </Link>
        <Link
          to="/register/school"
          className="block w-full bg-secondary-600 hover:bg-secondary-700 text-white py-3 px-4 rounded-md transition duration-300 text-center font-medium"
        >
          School
        </Link>
        <Link
          to="/register/volunteer"
          className="block w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-md transition duration-300 text-center font-medium"
        >
          Volunteer
        </Link>
      </div>
      
      <div className="mt-8 pt-6 border-t border-gray-200 text-center">
        <p className="text-gray-600 mb-2">Already have an account?</p>
        <Link
          to="/login"
          className="inline-block bg-transparent border border-primary-600 text-primary-600 hover:bg-primary-50 py-2 px-4 rounded-md transition duration-300 font-medium"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default EntitySelection;