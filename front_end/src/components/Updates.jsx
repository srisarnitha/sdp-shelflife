import React from 'react';
import '../assets/css/Updates.css';
import u1 from '../assets/images/u1.jpg';
import u2 from '../assets/images/u2.jpg'; // Adjust the path according to your folder structure
import u3 from '../assets/images/u3.jpg';
import u4 from '../assets/images/u4.jpg'; 
const updates = [
  {
    image: u1,
    title: 'Sales Performance Hits New Heights!',
    description: 'Our sales have skyrocketed this month! Thanks to our amazing team and innovative tools!'
  },
  {
    image: u2,
    title: 'New Stock Tracking Feature Launched!',
    description: 'Say goodbye to stockouts! Our new feature keeps you updated in real-time!'
  },
  {
    image: u3,
    title: 'Grievance Handling Made Easy!',
    description: 'No more complaints falling through the cracks! Our system ensures every issue is addressed promptly!.'
  },
  {
    image: u4,
    title: 'Employee Attendance Tracking Simplified!',
    description: 'Track attendance effortlessly! Our new tool makes it a breeze for managers!'
  }
];

const Updates = () => {
  return (
    <div className="updates-container">
      <h2>Latest Updates</h2>
      <div className="updates-grid">
        {updates.map((update, index) => (
          <div key={index} className="update-card">
            <img src={update.image} alt={update.title} className="update-image" />
            <h3>{update.title}</h3>
            <p>{update.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Updates;
