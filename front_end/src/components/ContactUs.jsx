import React, { Fragment } from 'react';
import { useState } from 'react';
import axios from 'axios';
import '../assets/css/ContactUs.css';
import Header1 from './Header1';
import Footer from './Footer';

const ContactUs = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('/api/contact', {
      name,
      email,
      phone,
      message
    })
    .then(response => {
        console.log(response.data);
      })
    .catch(error => {
        setError(error.message);
      });
  };

  return (
    <>
    <Header1/>
      <div className="contact-us-container">
        <h1 style={{ marginBottom: 20 }}>Contact Us</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-box-c">
            <input type="text" value={name} onChange={(event) => setName(event.target.value)} placeholder="Name" style={{ marginBottom: 10 }} />
          </div>
          <div className="input-box-c">
            <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email" style={{ marginBottom: 10 }} />
          </div>
          <div className="input-box-c">
            <input type="tel" value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="Phone" style={{ marginBottom: 10 }} />
          </div>
          <div className="input-box-c">
            <textarea value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Message" style={{ marginBottom: 20 }} />
          </div>
          {error && <p style={{ color: 'ed' }}>{error}</p>}
          <button type="submit" className="send-button-c">Send</button>
        </form>
      </div>
      <Footer/>
    </>
  );
};

export default ContactUs;