import React from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa'; // Import star icons
import './Wishlist.css';

const Wishlist = () => {
  const wishlistItems = [
    {
      id: 1,
      name: 'Arduino Uno',
      image: '/path-to-image/arduino-uno.jpg',
      link: '/product/arduino-uno',
      price: '$25.00',
      rating: 4.5
    },
    {
      id: 2,
      name: 'Raspberry Pi 4',
      image: '/path-to-image/raspberry-pi-4.jpg',
      link: '/product/raspberry-pi-4',
      price: '$35.00',
      rating: 4.7
    },
    // Add more items as needed
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

  return (
    <div className="wishlist-container">
      <h2>Your Wishlist</h2>
      <ul className="wishlist-items">
        {wishlistItems.map(item => (
          <li key={item.id} className="wishlist-item">
            <Link to={item.link}>
              <img src={item.image} alt={item.name} />
              <span className="wishlist-item-name">{item.name}</span>
            </Link>
            <span className="wishlist-item-price">{item.price}</span>
            <span className="wishlist-item-rating">
              {renderStars(item.rating)} ({item.rating})
            </span>
            <div className="wishlist-item-buttons">
              <button className="add-to-cart-btn">Add to Cart</button>
              <button className="buy-now-btn">Buy Now</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Wishlist;
