import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaMapMarkerAlt, FaHeart, FaUser, FaCaretDown } from 'react-icons/fa';
import { useAuth } from '../pages/AuthContext'; // Import useAuth hook
import './Navbar.css';
import logo from './Robo Factory.png';
import { RxCaretDown } from "react-icons/rx";

const Navbar = () => {
  const { user } = useAuth(); // Get user information from AuthContext

  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
  const [isCategoriesDropdownOpen, setIsCategoriesDropdownOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState(null);

  const toggleLocationDropdown = () => {
    setIsLocationDropdownOpen(!isLocationDropdownOpen);
  };

  const toggleCategoriesDropdown = () => {
    setIsCategoriesDropdownOpen(!isCategoriesDropdownOpen);
  };

  const handleCitySelect = (city) => {
    setSelectedCity(city);
    setIsLocationDropdownOpen(false);
  };

  const cities = ["Chennai", "Bangalore", "Hyderabad", "Mumbai"]; // List of cities
  const categories = [
    { name: "Electronics", path: "/shop/electronics" },
    { name: "Radios", path: "/shop/radios" },
    { name: "Motor and Gearboxes", path: "/shop/motor-and-gearboxes" },
    { name: "Battery", path: "/shop/battery" },
    { name: "Charger and Accessories", path: "/shop/charger-accessories" },
    { name: "RoboKits", path: "/shop/robokits" },
    { name: "Tools", path: "/shop/tools" },
    { name: "Merchandise", path: "/shop/merchandise" },
    { name: "Wires, Cables and Connections", path: "/shop/wires-cables-connections" },
    { name: "Mechanical", path: "/shop/mechanical" }
  ];

  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
          <Link to="/" className="navbar-logo">
            <img src={logo} alt="Company Logo" />
            <span style={{ color: '#FFFFFF' }}>ROBOFACTORY</span>
          </Link>
          <div className="navbar-location" onClick={toggleLocationDropdown}>
            <FaMapMarkerAlt style={{ color: '#FFFFFF' }} />
            <span style={{ color: '#FFFFFF' }}>{selectedCity ? selectedCity : "Select your address"}</span>
            {isLocationDropdownOpen && (
              <ul className="city-dropdown">
                {cities.map(city => (
                  <li key={city} onClick={() => handleCitySelect(city)}>{city}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="navbar-center">
          <input type="text" placeholder="Search" style={{ backgroundColor: '#FFFFFF', color: '#232f3e' }} />
        </div>
        <div className="navbar-right">
          {user && ( // Check if user is logged in
            <div className="navbar-user">
              <span style={{ color: '#FFFFFF' }}>Hello, {user.displayName}</span> {/* Display user's display name */}
            </div>
          )}
          
          <div className="navbar-categories-dropdown" onClick={toggleCategoriesDropdown}>
            <span style={{ color: '#FFFFFF' }}>Categories</span>
            <RxCaretDown />
            {isCategoriesDropdownOpen && (
              <ul className="categories-dropdown">
                {categories.map(category => (
                  <li key={category.name}>
                    <Link to={category.path}>{category.name}</Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <Link to='/customerdashboard' className='navbar-link'><FaUser style={{ color: '#FFFFFF' }} /></Link>
          <Link to="/wishlist" className="navbar-link" style={{ color: '#FFFFFF' }}>
            <FaHeart style={{ color: '#FFFFFF' }} />
          </Link> {/* Wishlist link with heart icon */}
          <Link to="/cart" className="navbar-link" style={{ color: '#FFFFFF' }}>
            <FaShoppingCart style={{ color: '#FFFFFF' }} />
            <span>Cart</span>
          </Link>
          {!user && ( // Display login link if user is not logged in
            <Link to="/login" className="navbar-link" style={{ color: '#FFFFFF' }}>Login</Link>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
