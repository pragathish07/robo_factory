import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import './TopPicks.css';

const topPicks = [
  { name: 'SmartPhone', path: '/shop/electronics', image: 'https://m.media-amazon.com/images/I/314Rp+8XKWL._AC_SR300,300.jpg', price: '$10.99', rating: 4 },
  { name: 'Product 2', path: '/product-2', image: 'https://via.placeholder.com/300', price: '$15.99', rating: 3.5 },
  { name: 'Product 3', path: '/product-3', image: 'https://via.placeholder.com/300', price: '$19.99', rating: 4.5 },
  // Add more featured products as needed
];

const renderStars = (rating) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <>
      {[...Array(fullStars)].map((_, index) => (
        <FaStar key={`full-${index}`} className="star" />
      ))}
      {halfStar && <FaStarHalfAlt className="star" />}
      {[...Array(emptyStars)].map((_, index) => (
        <FaRegStar key={`empty-${index}`} className="star" />
      ))}
    </>
  );
};

const TopPicks = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? topPicks.length - 1 : prevIndex - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === topPicks.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="top-picks">
      <h2>OUR TOP PICKS</h2>
      <div className="products-container">
        <button className="prev" onClick={goToPrevious}>&#10094;</button>
        <div className="products">
          {topPicks.map((product, index) => (
            <div key={index} className={`product-card ${index === currentIndex ? 'active' : ''}`}>
              <Link to={product.path}>
                <img src={product.image} alt={product.name} />
                <div className="product-info">
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-price">{product.price}</p>
                  <div className="product-rating">
                    {renderStars(product.rating)}
                  </div>
                </div>
              </Link>
              <div className="buttons">
                <button className="add-to-cart-btn">Add to Cart</button>
                <button className="buy-now-btn">Buy Now</button>
              </div>
            </div>
          ))}
        </div>
        <button className="next" onClick={goToNext}>&#10095;</button>
      </div>
    </div>
  );
};

export default TopPicks;
