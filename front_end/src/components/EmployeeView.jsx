import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import '../assets/css/EmployeeView.css'; 
import Header from './Header';
import Footer from './Footer';
import { UserContext } from './UserContext';

const EmployeeView = () => {
  const [employees, setEmployees] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editEmployee, setEditEmployee] = useState(null);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const cid = user.company.cid;
        const response = await axios.get(`http://localhost:8081/get-employees/${cid}`);
        setEmployees(response.data);
      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
    };

    fetchEmployees();
  }, [user]);

  const handleEditClick = (employee) => {
    setEditEmployee(employee);
    setIsEditing(true);
  };

  const handleDeleteClick = async (uid) => {
    try {
      await axios.delete(`http://localhost:8081/delete-employee/${uid}`);
      setEmployees(employees.filter(employee => employee.uid !== uid));
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  const handleSaveClick = async () => {
    try {
      await axios.put(`http://localhost:8081/update-employee/${editEmployee.uid}`, editEmployee);
      setEmployees(employees.map(emp => emp.uid === editEmployee.uid ? editEmployee : emp));
      setIsEditing(false);
      setEditEmployee(null);
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditEmployee(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditEmployee({ ...editEmployee, [name]: value });
  };

  return (
    <>
      <Header />
      <div className="employee-table">
        <header className='header-table1'>
          <h1>Employee Details</h1>
        </header>
        <table className="employee-table__table">
          <thead>
            <tr>
              <th className="employee-table__th">UID</th>
              <th className="employee-table__th">Email</th>
              <th className="employee-table__th">Username</th>
              <th className="employee-table__th">Name</th>
              <th className="employee-table__th">User Type</th>
              <th className="employee-table__th">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.uid} className="employee-table__tr">
                <td className="employee-table__td">{employee.uid}</td>
                <td className="employee-table__td">
                  {isEditing && editEmployee?.uid === employee.uid ? (
                    <input
                      type="text"
                      name="email"
                      value={editEmployee.email}
                      onChange={handleInputChange}
                    />
                  ) : (
                    employee.email
                  )}
                </td>
                <td className="employee-table__td">
                  {isEditing && editEmployee?.uid === employee.uid ? (
                    <input
                      type="text"
                      name="username"
                      value={editEmployee.username}
                      onChange={handleInputChange}
                    />
                  ) : (
                    employee.username
                  )}
                </td>
                <td className="employee-table__td">
                  {isEditing && editEmployee?.uid === employee.uid ? (
                    <input
                      type="text"
                      name="name"
                      value={editEmployee.name}
                      onChange={handleInputChange}
                    />
                  ) : (
                    employee.name
                  )}
                </td>
                <td className="employee-table__td">
                  {isEditing && editEmployee?.uid === employee.uid ? (
                    <input
                      type="text"
                      name="user_type"
                      value={editEmployee.user_type}
                      onChange={handleInputChange}
                    />
                  ) : (
                    employee.user_type
                  )}
                </td>
                <td className="employee-table__td">
                  {isEditing && editEmployee?.uid === employee.uid ? (
                    <>
                      <button className="action-btn" onClick={handleSaveClick}>Save</button>
                      <button className="action-btn" onClick={handleCancelClick}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <button className="action-btn" onClick={() => handleEditClick(employee)}>Edit</button>
                      <button className="action-btn" onClick={() => handleDeleteClick(employee.uid)}>Delete</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </>
  );
};

export default EmployeeView;