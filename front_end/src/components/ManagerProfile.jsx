import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Header from './Header';
import Panel from './Panel';
import Footer from './Footer1';
import { UserContext } from './UserContext';
import '../assets/css/ManagerProfile.css';
import edit from '../assets/images/edit.png';

const ManagerProfile = () => {
  const { user } = useContext(UserContext);

  const [managerData, setManagerData] = useState({
    name: '',
    username: '',
    password: '********',
    company: {
      name: '',
      address: '',
      email: '',
      phoNo: '',
      businessRegNo: '',
      vatNo: '',
    },
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setManagerData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCompanyInputChange = (event) => {
    const { name, value } = event.target;
    setManagerData((prevData) => ({
      ...prevData,
      company: {
        ...prevData.company,
        [name]: value,
      },
    }));
  };

  const handleSave = async () => {
    try {
      const response = await axios.put('http://localhost:8081/update-profile', managerData);
      console.log('Manager data updated successfully:', response.data);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating manager data:', error);
    }
  };

  useEffect(() => {
    if (user && user.uid) {
      const fetchManagerData = async () => {
        try {
          const response = await axios.get(`http://localhost:8081/get-profile/${user.uid}`);
          // Ensure that company is always defined
          const fetchedData = response.data;
          if (!fetchedData.company) {
            fetchedData.company = {
              name: '',
              address: '',
              email: '',
              phoNo: '',
              businessRegNo: '',
              vatNo: '',
            };
          }

          fetchedData.password = "********";
          setManagerData(fetchedData);
        } catch (error) {
          console.error('Error fetching manager data:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchManagerData();
    } else {
      setLoading(false);
    }
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header />
      <Panel />
      <div className="manager-profile">
      <div className='manager-profile-header'>
        <h1>Profile</h1>
        <button onClick={() => setIsEditing(!isEditing)} className='edit-btn'>
          <img src={edit} alt="Edit" className="edit"/>
        </button>
        </div>
        <div className="manager-details">
          <h3>Manager Information</h3>
          {isEditing ? (
            <>
              <input
                type="text"
                name="name"
                value={managerData.name}
                placeholder='Name'
                onChange={handleInputChange}
                className='input-box-profile'
              />
              <input
                type="text"
                name="username"
                placeholder='Username'
                value={managerData.username}
                onChange={handleInputChange}
                className='input-box-profile'
              />
              <input
                type="password"
                name="password"
                value={managerData.password}
                placeholder='Password'
                onChange={handleInputChange}
                className='input-box-profile'
              />
            </>
          ) : (
            <>
              <p>Name: {managerData.name}</p>
              <p>Username: {managerData.username}</p>
              <p>Password: {managerData.password}</p>
            </>
          )}
        </div>
        <div className="company-details">
          <h3>Company Information</h3>
          {isEditing ? (
            <>
              <input
                type="text"
                name="name"
                placeholder='Company Name'
                value={managerData.company?.name || ''}
                onChange={handleCompanyInputChange}
                className='input-box-profile'
              />
              <input
                type="text"
                name="address"
                placeholder='Company Address'
                value={managerData.company?.address || ''}
                onChange={handleCompanyInputChange}
                className='input-box-profile'
              />
              <input
                type="email"
                name="email"
                placeholder='Company Email'
                value={managerData.company?.email || ''}
                onChange={handleCompanyInputChange}
                className='input-box-profile'
              />
              <input
                type="text"
                name="phoNo"
                placeholder='Contact Number'
                value={managerData.company?.phoNo || ''}
                onChange={handleCompanyInputChange}
                className='input-box-profile'
              />
              <input
                type="text"
                name="businessRegNo"
                placeholder='Business Registration Number'
                value={managerData.company?.businessRegNo || ''}
                onChange={handleCompanyInputChange}
                className='input-box-profile'
              />
              
              <input
                type="text"
                name="vatNo"
                placeholder='VAT / GST Number'
                value={managerData.company?.vatNo || ''}
                onChange={handleCompanyInputChange}
                className='input-box-profile'
              />
            </>
          ) : (
            <>
              <p>Name: {managerData.company?.name || 'N/A'}</p>
              <p>Address: {managerData.company?.address || 'N/A'}</p>
              <p>Email: {managerData.company?.email || 'N/A'}</p>
              <p>Contact Number: {managerData.company?.phoNo || 'N/A'}</p>
              <p>Business Registration Number: {managerData.company?.businessRegNo || 'N/A'}</p>
              <p>VAT/GST Number: {managerData.company?.vatNo || 'N/A'}</p>
            </>
          )}
        </div>
        {isEditing && <button onClick={handleSave} className='save-btn-profile'>Save Changes</button>}
      </div>
      <Footer />
    </>
  );
};

export default ManagerProfile;