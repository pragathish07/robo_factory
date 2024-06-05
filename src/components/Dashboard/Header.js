import React from 'react';
import './Header.css'; // Import CSS file for styling
import { FaSearch } from 'react-icons/fa';
import companyLogo from './imrobo.png'; // Import the image file

const Header = () => {
  return (
    <div className="header">
      <div className="left-section">
      <img src={companyLogo} alt="Company Logo" className="company-logo" style={{ width: '70px', height: '50px',marginRight: '10px' }} />
        <h1 className="dashboard-name">  RoboFactory</h1>
      </div>
      <div className="right-section">
        <div className="search-bar">
          <input type="text" placeholder="Search..." />
          <FaSearch />
        </div>
      </div>
    </div>
  );
}

export default Header;
