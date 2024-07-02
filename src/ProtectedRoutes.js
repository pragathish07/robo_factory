// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext'; // Adjust the import according to your project structure
import { useLocation } from 'react-router-dom';


const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();  


  if (!isAuthenticated) {
    return <Navigate to="/login" state={{from:location}} replace />;
  }

  return children;
};

export default ProtectedRoute;
