// src/components/ProtectedRoute.js
import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './context/AuthContext';


const ProtectedRoute = ({ children , roles }) => {
    const { isAuthenticated, checkAuth ,userRole } = useAuth();
    const location = useLocation();

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    
    if (userRole !== "admin") {
        
        return <Navigate to="/login" state={{ from: location }} replace/>;
    }

    return children;
};

export default ProtectedRoute;
