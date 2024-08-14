import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../assets/css/VendorDetails.css';
import Header from './Header';
import Footer from './Footer';

const VendorDetails = ({ userType }) => {
  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await axios.get('http://localhost:8081/get-vendors');
        setVendors(response.data);
      } catch (error) {
        console.error('Error fetching vendor data:', error);
      }
    };

    fetchVendors();
  }, []);

  return (
    <>
      <Header />
      <div className="vendor-table">
        <header className='header-table1'>
          <h1>Vendor Details</h1>
        </header>
        <table className="vendor-table__table">
          <thead>
            <tr>
              <th className="vendor-table__th">ID</th>
              <th className="vendor-table__th">Name</th>
              <th className="vendor-table__th">Address</th>
              <th className="vendor-table__th">GST TIN</th>
              <th className="vendor-table__th">Phone No</th>
              <th className="vendor-table__th">Product Name</th>
              <th className="vendor-table__th">Product Type</th>
              <th className="vendor-table__th">Vendor Category</th>
              <th className="vendor-table__th">Contact Name</th>
              <th className="vendor-table__th">Email</th>
            </tr>
          </thead>
          <tbody>
            {vendors.map((vendor) => (
              <tr key={vendor.id} className="vendor-table__tr">
                <td className="vendor-table__td">{vendor.id}</td>
                <td className="vendor-table__td">{vendor.name}</td>
                <td className="vendor-table__td">{vendor.vendorAddress}</td>
                <td className="vendor-table__td">{vendor.gstTin}</td>
                <td className="vendor-table__td">{vendor.phoneNo}</td>
                <td className="vendor-table__td">{vendor.productName}</td>
                <td className="vendor-table__td">{vendor.productType}</td>
                <td className="vendor-table__td">{vendor.vendorCategory}</td>
                <td className="vendor-table__td">{vendor.contactName}</td>
                <td className="vendor-table__td">{vendor.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </>
  );
};

export default VendorDetails;