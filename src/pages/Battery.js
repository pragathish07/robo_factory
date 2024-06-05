// Battery.js

import React, { useState } from 'react';
import ProductCard from '../pages/ProductCard';
import './Battery.css';

const batteryProducts = [
  { 
    name: 'Battery 1', 
    price: 99, 
    image: 'https://via.placeholder.com/150', 
    rating: 4.0, 
    category: 'batteries' 
  },
  { 
    name: 'Battery 2', 
    price: 129, 
    image: 'https://via.placeholder.com/150', 
    rating: 4.5, 
    category: 'batteries' 
  },
  // Add more products as needed
];

const Battery = () => {
  const [sortingOption, setSortingOption] = useState('default');
  const [filteringOption, setFilteringOption] = useState('all');

  // Sorting logic
  const sortedProducts = [...batteryProducts].sort((a, b) => {
    switch (sortingOption) {
      case 'price-low-high':
        return a.price - b.price;
      case 'price-high-low':
        return b.price - a.price;
      case 'rating-high-low':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  // Filtering logic
  const filteredProducts = sortedProducts.filter(product => {
    if (filteringOption === 'all') {
      return true;
    } else {
      return product.category === filteringOption;
    }
  });

  return (
    <div className="battery">
      <h2>Battery</h2>
      <div className="options-container">
        <div className="sorting-options">
          <label htmlFor="sortSelect">Sort By:</label>
          <select id="sortSelect" onChange={(e) => setSortingOption(e.target.value)}>
            <option value="default">Default</option>
            <option value="price-low-high">Price: Low to High</option>
            <option value="price-high-low">Price: High to Low</option>
            <option value="rating-high-low">Rating: High to Low</option>
          </select>
        </div>
        <div className="filter-options">
          <label htmlFor="filterSelect">Filter By:</label>
          <select id="filterSelect" onChange={(e) => setFilteringOption(e.target.value)}>
            <option value="all">All</option>
            <option value="batteries">Batteries</option>
            {/* Add more filtering options as needed */}
          </select>
        </div>
      </div>
      <div className="product-list">
        {filteredProducts.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Battery;
