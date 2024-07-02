import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

const AdminRoute = ({ children }) => {
  const { isAuthenticated, userRole } = useAuth();

  // Define the roles that have admin access
  const adminRoles = ['admin', 'superadmin']; // Example roles, adjust as needed

  if (!isAuthenticated || !adminRoles.includes(userRole)) {
    return <Navigate to="/login" />
  }

  return children;
};

export default AdminRoute;
