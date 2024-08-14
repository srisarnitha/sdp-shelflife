import React, { useState } from 'react';
import axios from 'axios';
import '../assets/css/Grievance.css';
import Header from './Header';
import Panel from './Panel';

function Grievance({userType}) {
  const [formData, setFormData] = useState({
    cashierName: '',
    grievanceSubject: '',
    grievanceText: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(formData);

    setFormData({
      cashierName: '',
      grievanceSubject: '',
      grievanceText: '',
    });
  };

  return (
    <>
    <Header/>
    {/* <Panel userType={userType}/> */}
    <form onSubmit={handleSubmit} className="grievance-form">
        <h1>Grievance Form</h1>
      <input
        type="text"
        id="cashierName"
        name="cashierName"
        value={formData.cashierName}
        onChange={handleChange}
        placeholder="Enter Name"
        required
        className="form-input-g"
      />

      <input
        type="text"
        id="grievanceSubject"
        name="grievanceSubject"
        value={formData.grievanceSubject}
        onChange={handleChange}
        placeholder="Enter Subject"
        required
        className="form-input-g"
      />

      <textarea
        id="grievanceText"
        name="grievanceText"
        value={formData.grievanceText}
        onChange={handleChange}
        placeholder="Your grievance here"
        required
        className="form-textarea-g"
      />

      <button type="submit" className="submit-button-g">Submit Grievance</button>
    </form>

    </>
  );
}

export default Grievance;