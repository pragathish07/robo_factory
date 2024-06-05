import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Features.css';

const features = [
  {
    title: 'Fast Delivery',
    description: 'Get your products delivered in no time with our fast and reliable delivery service.',
    icon: '🚚', 
  },
  {
    title: 'Quality Products',
    description: 'We offer only the best quality products that meet our high standards.',
    icon: '⭐', 
  },
  {
    title: 'Secured Payment Options',
    description: 'Your transactions are safe with our secured payment gateways.',
    icon: '🔒', 
  },
  {
    title: 'Wide Range of Products',
    description: 'Explore a vast selection of products from various categories to meet your needs.',
    icon: '🛍️', 
  },
];

const Features = () => {
  const navigate = useNavigate();

  const handleViewAllClick = () => {
    navigate('/pages/OrdersAndReturn');
  };

  return (
    <div className="features">
      <h2>WHY SHOP WITH US?</h2>
      <div className="feature-list">
        {features.map((feature, index) => (
          <div key={index} className="feature-card">
            <div className="feature-icon">{feature.icon}</div>
            <h3 className="feature-title">{feature.title}</h3>
            <p className="feature-description">{feature.description}</p>
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default Features;
