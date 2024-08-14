import React from 'react';
import '../assets/css/StatisticsSuccessPage.css';
import Footer from './Footer';

const statistics = [
  {
    title: 'Projects Completed',
    value: '150+'
  },
  {
    title: 'Satisfied Clients',
    value: '200+'
  },
  {
    title: 'Awards Won',
    value: '10'
  },
  {
    title: 'Years of Experience',
    value: '5+'
  }
];

const StatisticsSuccessPage = () => {
  return (
    <div className="statistics-container">
      <h2>Our Success in Numbers</h2>
      <div className="statistics-grid">
        {statistics.map((stat, index) => (
          <div key={index} className="stat-card">
            <h3>{stat.value}</h3>
            <p>{stat.title}</p>
          </div>
        ))}
      </div>
      <Footer />
    </div>
    
  );
};

export default StatisticsSuccessPage;
