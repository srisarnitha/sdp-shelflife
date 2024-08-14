import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UserContext } from './UserContext';

const PrivateRoute = () => {
  const { user } = useContext(UserContext);

  const isAuthenticated = () => {
    return user && user.id;
  };

  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;