// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import '../assets/css/Header.css';
import { useNavigate } from 'react-router-dom';

const Header1 = () => {

  const navigate = useNavigate();



  const handleLogin = () =>{
    navigate('/login');
  }

  const handleSignup = () =>{
    navigate('/signup');
  }

  return (
    <header className='header-h'>
      <nav className="navigation-h">
        <ul className="nav-list">
          <li className="nav-item">
            <a href="/" className="nav-link">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a href="#footer" className="nav-link">
              About
            </a>
          </li>
          <li className="nav-item">
            <a href="#footer" className="nav-link">
              Contact
            </a>
          </li>
        </ul>
      </nav>

          <div className="admin-profile">
            <button className='login-btn' onClick={handleLogin}>Login</button>
            <button className='login-btn' onClick={handleSignup}>Sign Up</button>
          </div>

    </header>
  );
};

export default Header1;