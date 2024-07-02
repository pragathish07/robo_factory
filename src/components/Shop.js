import React from 'react';
import { Link } from 'react-router-dom';
import './Shop.css';
import Battery from './radio.jpg';
import Motors from './motors.jpg';
import Electronics from './electronics.jpg';

const categories = [
  { name: 'ESC/Controller', path: '/shop/electronics', image: Electronics },
  { name: 'Radios', path: '/shop/radios', image: Battery },
  { name: 'Motors', path: '/shop/motors', image: Motors },
  
];

const Shop = () => {
  return (
    <div className="shop">
      <h1>SHOP BY CATEGORIES</h1>
      <div className="categories">
        {categories.map((category, index) => (
          <Link to={category.path} key={index} className="category-card">
            <div
              className="card-content"
              style={{ backgroundImage: `url(${category.image})` }}
            >
              <h2>{category.name}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Shop;
