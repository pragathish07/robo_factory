import React from 'react';
import './About.css';
import logo from '../components/Robo Factory.png';


const AboutUs = () => {
  return (
    <div className="about-us">
      <div className="about-us-content">
        <div className="image-container">
        <img src={logo} alt="Our logo" />
          
        </div>
        <div className="story-container">
          <h2>OUR STORY</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus imperdiet, nulla et dictum interdum, nisi lorem egestas odio, vitae scelerisque enim ligula venenatis dolor. Maecenas nisl est, ultrices nec congue eget, auctor vitae massa.
          </p>
        </div>
      </div>
      <div className="vision-mission">
        <div className="box">
          <h3 align='center'>OUR VISION</h3>
          <p>
            To be the leading company in our industry, providing exceptional value to our customers and making a positive impact in the world.
          </p>
        </div>
        <div className="box">
          <h3 align='center'>OUR MISSION</h3>
          <p>
            To deliver high-quality products and services that exceed our customers' expectations and contribute to their success.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
