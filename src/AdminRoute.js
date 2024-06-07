// src/components/AdminRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

const AdminRoute = ({ children ,role}) => {
  const { isAuthenticated, userRole } = useAuth();
    const admin = localStorage.getItem('role');

  if (!role.includes(userRole)) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default AdminRoute;
