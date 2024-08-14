import { useEffect, useState } from "react";
import '../assets/css/Panel.css';
import logo from '../assets/images/logo.png';

const Panel = ({ userType, isLoggedIn}) => {
  const [menuItems, setMenuItems] = useState([]);

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

  const decide = () => {
    // if (userType === 1) {
    //   setMenuItems([
    //     { label: 'Dashboard', link: '/' }, 
    //     { label: 'Add Employee', link: '/add-employee'},
    //     { label: 'Stock Details', link: '/stock' }, 
    //     { label: 'Add Vendor', link: '/add-vendor' },
    //     { label: 'Vendor Details', link: '/vendor-details' },
    //     { label: 'Grievances', link: '/grievance' }
    //   ]);
    // }
    // else if(userType === 2){
      setMenuItems([
        { label: 'Dashboard', link: '/cashier' }, 
        { label: 'Stock Details', link: '/stock-view' }, 
        { label: 'Vendor Details', link: '/vendor-details' },
        { label: 'Generate Bill', link: '/billing' },
        { label: 'Grievances', link: '/grievance' },
      ]);
    // }
    // else if(userType === 3){
    //   setMenuItems([
    //     { label: 'Dashboard', link: '/staff' }, 
    //     { label: 'Stock Details', link: '/stock' }, 
    //     { label: 'Add Vendor', link: '/add-vendor' },
    //     { label: 'Vendor Details', link: '/vendor-details' },
    //     { label: 'Grievances', link: '/grievance' }
    //   ]);
    // }
  };

  useEffect(() => {
    decide();
  }, [isLoggedIn]);

  return (
    <div className={`side-panel ${isLoggedIn ? 'with-sidebar' : ''}`}>
    {/* <div className="side-panel"> */}
      <div className="panel-top">
        <img src={logo} className="img-logo" alt="logo"/>
        <h1>ShelfLife</h1>
      </div>
      <h2> Menu</h2>
      <ul>
        {menuItems.map((item, index) => (
          <li key={index}>
            <a href={item.link}>{item.label}  </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Panel;