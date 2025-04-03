// frontend/src/components/dashboard/SchoolDashboard.js
import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import DashboardLayout from './DashboardLayout';
import { getUserInfo } from '../../utils/auth';

const SchoolDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    email: '',
  });

  const userInfo = getUserInfo();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await api.get('/users/profile');
        setProfile(data);
        setFormData({
          name: data.profile?.name || '',
          location: data.profile?.location || '',
          email: data.email || '',
        });
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await api.put('/users/profile', formData);
      setProfile(data);
      setEditMode(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  // Mock data for classes and volunteers
  const classes = [
    { id: 1, name: 'Class 10A', subject: 'Mathematics', students: 30, teacher: 'Mr. Rajesh Kumar' },
    { id: 2, name: 'Class 9B', subject: 'Science', students: 28, teacher: 'Mr. Ankit Sharma' },
    { id: 3, name: 'Class 8C', subject: 'English', students: 32, teacher: 'Ms. Priya Gupta' },
  ];

  const volunteers = [
    { id: 1, name: 'Dr. Sunil Kumar', subject: 'Mathematics', rating: 4.8, status: 'Active' },
    { id: 2, name: 'Prof. Neha Gupta', subject: 'Science', rating: 4.9, status: 'Active' },
    { id: 3, name: 'Ms. Anjali Sharma', subject: 'English', rating: 4.7, status: 'Pending' },
  ];

  if (loading && !profile) return (
    <DashboardLayout title="School" userType="school" userName={userInfo?.name || "School"}>
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    </DashboardLayout>
  );

  return (
    <DashboardLayout title="School" userType="school" userName={profile?.profile?.name || userInfo?.name || "School"}>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex flex-wrap -mb-px">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`${
              activeTab === 'dashboard'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-4 md:px-6 border-b-2 font-medium text-sm`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('classes')}
            className={`${
              activeTab === 'classes'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-4 md:px-6 border-b-2 font-medium text-sm`}
          >
            Classes
          </button>
          <button
            onClick={() => setActiveTab('volunteers')}
            className={`${
              activeTab === 'volunteers'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-4 md:px-6 border-b-2 font-medium text-sm`}
          >
            Volunteers
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`${
              activeTab === 'profile'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-4 md:px-6 border-b-2 font-medium text-sm`}
          >
            Profile
          </button>
        </nav>
      </div>

      {/* Dashboard Tab */}
      {activeTab === 'dashboard' && (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-blue-50 p-6 rounded-lg shadow-sm border border-blue-100">
              <h3 className="text-lg font-semibold text-blue-800 mb-2">Total Classes</h3>
              <p className="text-blue-600 text-2xl font-bold">{classes.length}</p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg shadow-sm border border-green-100">
              <h3 className="text-lg font-semibold text-green-800 mb-2">Active Volunteers</h3>
              <p className="text-green-600 text-2xl font-bold">
                {volunteers.filter(v => v.status === 'Active').length}
              </p>
            </div>
            <div className="bg-yellow-50 p-6 rounded-lg shadow-sm border border-yellow-100">
              <h3 className="text-lg font-semibold text-yellow-800 mb-2">Pending Requests</h3>
              <p className="text-yellow-600 text-2xl font-bold">
                {volunteers.filter(v => v.status === 'Pending').length}
              </p>
            </div>
          </div>

          <h3 className="text-xl font-semibold text-secondary-800 mb-4">Recent Activity</h3>
          <div className="bg-white rounded-lg border border-gray-200 divide-y divide-gray-200">
            <div className="p-4">
              <p className="text-sm text-gray-600">
                <span className="font-medium text-primary-600">Dr. Sunil Kumar</span> completed a Mathematics session with Class 10A.
              </p>
              <p className="text-xs text-gray-500 mt-1">April 2, 2025</p>
            </div>
            <div className="p-4">
              <p className="text-sm text-gray-600">
                <span className="font-medium text-primary-600">Prof. Neha Gupta</span> scheduled a Science session with Class 9B.
              </p>
              <p className="text-xs text-gray-500 mt-1">April 1, 2025</p>
            </div>
            <div className="p-4">
              <p className="text-sm text-gray-600">
                <span className="font-medium text-primary-600">Ms. Anjali Sharma</span> applied to volunteer for English.
              </p>
              <p className="text-xs text-gray-500 mt-1">March 30, 2025</p>
            </div>
          </div>
        </div>
      )}

      {/* Classes Tab */}
      {activeTab === 'classes' && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-secondary-800">Manage Classes</h3>
            <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md transition duration-300 text-sm">
              Add New Class
            </button>
          </div>

          <div className="overflow-x-auto bg-white rounded-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Class Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Subject
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Students
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Teacher
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                  </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {classes.map((classItem) => (
                  <tr key={classItem.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {classItem.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {classItem.subject}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {classItem.students}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {classItem.teacher}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-800">
                          Edit
                        </button>
                        <button className="text-green-600 hover:text-green-800">
                          Manage
                        </button>
                        <button className="text-red-600 hover:text-red-800">
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-semibold text-secondary-800 mb-4">Upload Syllabus</h3>
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Class
                </label>
                <select className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500">
                  <option value="">Select a class</option>
                  {classes.map(c => (
                    <option key={c.id} value={c.id}>{c.name} - {c.subject}</option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload File
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                      <label className="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none">
                        <span>Upload a file</span>
                        <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">PDF, DOC, DOCX up to 10MB</p>
                  </div>
                </div>
              </div>
              <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md transition duration-300 text-sm">
                Upload Syllabus
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Volunteers Tab */}
      {activeTab === 'volunteers' && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-secondary-800">Volunteer Management</h3>
            <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md transition duration-300 text-sm">
              Request Volunteer
            </button>
          </div>

          <h4 className="text-lg font-medium text-secondary-700 mb-4">Active Volunteers</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {volunteers.filter(v => v.status === 'Active').map(volunteer => (
              <div key={volunteer.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h5 className="text-lg font-semibold text-gray-900">{volunteer.name}</h5>
                <p className="text-sm text-gray-600 mt-1">Subject: {volunteer.subject}</p>
                <div className="flex items-center mt-2">
                  <span className="text-sm text-gray-600 mr-2">Rating:</span>
                  <div className="flex items-center">
                    <span className="text-yellow-400">{Array(Math.floor(volunteer.rating)).fill('★').join('')}</span>
                    <span className="text-gray-300">{Array(5 - Math.floor(volunteer.rating)).fill('★').join('')}</span>
                    <span className="text-sm text-gray-600 ml-1">{volunteer.rating}</span>
                  </div>
                </div>
                <div className="flex justify-end mt-4">
                  <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md transition duration-300 text-xs mr-2">
                    Schedule
                  </button>
                  <button className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded-md transition duration-300 text-xs">
                    Contact
                  </button>
                </div>
              </div>
            ))}
          </div>

          <h4 className="text-lg font-medium text-secondary-700 mb-4">Pending Volunteers</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {volunteers.filter(v => v.status === 'Pending').map(volunteer => (
              <div key={volunteer.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h5 className="text-lg font-semibold text-gray-900">{volunteer.name}</h5>
                <p className="text-sm text-gray-600 mt-1">Subject: {volunteer.subject}</p>
                <div className="mt-4 flex justify-between">
                  <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md transition duration-300 text-xs">
                    Accept
                  </button>
                  <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md transition duration-300 text-xs">
                    Decline
                  </button>
                  <button className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded-md transition duration-300 text-xs">
                    Details
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <h4 className="text-lg font-medium text-secondary-700 mb-4">Request New Volunteer</h4>
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                      placeholder="e.g. Mathematics, Science"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Class
                    </label>
                    <select className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500">
                      <option value="">Select a class</option>
                      {classes.map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Topic/Curriculum
                  </label>
                  <input
                    type="text"
                    className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    placeholder="e.g. Algebra, Chemistry Experiments"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Details
                  </label>
                  <textarea
                    rows={4}
                    className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Describe what you need help with..."
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md transition duration-300 text-sm"
                  >
                    Submit Request
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-secondary-800">School Information</h3>
            <button
              onClick={() => setEditMode(!editMode)}
              className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md transition duration-300 text-sm"
            >
              {editMode ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>

          {editMode ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    School Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    required
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md transition duration-300 text-sm"
                  disabled={loading}
                >
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="text-sm font-medium text-gray-500">School Name</p>
                <p className="text-base font-medium text-gray-900 mt-1">{profile?.profile?.name}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="text-sm font-medium text-gray-500">Email Address</p>
                <p className="text-base font-medium text-gray-900 mt-1">{profile?.email}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="text-sm font-medium text-gray-500">Location</p>
                <p className="text-base font-medium text-gray-900 mt-1">{profile?.profile?.location}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </DashboardLayout>
  );
};

export default SchoolDashboard;
                