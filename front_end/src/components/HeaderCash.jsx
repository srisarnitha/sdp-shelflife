import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../assets/css/Header.css';
import { useNavigate } from 'react-router-dom';

const Header = ({userType}) => {
  const [adminData, setAdminData] = useState({});

  const navigate = useNavigate();

//   useEffect(() => {
//     const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
//     if (storedIsLoggedIn) {
//       setIsLoggedIn(JSON.parse(storedIsLoggedIn));   
//   

//     }
//   }, []);

//   useEffect(() => {
//     localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
//   }, [isLoggedIn]);

  useEffect(() => {

    if(userType===1){
      setAdminData({ name: 'Admin' });
    }
    else if(userType===2){
      setAdminData({ name: 'Cashier' });
    }
    else if(userType===3){
      setAdminData({ name: 'Staff' });
    }
  }, []);

  const handleLogin = () =>{
    navigate('/login');
  }

  const handleSignup = () =>{
    navigate('/signup');
  }

  return (
    <header className='header-h with-sidebar'>
      <nav className="navigation-h">
        <ul className="nav-list">
          <li className="nav-item">
            <a href="/cash" className="nav-link">
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
            <img
              src={adminData.photo || 'admin-photo.jpg'}
              alt="Admin Photo"
              className="admin-photo"
            />
            <span> {adminData.name} </span>
          </div>

    </header>
  );
};

export default Header;