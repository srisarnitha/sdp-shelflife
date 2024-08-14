import React, { Fragment, useContext, useEffect, useState } from 'react';
import '../assets/css/BillingPage.css';
import axios from 'axios';
import { UserContext } from './UserContext';

const BillingPage = () => {
  const [billNo, setBillNo] = useState(Math.floor(100000 + Math.random() * 900000)); // auto-generated bill no
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]); // current date
  const [search, setSearch] = useState('');
  const [cashierName, setCashierName] = useState('John Doe'); // cashier name
  const [cashierId, setCashierId] = useState('CASH001'); // cashier id
  const [products, setProducts] = useState([]);
  const [totalItemsSold, setTotalItemsSold] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const [discountType, setDiscountType] = useState('Percentage'); // default discount type
  const [discountValue, setDiscountValue] = useState(0); // default discount value
  const [paymentMode, setPaymentMode] = useState('cash'); // Default payment mode
  const [errorMessage, setErrorMessage] = useState(''); // State for error message



  const {user} = useContext(UserContext);
  

  const handleSearch = (event) => {
    setSearch(event.target.value);  
  };

  const handleQuantityChange = (index, event) => {
    const newQuantity = Number(event.target.value);
    const newProducts = [...products];
    const oldProduct = products[index];
    const oldAmount = oldProduct.quantity * oldProduct.mrp;
    const newAmount = newQuantity * oldProduct.mrp;
    newProducts[index] = { ...oldProduct, quantity: newQuantity, amount: newAmount };
    setProducts(newProducts);
    calculateGrandTotal(); // Call calculateGrandTotal after updating products
  };

  const handleMRPChange = (index, event) => {
    const newMRP = Number(event.target.value);
    const newProducts = [...products];
    const oldProduct = products[index];
    const oldAmount = oldProduct.quantity * oldProduct.mrp;
    const newAmount = oldProduct.quantity * newMRP;
    newProducts[index] = { ...oldProduct, mrp: newMRP, amount: newAmount };
    setProducts(newProducts);
    calculateGrandTotal(); // Call calculateGrandTotal after updating products
  };

  const calculateGrandTotal = () => {
    let totalTax = 0;
    let totalAmount = 0;

    products.forEach((product) => {
      const taxAmount = product.mrp * product.gstRate / 100;
      totalAmount += product.quantity * product.mrp;
      totalTax += taxAmount;
    });

    let discountedTotal = totalAmount;
    if (discountType === 'Percentage') {
      discountedTotal = totalAmount - (totalAmount * discountValue / 100);
    } else if (discountType === 'Amount') {
      discountedTotal = totalAmount - discountValue;
    }

    setGrandTotal(discountedTotal + totalTax);
  };

  const handleDiscountTypeChange = (event) => {
    setDiscountType(event.target.value);
    calculateGrandTotal(); // Recalculate grand total on discount type change
  };

  const handleDiscountValueChange = (event) => {
    setDiscountValue(Number(event.target.value));
    calculateGrandTotal(); // Recalculate grand total on discount value change
  };

  // const handleAddProduct = (event) => {
  //   if (event.key === 'Enter') {
  //     const productName = event.target.value;
  //     const quantity = 1; // Default quantity
  //     const gstRate = 0; // Default GST rate
  //     const mrp = 0; // Default MRP
  //     const amount = mrp * quantity; // Calculate amount
  //     const newProduct = { name: productName, quantity, gstRate, mrp, amount };
  //     setProducts([...products, newProduct]);
  //     setTotalItemsSold(totalItemsSold + 1);
  //     calculateGrandTotal(); // Call calculateGrandTotal after adding product
  //   }
  // };

  const handleAddProduct = async (event) => {
    if (event.key === 'Enter') {
      const productName = event.target.value;

      try {
        const response = await axios.get(`http://localhost:8081/product/search/${productName}`);

        if (response.data) {
          const product = response.data;
          const quantity = 1;
          const gstRate = product.gstRate || 0;
          const mrp = product.mrp || 0;
          const amount = mrp * quantity;
          const newProduct = { pname: product.pname, quantity, gstRate, mrp, amount };

          setProducts([...products, newProduct]);
          setTotalItemsSold(totalItemsSold + 1);
          calculateGrandTotal();
          setErrorMessage(''); // Clear error message if product is found
        } else {
          setErrorMessage('Product not found'); // Set error message if product is not found
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        setErrorMessage('Error fetching product'); // Set error message on error
      }
    }
  };



  useEffect(() => {
    calculateGrandTotal();
  }, [products]);
  
  const handleRemoveProduct = (index) => {
    const newProducts = [...products];
    newProducts.splice(index, 1);
    setProducts(newProducts);
    setTotalItemsSold(totalItemsSold - 1);
    calculateGrandTotal(); 
  };
  
  
  // const handlePrint = () => {
    // const salesData = {
    //   date: date,
    //   cashier_id : cashierId,
    //   total_amt: grandTotal
    // }
    // const resp = axios.post('', salesData);
    // //it should return the response record - ResponseEntity.ok(Sales)
    // const id = Response.data.sale_id
    // window.print();
  // }

  const handlePaymentModeChange = (event) => {
    setPaymentMode(event.target.value);
  };


  useEffect(()=>{
    setCashierId(user.uid);
    setCashierName(user.name);
  }, [])

  // const handlePrint = async () => {
  //   const billData = {
  //     billNo,
  //     date,
  //     cashierName,
  //     cashierId,
  //     totalItems: totalItemsSold,
  //     grandTotal,
  //     discountType,
  //     discountValue,
  //     paymentMode: paymentMode,
  //     products
  //   };

  //   console.log(billData);
  
  //   // try {
  //   //   const response = await axios.post(`http://localhost:8080/save-bill`, billData);
  //   //   console.log(response);
  //   //     console.log('Bill saved successfully');
  //   //     window.print();
      
  //   // } catch (error) {
  //   //   console.error('Error saving bill:', error);
  //   // }
  // };
  

  const handlePrint = async () => {
    const billData = {
      billNo,
      date,
      cashierName,
      cashierId,
      totalItems: totalItemsSold,
      grandTotal,
      discountType,
      discountValue,
      paymentMode: paymentMode,
      products
    };
    console.log(billData);

    try {
      const response = await axios.post(`http://localhost:8081/save-bill`, billData);
      console.log(response);
      console.log('Bill saved successfully');
      window.print();
    } catch (error) {
      console.error('Error saving bill:', error);
    }
  };

  
  
  return (
    <Fragment>
      <div className="billing-page">
        <div className="bill-no-date">
          <label>Bill No.: {billNo}</label>
          <label>Date: {date}</label>
          <label>Cashier Name: {cashierName}</label>
          <label>Cashier ID: {cashierId}</label>
        </div>
       
        <div className="add-product">
          <label>Add Product:</label>
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} {/* Display error message */}
          <input type="text" placeholder="Enter product name..." onKeyDown={handleAddProduct} />
        </div>
        <div className="product-table">
          <table>
            <thead>
              <tr>
                <th>S.No.</th>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>GST Rate</th>
                <th>MRP</th>
                <th>Tax</th>
                <th>Total Amount</th>
                <th className='nodisplay'>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <input type="text" value={product.pname} onChange={(event) => {
                      const newProduct = {...product, name: event.target.value };
                      const newProducts = [...products];
                      newProducts[index] = newProduct;
                      setProducts(newProducts);
                    }} />
                  </td>
                  <td>
                    <input type="number" value={product.quantity} onChange={(event) => handleQuantityChange(index, event)}  />
                  </td>
                  <td>
                    <input type="number" value={product.gstRate} onChange={(event) => {
                      const newProduct = {...product, gstRate: event.target.value };
                      const newProducts = [...products];
                      newProducts[index] = newProduct;
                      setProducts(newProducts);
                    }} />
                  </td>
                  <td>
                    <input type="number" value={product.mrp} onChange={(event) => {
                      handleMRPChange(index, event)
                    }} />
                  </td>
                  <td>
                    {(product.mrp * product.gstRate / 100).toFixed(2)}
                  </td>
                  <td>
                    {(product.quantity * product.mrp).toFixed(2)}
                  </td>
                  <td>
                    <button onClick={() => handleRemoveProduct(index)}>Remove</button>
                  </td>
                </tr>
              ))}
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td><strong>{grandTotal.toFixed(2)}</strong></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="billing-requirements">
  <div className='bill-1'>
    <div className='bill-2'>
    <label>Payment Mode:</label>
    <select value={paymentMode} onChange={handlePaymentModeChange}>
      <option value="cash">Cash</option>
      <option value="card">Card</option>
      <option value="upi">UPI</option>
    </select>
    </div>

    <div className='bill-2'>
    <label>Discount Type:</label>
    <select value={discountType} onChange={handleDiscountTypeChange}>
      <option value="Percentage">Percentage</option>
      <option value="Amount">Amount</option>
    </select>
    </div>

    <div className='bill-2'>
    <label>Discount Value:</label>
    <input className="select-bill" type="number" value={discountValue} onChange={handleDiscountValueChange} />
    </div>
  </div>
  <div>
    <label>Total Items Sold: {totalItemsSold}</label>
    <label>Grand Total: ₹ {grandTotal.toFixed(2)}</label>
  </div>
</div>
      <button className='print-btn' onClick={handlePrint}>Print</button>
</div>


    </Fragment>
  );
};

export default BillingPage;