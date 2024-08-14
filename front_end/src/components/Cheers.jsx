import React from 'react';
import '../assets/css/Cheers.css';

import boy from '../assets/images/boy.jpeg';
import female from '../assets/images/female.jpeg';


function Cheers() {
  const reviews = [
    {
      name: "John Doe",
      review: "Grocery Genius has transformed the way I manage my store. It's intuitive and easy to use!",
      image: boy
    },
    {
      name: "Jane Smith",
      review: "The features are incredible and customer support is outstanding. Highly recommend!",
      image: female
    },
    {
      name: "Emily Johnson",
      review: "A must-have tool for any store owner. It saves me so much time and effort.",
      image: female
    },
    {
      name: "Michael Brown",
      review: "Fantastic app with great functionalities. My store operations have never been smoother.",
      image: boy
    },
    {
      name: "Sophia Davis",
      review: "Great app with user-friendly features. It's been a game-changer for our store.",
      image: female
    },
    {
      name: "William Martinez",
      review: "Highly efficient and easy to use. Excellent customer support as well.",
      image: boy
    }
  ];

  return (
    <div className="Cheers">
      <h1>Cheers from Our Customers</h1>
      <div className="reviews-container">
        {reviews.map((review, index) => (
          <div key={index} className="review-card">
            <img src={review.image} alt={review.name} className="review-image" />
            <h3>{review.name}</h3>
            <p>{review.review}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cheers;
