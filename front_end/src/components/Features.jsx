import React from 'react';
import '../assets/css/Features.css';
import logo from '../assets/images/f1.jpg'; // Adjust the path according to your folder structure
import s2 from '../assets/images/s2.jpeg';
import f3 from '../assets/images/f3.jpeg';
import f4 from '../assets/images/f4.jpg'
const features = [
  {
    image: logo,
    title: 'Stock Tracker',
    description: 'Keep your inventory in check with real-time stock updates!'
  },
  {
    image: s2,
    title: 'Sales Analyzer',
    description: 'Dive deep into your sales data with our interactive dashboard!'
  },
  {
    image: f3,
    title: 'Vendor Manager',
    description: 'Manage your vendors effortlessly and keep them happy!'
  },
  {
    image: f4,
    title: 'Attendance Tracker',
    description: 'Track employee attendance like a pro, no more excuses!'
  }
];

const Features = () => {
  return (
    <div className="features-container">
      <h2>Our Features</h2>
      <div className="features-grid">
        {features.map((feature, index) => (
          <div key={index} className="feature-card">
            <img src={feature.image} alt={feature.title} className="feature-image" />
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
