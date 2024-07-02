import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import axios from 'axios';
import './TopPicks.css';


const TopPicks = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/random');
        if (response.data.success) {
          setDisplayedProducts(response.data.products);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? displayedProducts.length - 1 : prevIndex - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === displayedProducts.length - 1 ? 0 : prevIndex + 1));
  };

  const handleAddToCart = (product, quantity) => {
    console.log('Added to cart:', product, 'Quantity:', quantity);
  };

  const handleBuyNow = (product) => {
    console.log('Buy now:', product);
  };

  const handleQuantityChange = (e) => {
    setQuantity(Number(e.target.value));
  };

  return (
    <div className="top-picks">
      <h2 className="section-title">OUR TOP PICKS</h2>
      <div className="products-container">
        <button className="nav-button prev" onClick={goToPrevious}>&#10094;</button>
        <div className="products">
          {displayedProducts.map((product, index) => (
            <div key={product._id} className={`product-card ${index === currentIndex ? 'active' : ''}`}>
              <Link to={product.path} className="product-link">
                <div className="product-image">
                  <img src={`http://localhost:5000/${product.images[0]}`} alt={product.name} />
                </div>
                <div className="product-details">
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-price">{product.price}</p>
                  
                  <div className="quantity-input">
                    <label htmlFor="quantity">Quantity: </label>
                    <input
                      type="number"
                      id="quantity"
                      min="1"
                      value={quantity}
                      onChange={handleQuantityChange}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                </div>
              </Link>
              <div className="product-actions">
                <button className="add-to-cart-btn" onClick={() => handleAddToCart(product, quantity)}>Add to Cart</button>
                <button className="buy-now-btn" onClick={() => handleBuyNow(product)}>Buy Now</button>
              </div>
            </div>
          ))}
        </div>
        <button className="nav-button next" onClick={goToNext}>&#10095;</button>
      </div>
    </div>
  );
};

export default TopPicks;
