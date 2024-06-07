// src/context/AuthContext.js
import axios from 'axios';
import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const [userRole, setUserRole] = useState('user');

  const login = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:5000/api/login', { email, password }, { withCredentials: true });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('role', response.data.role);
      setIsAuthenticated(true);
      setUserRole(response.data.role);
      console.log(response.data.role)
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setIsAuthenticated(false);
    setUserRole('guest');
  };

  const checkAuth = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setIsAuthenticated(false);
      setUserRole('user');
      return;
    }else{
      setIsAuthenticated(true);
      setUserRole(localStorage.getItem('role'));
    }

    /* try {
      const response = await axios.get('http://localhost:5000/api/protected', {
        headers: { Authorization: token },
        
      });
      setIsAuthenticated(true);
      setUserRole(response.role);
      console.log(response.role)
    } catch (error) {
      setIsAuthenticated(false);
      setUserRole('guest');
    } */
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, userRole , checkAuth}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
