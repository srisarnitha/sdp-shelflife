import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Panel from './components/Panel';
import Grievance from './components/Grievance';
import GrievanceView from './components/GrievanceView';
import Header from './components/Header';
import Footer from './components/Footer';
import StockDetails from './components/StockDetails';
import StockCash from './components/StockCash';
import ManagerDashboard from './components/ManagerDashboard';
import CashierDashboard from './components/CashierDashboard';
import VendorTable from './components/VendorDetails';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import AddVendor from './components/AddVendor';
import ContactUs from './components/ContactUs';
import BillingPage from './components/BillingPage';
import StaffDashboard from './components/StaffDashboard';
import HomePage from './components/HomePage';
import EmployeeDetail from './components/EmployeeDetail';
import ManagerProfile from './components/ManagerProfile';
// import { AuthProvider } from './components/AuthProvider';
import { UserProvider } from './components/UserContext';
import PrivateRoute from './components/PrivateRoute';
import { useState } from 'react';
import EmployeeView from './components/EmployeeView';
// import Main from './components/Main';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState(null);

  return (
    <div className='App'>

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />

              <Route path="/manager" element={<ManagerDashboard />} />
              <Route path="/manager-profile" element={<ManagerProfile />} />
              <Route path="/grievance" element={<Grievance />} />
              <Route path="/grievance-view" element={<GrievanceView />} />
              <Route path="/add-vendor" element={<AddVendor />} />
              <Route path="/vendor-details" element={<VendorTable />} />
              <Route path="/grievance-view" element={<GrievanceView />} />
              <Route path="/employee-details" element={<EmployeeView />} />
              <Route path="/stock" element={<StockDetails />} />
              <Route path="/stock-view" element={<StockCash />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/billing" element={<BillingPage />} />
              <Route path="/add-employee" element={<EmployeeDetail />} />
              <Route path="/cashier" element={<CashierDashboard />} />
              <Route path="/staff" element={<StaffDashboard />} />
          </Routes>
    </div>
  );
}

export default App;