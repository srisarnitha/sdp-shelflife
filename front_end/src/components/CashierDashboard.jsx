import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';
import { Line, Pie, Bar, Radar } from 'react-chartjs-2';
import '../assets/css/ManagerDashboard.css';
import Header from './Header';
import Panelcash from './Panelcash';
import Footer1 from '../components/Footer1';
import { useAuth } from './AuthProvider';
import { useNavigate } from 'react-router-dom';



const CashDashboard = ({userType}) => {



    const [salesData, setSalesData] = useState({
        toBeDelivered: [
          { product: 'Product A', quantity: 100 },
          { product: 'Product B', quantity: 150 },
        ],
        bestSellingProducts: [
          { category: 'Fruits', product: 'Apple', quantity: 500 },
          { category: 'Vegetables', product: 'Carrot', quantity: 400 },
        ],
        lowStockItems: [
          { product: 'Product A', quantity: 5 },
          { product: 'Product B', quantity: 20 },
          { product: 'Product C', quantity: 10 },
          { product: 'Product D', quantity: 15 },
        ],
        monthlySales: [10000, 12000, 15000, 11000, 9000, 13000, 14000, 16000, 18000, 20000, 22000, 25000],
        yearlySales: [100000, 120000, 150000, 180000, 210000, 240000],
        productsAboutToExpire: [
          { product: 'Product E', expiryDate: '2024-12-31' },
        ],
        salesByCategory: [
          { label: 'Fruits', value: 30 },
          { label: 'Vegetables', value: 25 },
          { label: 'Dairy', value: 20 },
          { label: 'Grains', value: 15 },
          { label: 'Others', value: 10 },
        ],
      });
    
      const [attendanceData, setAttendanceData] = useState({
        yearlySales: [900000, 850000, 750000, 900000, 1000000, 700000],
      });
    
      const [employeeData, setEmployeeData] = useState({
        attendance: [
          { employee: 'Employee A', data: [85, 90, 88, 92, 87, 91, 89, 93, 86, 94, 85, 92] },
          { employee: 'Employee B', data: [90, 85, 92, 88, 91, 86, 93, 87, 90, 89, 92, 85] }
        ],
        employees: [
          { name: 'Employee A', role: 'Manager' },
          { name: 'Employee B', role: 'Cashier' },
        ],
      });

      const employeeColors = ['#63b3d0a2', '#d063a1a2'];

      const [lowStockData, setLowStockData] = useState({
        products: ['Product A', 'Product B', 'Product C', 'Product D'],
        stockLevels: [5, 20, 10, 15]
      });


      


  return (
    <>
    <Header/>
    <Panelcash userType={userType}/>
    <div className="dashboard">
    
    <div className='dash'>
        <div className="section-d-small">
            <h2>Bills Generated Today</h2>
            <div className='sub-section-d'>
                <h4>100</h4>
            </div>
        </div>
        <div className="section-d-small">
            <h2>Total Sales Today</h2>
            <div className='sub-section-d'>
                <h4>$7000</h4>
            </div>
        </div>
        <div className="section-d-small">
            <h2>Units Sold Today</h2>
            <div className='sub-section-d'>
                <h4>70</h4>
            </div>
        </div>
    </div>

    <div className='dash'>
        <div className="section-d">
        <h2>Sales Overview</h2>
        <div className="chart-container">
          <Bar data={{
            labels: ['Current Month', 'Previous Month'],
            datasets: [{
              label: 'Sales',
              data: salesData?.monthlySales || [], // Handle empty data
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1
            }]
          }} />
        </div>
      </div>

      <div className="section-d">
        <h2>Low Stock Products</h2>
        <div className="chart-container">
          <Radar data={{
            labels: lowStockData.products,
            datasets: [{
              label: 'Stock Level',
              data: lowStockData.stockLevels,
              fill: true,
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgba(255, 99, 132, 1)',
              pointBackgroundColor: 'rgba(255, 99, 132, 1)',
              pointBorderColor: '#fff',
              pointRadius: 3
            }]
          }} />
        </div>
      </div>

      <div className="section-d">
      <h2>Attendance Data</h2>
      <div className="chart-container">
        <Line data={{
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          datasets: [
            {
              label: 'Sales',
              data: attendanceData?.monthly || [], 
              fill: false,
              borderColor: 'rgba(75, 192, 192, 1)',
              tension: 0.1
            }
          ]
        }} />
      </div>
    </div>
    </div>

    
    </div>
    <Footer1/>
    </>
  );
};

export default CashDashboard;