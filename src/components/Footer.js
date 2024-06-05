import React from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-column">
          <h3>Get to Know Us</h3>
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact Us</Link>
          <Link to="/customer-support">Customer Support</Link>


        </div>
        <div className="footer-column">
          <h3>Connect with Us</h3>
          <Link to="https://www.facebook.com/"><FaFacebook /> Facebook</Link>
          <Link to="https://www.instagram.com/"><FaInstagram /> Instagram</Link>
          <Link to="https://www.linkedin.com/"><FaLinkedin /> LinkedIn</Link>
          <Link to="https://www.twitter.com/"><FaTwitter /> Twitter</Link>
        </div>
        <div className="footer-column">
          <h3>Contact Info</h3>
          <Link to="tel:+917200061904"><FaPhone /> +91 72000 61904</Link>
          <Link to="mailto:info@ROBOFACTORY.com"><FaEnvelope /> info@ROBOFACTORY.com</Link>
          <div className="footer-address">
            <FaMapMarkerAlt />
            <div>
              Second Floor, Platinum Jubilee building, AC Tech Campus,
              <br />
              Anna University, Guindy, Chennai, Tamil Nadu 600025
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="footer-credit">
          &copy; 2024 ROBOFACTORY. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
