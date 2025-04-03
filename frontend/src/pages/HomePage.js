// frontend/src/pages/HomePage.js
import React from 'react';
import EntitySelection from '../components/auth/EntitySelection';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-secondary-800 text-white">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">EdConnect</h1>
          <p className="text-xl md:text-2xl">Connecting Schools with Expert Volunteers</p>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold text-secondary-800 mb-6">Our Mission</h2>
            <div className="prose prose-lg">
              <p>
                EdConnect is a platform that bridges the gap between schools needing 
                specialized teaching assistance and volunteers who are eager to share 
                their knowledge.
              </p>
              <p>
                Many Zilla Parishad schools face a shortage of skilled 
                teachers, resulting in incomplete syllabus coverage and impacting 
                education quality.
              </p>
              <p>
                Our platform provides a structured way for volunteers to contribute 
                their expertise and for schools to access the teaching resources they need.
              </p>
            </div>
          </div>
          
          <div className="md:w-1/2">
            <EntitySelection />
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;