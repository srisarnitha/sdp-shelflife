import React, { useState } from 'react';
import '../assets/css/AddVendor.css';
import Header from './Header';
// import Panel from './Panel';
import Footer from './Footer';
import axios from 'axios';

const AddVendor = ({ userType }) => {
  const [formData, setFormData] = useState({
    contactName: '',
    email: '',
    gstTin: '',
    name: '',
    phoneNo: '',
    productName: '',
    productType: '',
    vendorAddress: '',
    vendorCategory: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    const resp = await axios.post("http://localhost:8081/add-vendor", formData);
    console.log(resp);

  };

  return (
    <>
      <Header />
      {/* <Panel userType={userType} /> */}
      <div className="form-container-vendor">
        <form className="vendor-form" onSubmit={handleSubmit}>
          <h1 className='header-vendor'>Add Vendor Details</h1>
          <div className="form-group-v1">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group-v1">
            <input
              type="text"
              name="name"
              placeholder="Vendor Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group-v1">
            <input
              type="text"
              name="vendorAddress"
              placeholder="Vendor Address"
              value={formData.vendorAddress}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group-v1">
            <input
              type="text"
              name="vendorCategory"
              placeholder="Vendor Category"
              value={formData.vendorCategory}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group-v1">
            <input
              type="text"
              name="contactName"
              placeholder="Contact Name"
              value={formData.contactName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group-v1">
            <input
              type="tel"
              name="phoneNo"
              placeholder="Contact Number"
              value={formData.phoneNo}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group-v1">
            <input
              type="text"
              name="productName"
              placeholder="Product Name"
              value={formData.productName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group-v1">
            <input
              type="text"
              name="productType"
              placeholder="Product Type"
              value={formData.productType}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group-v1">
            <input
              type="text"
              name="gstTin"
              placeholder="GST/TIN"
              value={formData.gstTin}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group-v1 full-width">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default AddVendor;