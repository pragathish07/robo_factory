// Sidebar.js
import React, { useContext, useState } from 'react';
import { FaHome, FaStore,FaCog , FaMoneyBillWave, FaHeadset, FaFileAlt, FaUser, FaUpload } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom'; 
import './Sidebar.css';
import { UserContext } from '../../context/UserContext';

const Sidebar = () => {
  const [ setShowAddProduct] = useState(false);
  const navigate = useNavigate(); 
  const { user } = useContext(UserContext);
  

  const handleUploadClick = () => {
    
    setShowAddProduct(true);
  };

  
  const navigateToAddProduct = () => {
    navigate('/add-product');
  };

  return (
    <div className="sidebar">
      <ul className="sidebar-menu">
        <li>
        
        <Link to="/dashboard">
        <FaHome />
          <span>Overview</span>
          </Link>
        </li>
        <li>
          
          <Link to="/add-product">
          <FaCog/>
          <span>Add Product</span>
          </Link>
        </li>
        <li>
          <Link to="/product-categories">
          <FaStore />
          <span>Categories</span>
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

       {user && user.role == "superadmin" ? <li>
          <Link to="/admin/add-admin"> {/* Use Link to navigate to '/orders' */}
            <FaMoneyBillWave />
            <span>Add Admin</span>
          </Link>
        </li> : null}
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