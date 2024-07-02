import React from 'react';
import './Footer.css'; // Make sure to create a CSS file for styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube, faInstagram, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';

import { faPhoneAlt, faEnvelope, faMapMarker } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  return (
    <footer className="footer">
      
      <div className="footer-main">
        <div className="footer-section">
          <h4>ROBOFACTORY</h4>
          <div className="footer-social">
        <a href="#"><FontAwesomeIcon icon={faYoutube} /></a>
        <a href="#"><FontAwesomeIcon icon={faInstagram} /></a>
        <a href="#"><FontAwesomeIcon icon={faLinkedin} /></a>
        <a href="#"><FontAwesomeIcon icon={faTwitter} /></a>
      </div>
        </div>
        <div className="footer-section">
          <h4>Company</h4>
          <ul>
            <li><a href="/about">About</a></li>
            {/* <li><a href="#">Features</a></li>
            <li><a href="#">Works</a></li> */}
            <li><a href="/contact">Contact Us</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Help</h4>
          <ul>
            <li><a href="/customer-support">Customer Support</a></li>
            {/* <li><a href="#">Delivery Details</a></li> */}
            <li><a href="/terms-of-service">Terms of Service</a></li>
            <li><a href="/privacy-policy">Privacy Policy</a></li>
            <li><a href="/returns-and-refunds">Returns & Refunds</a></li>

          </ul>
        </div>
    
        <div className="footer-section">
          <h4>Contact Info</h4>
          <ul>
          <li><a href="#"><FontAwesomeIcon icon={faPhoneAlt} /> +91 72000 61904</a></li>
          <li><a href="#"><FontAwesomeIcon icon={faEnvelope} /> info@robofactory.com</a></li>
          <li>
            <a href="#"><FontAwesomeIcon icon={faMapMarker} /> Binary Autobots Private Limited,
              <br />
              10-5-111, Gandhi Bazaar, Surandai, Tirunelveli-627859
            </a>
          </li>
        </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>All Rights Reserved @RoboFactory</p>
      </div>
    </footer>
  );
}

export default Footer;
