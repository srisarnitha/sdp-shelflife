import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../assets/css/StockDetails.css';
import Header from './Header';
// import Panel from './Panel';

const StockDetails = ({ userType }) => {
  const [stockData, setStockData] = useState({ products: [] });

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await axios.get('http://localhost:8081/get-stock-details');
        console.log(response);
        setStockData({ products: response.data });
      } catch (error) {
        console.error('Error fetching stock data:', error);
      }
    };

    fetchStockData();
  }, []);

  return (
    <>
      <Header />
      {/* <Panel userType={userType}/> */}
      <header className='header-table-st'>
        <h1>Stock Details</h1>
      </header>
      <main>
        <table className="product-table-st">
          <thead>
            <tr>
              <th className="table-header-cell">Product ID</th>
              <th className="table-header-cell">Product Name</th>
              <th className="table-header-cell">Unit Price</th>
              <th className="table-header-cell">MRP</th>
              <th className="table-header-cell">Expiry</th>
              <th className="table-header-cell">Category</th>
              <th className="table-header-cell">Stock Quantity</th>
              <th className="table-header-cell">Threshold</th>
              <th className="table-header-cell">Vendor ID</th>
            </tr>
          </thead>
          <tbody>
            {stockData.products.map((product, index) => (
              <tr key={index} className={index % 2 === 0 ? "alternate-row" : ""}>
                <td className="table-data-cell">{product.pid}</td>
                <td className="table-data-cell">{product.pname}</td>
                <td className="table-data-cell">{product.unitPrice}</td>
                <td className="table-data-cell">{product.mrp}</td>
                <td className="table-data-cell">{product.expiry || 'N/A'}</td>
                <td className="table-data-cell">{product.category}</td>
                <td className="table-data-cell">{product.quantity}</td>
                <td className="table-data-cell">{product.threshold}</td>
                <td className="table-data-cell">{product.vendorId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </>
  );
};

export default StockDetails;