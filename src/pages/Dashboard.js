// Dashboard.js
import React, { useState } from 'react';
import Sidebar from '../components/Dashboard/Sidebar';
import Header from '../components/Dashboard/Header';
import DashboardHome from '../components/Dashboard/DashboardHome';
import './Dashboard.css';

const Dashboard = () => {
  const [products, setProducts] = useState([]);

  // Function to handle deleting a product
  const handleDeleteProduct = (index) => {
    setProducts((prevProducts) => prevProducts.filter((_, idx) => idx !== index));
  };

  return (
    <div>
      <Header />
      <div className="add-product-container">
        <Sidebar />
      <div className="main-content">
        
        <DashboardHome products={products} onDelete={handleDeleteProduct} />
      </div>
    </div>
    </div>
  );
};

export default Dashboard;
