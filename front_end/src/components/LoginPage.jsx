import React, { useContext, useState, useEffect } from 'react';
import '../assets/css/LoginPage.css';
import { useNavigate } from 'react-router-dom';
import Header1 from './Header1';
import Footer from './Footer';
import axios from 'axios';
import { UserContext } from './UserContext';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { user, setUser } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    console.log('Updated user state:', user);
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'username') {
      setUsername(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const validateData = async () => {
    const formData = { username, password };
    try {
      const response = await axios.post('http://localhost:8081/login', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response);
      const userType = response.data;
      setUser(userType);
      console.log(user);
      
      if (userType.user_type === 'manager') {
        navigate('/manager');
      } else if (userType.user_type === 'cashier') {
        navigate('/cashier');
      } else {
        navigate('/staff');
      }
    } catch (error) {
      // Handle login error
      console.error(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validateData();
  };

  return (
    <>
      <Header1 />
      <div className="form-container-login">
        <form className="login-form" onSubmit={handleSubmit}>
          <h1>Login</h1>
          <div className="form-group-l">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group-l">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group-l full-width">
            <button type="submit" className="submit-login">
              Login
            </button>
          </div>
          <div className="form-group-l full-width">
            <p>
              Don't have an account? <a href="/signup">Sign Up</a>
            </p>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default LoginPage;