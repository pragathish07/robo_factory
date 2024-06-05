// Sidebar.js
import React, { useState } from 'react';
import { FaHome, FaStore,FaCog , FaMoneyBillWave, FaHeadset, FaFileAlt, FaUser, FaUpload } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate
import './Sidebar.css';
//import AddProduct from '../Products/AddProduct';


const Sidebar = () => {
  const [ setShowAddProduct] = useState(false);
  const navigate = useNavigate(); // Initialize navigate function

  const handleUploadClick = () => {
    // Set showAddProduct to true to conditionally render AddProduct
    setShowAddProduct(true);
  };

  // Function to navigate to AddProduct page
  const navigateToAddProduct = () => {
    // Use navigate function to navigate to '/add-product' route
    navigate('/add-product');
  };

  return (
    <div className="sidebar">
      <ul className="sidebar-menu">
        <li>
        <Link to="/">
          <FaHome />
          <span>Overview</span>
          </Link>
        </li>
        <li>
          <FaCog/>
          <Link to="/add-product">
          <span>Add Product</span>
          </Link>
        </li>
        <li>
          <Link to="/product-list">
          <FaStore />
          <span>My Store</span>
          </Link>
        </li>
        <li>
          <Link to="/orders"> {/* Use Link to navigate to '/orders' */}
            <FaMoneyBillWave />
            <span>Orders</span>
          </Link>
        </li>
        <li>
          <FaHeadset />
          <span>Support</span>
        </li>
        <li>
          <FaFileAlt />
          <span>Policy Compliance</span>
        </li>
        <li>
          <FaUser />
          <span>Profile</span>
        </li>
      </ul>
      <div className="sidebar-upload">
        <FaUpload />
        <span>Upload Your Product</span>
        {/* Use Link component to navigate to '/add-product' route */}
        <Link to="/add-product">
          <button>Upload</button>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
