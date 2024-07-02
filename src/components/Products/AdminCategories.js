import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../Dashboard/Sidebar';
import './AdminCategories.css';
import MotorsImage from './motors.jpg'; // Add image path
import ControllersImage from './electronics.jpg'; // Add image path
import RadioImage from './radio.jpg'; // Add image path

const categories = [
  { name: 'Motors', image: MotorsImage },
  { name: 'ESC/Controller', image: ControllersImage },
  { name: 'Radio', image: RadioImage },
];


const CategoriesPage = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryName) => {
    const url = categoryName.replace('/' , '-')
    navigate(`/products/${url}`);
  };

  return (
    <div className="categories-page-container">
      <Sidebar />
      <div className="categories-page-content">
        <div className="categories-list">
          {categories.map((category, index) => (
            <div
              key={index}
              className="category-card"
              onClick={() => handleCategoryClick(category.name)}
              style={{ backgroundImage: `url(${category.image})`}}
            >
              <div className="category-name">{category.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;