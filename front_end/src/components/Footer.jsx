import React from 'react';
import '../assets/css/Footer.css';

const Footer = () => (
  <footer className="footer-container" id='footer'>
    <div className="footer-content">
      <div className="footer-section">
        <h3>About ShelfLife</h3>
        <p className='text1'>ShelfLife is a comprehensive grocery store management solution designed to streamline your operations, enhance inventory control, and boost overall efficiency. Our platform helps you manage stock levels, track sales, and provide excellent customer service.</p>
      </div>
      <div className="footer-section">
        <h3>Help & Support</h3>
        <ul>
          <li><a href="/contact">Contact Us</a></li>
        </ul>
      </div>
      <div className="footer-section">
        <h3>Contact Information</h3>
        <p>Email: support@shelflife.com</p>
        <p>Phone: (123) 456-7890</p>
      </div>
    </div>
    <div className="footer-bottom">
      <p>&copy; 2024 ShelfLife. All rights reserved.</p>
    </div>
  </footer>
);

export default Footer;