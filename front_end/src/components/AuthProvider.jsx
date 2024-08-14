import React, { createContext, useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const [userType, setUserType] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedData = localStorage.getItem('authData');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setIsLoggedIn(parsedData.isLoggedIn);
      setUserId(parsedData.userId);
      setUserType(parsedData.userType);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('authData', JSON.stringify({ isLoggedIn, userId, userType }));
  }, [isLoggedIn, userId, userType]);

  const login = useCallback(({ userId, userType }) => {
    setIsLoggedIn(true);
    setUserId(userId);
    setUserType(userType);
  }, []);

  const logout = () => {
    setIsLoggedIn(false);
    setUserId(null);
    setUserType(null);
    localStorage.removeItem('authData');
    navigate("/");
  };

  const value = { isLoggedIn, login, logout, userId, userType };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};