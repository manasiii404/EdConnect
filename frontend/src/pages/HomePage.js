import React from 'react';
import EntitySelection from '../components/auth/EntitySelection';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page">
      {/* <header className="home-header">
        <div className="container">
          <h1>EdConnect</h1>
          <p>Connecting Schools with Expert Volunteers</p>
        </div>
      </header> */}
      
      <main className="container">
        <div className="home-content">
          {/* <div className="home-description">
            <h2>Our Mission</h2>
            <p>
              EdConnect is a platform that bridges the gap between schools needing 
              specialized teaching assistance and volunteers who are eager to share 
              their knowledge. Many Zilla Parishad schools face a shortage of skilled 
              teachers, resulting in incomplete syllabus coverage and impacting 
              education quality.
            </p>
            <p>
              Our platform provides a structured way for volunteers to contribute 
              their expertise and for schools to access the teaching resources they need.
            </p>
          </div> */}
          
          <EntitySelection />
        </div>
      </main>
    </div>
  );
};

export default HomePage;