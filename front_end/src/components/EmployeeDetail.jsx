import React, { useContext, useState } from 'react';
import '../assets/css/EmployeeDetail.css';
import Header from './Header';
// import Panel from './Panel';
import Footer from './Footer';
import axios from 'axios';
import { UserContext } from './UserContext';

const EmployeeDetail = ({ userType }) => {
  const { user } = useContext(UserContext);
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    fname: '',
    lname: '',
    user_type: '',
    name: '',
    cid: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedFormData = {
      ...formData,
      name: formData.fname + ' ' + formData.lname,
      company: user.company,
    };

    console.log('Form Data:', updatedFormData);

    try {
      const resp = await axios.post(`http://localhost:8081/add-employee`, updatedFormData);
      console.log(resp);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <>
      <Header />
      {/* <Panel userType={userType} /> */}
      <div className="emp-form-container">
        <form className="employe-form" onSubmit={handleSubmit}>
          <h2>Employee Details</h2>
          <div className="emp-form-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="emp-form-group">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="emp-form-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="emp-form-group">
            <input
              type="text"
              name="fname"
              placeholder="First Name"
              value={formData.fname}
              onChange={handleChange}
              required
            />
          </div>
          <div className="emp-form-group">
            <input
              type="text"
              name="lname"
              placeholder="Last Name"
              value={formData.lname}
              onChange={handleChange}
              required
            />
          </div>
          <div className="emp-form-group">
            <input
              type="text"
              name="user_type"
              placeholder="User Type"
              value={formData.user_type}
              onChange={handleChange}
              required
            />
          </div>
          <div className="emp-form-group full-width">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default EmployeeDetail;