import React, {  useContext } from 'react';
// import axios from 'axios';
import '../assets/css/Header.css';
import { useNavigate } from 'react-router-dom';
// import { AuthContext } from './AuthProvider';
import dp from '../assets/images/dp.png';
import { UserContext } from './UserContext';


const Header = ({userType}) => {
  // const [adminData, setAdminData] = useState({
  //   name: '',
  //   photo: ''
  // });
  const navigate = useNavigate();
  const {  setUser } = useContext(UserContext);


  const handleLogout = () => {
    setUser({});
    navigate("/");
  }

  return (
    <header className='header-h with-sidebar'>
      <nav className="navigation-h">
        <ul className="nav-list">
          <li className="nav-item">
            <a href="/manager" className="nav-link">
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
              src={dp}
              alt="Admin"
              className="admin-photo"
            /> 
            <button className='login-btn' onClick={handleLogout}>Logout</button> 
          
          </div>
          
    </header>
  );
};

export default Header;