import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/SignUpPage.css';
import Header1 from './Header1';
import Footer from './Footer';
import axios from 'axios';

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    user_type: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Password validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setError('');

    try {
      const response = await axios.post('http://localhost:8081/signup', formData, {
        headers: { 'Content-Type': 'application/json' }
      });

      console.log('Sign Up Response:', response.data);
      alert("Sign up successful");

      // Handle successful signup (e.g., redirect to login page)
    } catch (error) {
      console.error('Sign Up Error:', error);

      // Handle signup errors (e.g., display error message)
    }
  };

  return (
    <>
      <Header1/>
      <div className="form-container-s">
        <form className="sign-up-form" onSubmit={handleSubmit}>
          <h2>Sign Up for ShelfLife</h2>

          <div className="form-group-s">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group-s">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group-s">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group-s">
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group-s">
            <input
              type="text"
              name="user_type"
              placeholder="User Type (Manager / Staff / Cashier)"
              value={formData.user_type}
              onChange={handleChange}
              required
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <div className="form-group-s full-width">
            <button type="submit">Sign Up</button>
          </div>
          <div className="form-group-s full-width">
            <p>Already have an account? <Link to="/login">Sign In</Link></p>
          </div>
        </form>
      </div>
      <Footer/>
    </>
  );
};

export default SignUpPage;