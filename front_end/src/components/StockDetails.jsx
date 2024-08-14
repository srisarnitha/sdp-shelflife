import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../assets/css/StockDetails.css';
import Header from './Header';
import Footer from './Footer';

const StockDetails = ({ userType }) => {
  const [stockData, setStockData] = useState({ products: [] });
  const [isEditing, setIsEditing] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newProduct, setNewProduct] = useState({
    pname: '',
    unitPrice: '',
    mrp: '',
    expiry: '',
    category: '',
    quantity: '',
    vendorId: '',
    threshold: '',
  });
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

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

  const handleEditClick = (product) => {
    setEditProduct(product);
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };

  const handleSaveClick = async () => {
    try {
      const resp = await axios.put(`http://localhost:8081/update-product/${editProduct.pid}`, editProduct);
      setStockData((prevData) => ({
        products: prevData.products.map((product) =>
          product.pid === editProduct.pid ? editProduct : product
        ),
      }));
      console.log(resp);
      setIsEditing(false);
      setEditProduct(null);
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditProduct(null);
  };

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`http://localhost:8081/delete-product/${productId}`);
      setStockData((prevData) => ({
        products: prevData.products.filter(product => product.pid !== productId),
      }));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleAddProductClick = () => {
    setIsAdding(true);
  };

  const handleNewProductChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };

  const handleSaveNewProductClick = async () => {
    try {
      const resp = await axios.post('http://localhost:8081/add-product', newProduct);
      setStockData((prevData) => ({
        products: [...prevData.products, resp.data],
      }));
      console.log(resp);
      setIsAdding(false);
      setNewProduct({
        pname: '',
        unitPrice: '',
        mrp: '',
        expiry: '',
        category: '',
        quantity: '',
        vendorId: '',
        threshold: '',
      });
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const handleCancelNewProductClick = () => {
    setIsAdding(false);
    setNewProduct({
      pname: '',
      unitPrice: '',
      mrp: '',
      expiry: '',
      category: '',
      quantity: '',
      vendorId: '',
      threshold: '',
    });
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedProducts = [...stockData.products].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const isExpiryWithin10Days = (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffInTime = expiry.getTime() - today.getTime();
    const diffInDays = diffInTime / (1000 * 3600 * 24);
    return diffInDays <= 10;
  };

  return (
    <>
      <Header />
      <header className='header-table-st'>
        <h1>Stock Details</h1>
      </header>
      <main>
        <table className="product-table-st">
          <thead>
            <tr>
              <th className="table-header-cell" onClick={() => handleSort('pid')}>Product ID</th>
              <th className="table-header-cell" onClick={() => handleSort('pname')}>Product Name</th>
              <th className="table-header-cell" onClick={() => handleSort('unitPrice')}>Unit Price</th>
              <th className="table-header-cell" onClick={() => handleSort('mrp')}>MRP</th>
              <th className="table-header-cell" onClick={() => handleSort('expiry')}>Expiry</th>
              <th className="table-header-cell" onClick={() => handleSort('category')}>Category</th>
              <th className="table-header-cell" onClick={() => handleSort('quantity')}>Stock Quantity</th>
              <th className="table-header-cell" onClick={() => handleSort('threshold')}>Threshold</th>
              <th className="table-header-cell" onClick={() => handleSort('vendorId')}>Vendor ID</th>
              <th className="table-header-cell">Action</th>
            </tr>
          </thead>
          <tbody>
            {sortedProducts.map((product, index) => (
              <tr key={index} className={index % 2 === 0 ? "alternate-row" : ""}>
              <td className={`table-data-cell ${product.quantity < product.threshold ? 'low-stock' : ''} ${isExpiryWithin10Days(product.expiry) ? 'expiry-warning' : ''}`}>
              {product.pid}</td>
              <td className={`table-data-cell ${product.quantity < product.threshold ? 'low-stock' : ''} ${isExpiryWithin10Days(product.expiry) ? 'expiry-warning' : ''}`}>
                  {isEditing && editProduct.pid === product.pid ? (
                    <input
                      type="text"
                      name="pname"
                      value={editProduct.pname}
                      onChange={handleInputChange}
                    />
                  ) : (
                    product.pname
                  )}
                </td>
                <td className={`table-data-cell ${product.quantity < product.threshold ? 'low-stock' : ''} ${isExpiryWithin10Days(product.expiry) ? 'expiry-warning' : ''}`}>
                {isEditing && editProduct.pid === product.pid ? (
                    <input
                      type="number"
                      name="unitPrice"
                      value={editProduct.unitPrice}
                      onChange={handleInputChange}
                    />
                  ) : (
                    product.unitPrice
                  )}
                </td>
                <td className={`table-data-cell ${product.quantity < product.threshold ? 'low-stock' : ''} ${isExpiryWithin10Days(product.expiry) ? 'expiry-warning' : ''}`}>
                {isEditing && editProduct.pid === product.pid ? (
                    <input
                      type="number"
                      name="mrp"
                      value={editProduct.mrp}
                      onChange={handleInputChange}
                    />
                  ) : (
                    product.mrp
                  )}
                </td>
                <td className={`table-data-cell ${product.quantity < product.threshold ? 'low-stock' : ''} ${isEditing && editProduct.pid === product.pid ? 'expiry-warning' : isExpiryWithin10Days(product.expiry) ? 'expiry-warning-rec' : ''}`}>
                {isEditing && editProduct.pid === product.pid ? (
                  <input
                    type="text"
                    name="expiry"
                    value={editProduct.expiry || ''}
                    onChange={handleInputChange}
                  />
                ) : (
                  product.expiry || 'N/A'
                )}
              </td>

                <td className={`table-data-cell ${product.quantity < product.threshold ? 'low-stock' : ''} ${isExpiryWithin10Days(product.expiry) ? 'expiry-warning' : ''}`}>
                {isEditing && editProduct.pid === product.pid ? (
                    <input
                      type="text"
                      name="category"
                      value={editProduct.category}
                      onChange={handleInputChange}
                    />
                  ) : (
                    product.category
                  )}
                </td>
                <td className={`table-data-cell ${isExpiryWithin10Days(product.expiry) ? 'expiry-warning' : ''} ${isEditing && editProduct.pid === product.pid ? 'low-stock' : product.quantity < product.threshold ? 'low-stock-rec' : ''}`}>
                {isEditing && editProduct.pid === product.pid ? (
                    <input
                      type="number"
                      name="quantity"
                      value={editProduct.quantity}
                      onChange={handleInputChange}
                    />
                  ) : (
                    product.quantity
                  )}
                </td>
                <td className={`table-data-cell ${product.quantity < product.threshold ? 'low-stock' : ''} ${isExpiryWithin10Days(product.expiry) ? 'expiry-warning' : ''}`}>
                {isEditing && editProduct.pid === product.pid ? (
                    <input
                      type="number"
                      name="threshold"
                      value={editProduct.threshold}
                      onChange={handleInputChange}
                    />
                  ) : (
                    product.threshold
                  )}
                </td>
                <td className={`table-data-cell ${product.quantity < product.threshold ? 'low-stock' : ''} ${isExpiryWithin10Days(product.expiry) ? 'expiry-warning' : ''}`}>
                {isEditing && editProduct.pid === product.pid ? (
                    <input
                      type="number"
                      name="vendorId"
                      value={editProduct.vendorId}
                      onChange={handleInputChange}
                    />
                  ) : (
                    product.vendorId
                  )}
                </td>
                <td className={`table-data-cell ${product.quantity < product.threshold ? 'low-stock' : ''} ${isExpiryWithin10Days(product.expiry) ? 'expiry-warning' : ''}`}>
                {isEditing && editProduct.pid === product.pid ? (
                    <>
                      <button className="update-button" onClick={handleSaveClick}>Save</button>
                      <button className="remove-button" onClick={handleCancelClick}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <button className="update-button" onClick={() => handleEditClick(product)}>Edit</button>
                      <button className="remove-button" onClick={() => handleDelete(product.pid)}>Delete</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
            {isAdding && (
              <tr>
                <td className="table-data-cell">New</td>
                <td className="table-data-cell">
                  <input
                    type="text"
                    name="pname"
                    value={newProduct.pname}
                    onChange={handleNewProductChange}
                  />
                </td>
                <td className="table-data-cell">
                  <input
                    type="number"
                    name="unitPrice"
                    value={newProduct.unitPrice}
                    onChange={handleNewProductChange}
                  />
                </td>
                <td className="table-data-cell">
                  <input
                    type="number"
                    name="mrp"
                    value={newProduct.mrp}
                    onChange={handleNewProductChange}
                  />
                </td>
                <td className="table-data-cell">
                  <input
                    type="text"
                    name="expiry"
                    value={newProduct.expiry}
                    onChange={handleNewProductChange}
                  />
                </td>
                <td className="table-data-cell">
                  <input
                    type="text"
                    name="category"
                    value={newProduct.category}
                    onChange={handleNewProductChange}
                  />
                </td>
                <td className="table-data-cell">
                  <input
                    type="number"
                    name="quantity"
                    value={newProduct.quantity}
                    onChange={handleNewProductChange}
                  />
                </td>
                <td className="table-data-cell">
                  <input
                    type="number"
                    name="threshold"
                    value={newProduct.threshold}
                    onChange={handleNewProductChange}
                  />
                </td>
                <td className="table-data-cell">
                  <input
                    type="number"
                    name="vendorId"
                    value={newProduct.vendorId}
                    onChange={handleNewProductChange}
                  />
                </td>
                <td className="table-data-cell">
                  <button className="update-button" onClick={handleSaveNewProductClick}>Save</button>
                  <button className="remove-button" onClick={handleCancelNewProductClick}>Cancel</button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {!isAdding && (
          <button className="add-button" onClick={handleAddProductClick}>Add Product</button>
        )}
      </main>
      <Footer />
    </>
  );

}

export default StockDetails;