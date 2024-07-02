import React, { useContext, useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaMapMarkerAlt, FaHeart, FaUser, FaCaretDown } from 'react-icons/fa';
import './Navbar.css';
import logo from './Robo Factory.png';
import { RxCaretDown } from "react-icons/rx";
import { useAuth } from '../context/AuthContext';
import { UserContext } from '../context/UserContext';

const Navbar = () => {
  const { isAuthenticated, logout, userRole } = useAuth();
  const { user } = useContext(UserContext);

  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
  const [isCategoriesDropdownOpen, setIsCategoriesDropdownOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState(null);

  const locationDropdownRef = useRef(null);
  const categoriesDropdownRef = useRef(null);

 

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        locationDropdownRef.current &&
        !locationDropdownRef.current.contains(event.target) &&
        !event.target.classList.contains('navbar-location')
      ) {
        setIsLocationDropdownOpen(false);
      }

      if (
        categoriesDropdownRef.current &&
        !categoriesDropdownRef.current.contains(event.target) &&
        !event.target.classList.contains('navbar-categories-dropdown')
      ) {
        setIsCategoriesDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
    { name: "Motors", path: "/shop/motors" },
    
  ];

  const roles = ["admin", "superadmin"];

  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
          <Link to="/" className="navbar-logo">
            <img src={logo} alt="Company Logo" />
            <span><b>RoboFactory</b></span>
          </Link>
          <div className="navbar-location" onClick={toggleLocationDropdown} ref={locationDropdownRef}>
            <FaMapMarkerAlt />
            <span>{selectedCity ? selectedCity : "Select your address"}</span>
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
          <input type="text" placeholder="Search" />
        </div>
        <div className="navbar-right">
          <div className="navbar-categories-dropdown" onClick={toggleCategoriesDropdown} ref={categoriesDropdownRef}>
            <span>Categories</span>
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
          <Link to='/customerdashboard' className='navbar-link'><FaUser /></Link>
          <Link to="/cart" className="navbar-link">
            <FaShoppingCart />
            <span>Cart</span>
          </Link>
          {isAuthenticated ? (<a className="navbar-link" style={{ cursor: "pointer" }} onClick={logout}>Logout</a>) : (<Link className='navbar-link' to="/login">Login</Link>)}
          {roles.includes(userRole) && (
            <Link to="/dashboard" className='navbar-link'>Dashboard</Link>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
