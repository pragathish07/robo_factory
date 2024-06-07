import React from 'react';
import { FaStar, FaRegStar, FaStarHalfAlt } from 'react-icons/fa';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  // Assuming product.image is the relative path of the image stored in the server
  
  const baseUrl = 'http://localhost:5000/';
  return (
    <div className="product-card">
      <img src={product.images && product.images.length > 0
    ? `${baseUrl}${product.images[0].replace('\\', '/')}`
    : 'https://via.placeholder.com/150'} alt={product.name} />
      <div className="product-info">
        <h3>{product.name}</h3>
        <p className="price">{product.basePrice}</p>
        <div className="buttons">
          <button className="add-to-cart-btn">Add to Cart</button>
          <button className="buy-now-btn">Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
