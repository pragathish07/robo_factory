import React, { useState } from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa'; // Import star icons
import './AddToCart.css';

const AddToCart = () => {
  const [quantity, setQuantity] = useState(1);

  const handleBuyNow = () => {
    // Handle buy now action
    alert(`Proceed to buy ${quantity} items`);
  };

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

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

  const product = {
    name: 'Product Name',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/HONDA_ASIMO.jpg/640px-HONDA_ASIMO.jpg',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    price: '$10.00',
    rating: 4.5
  };

  return (
    <div className="add-to-cart-container">
      <img src={product.image} alt="Product" className="product-image" />
      <div className="product-box">
        <div className="product-info">
          <div className="product-details">
            <h2>{product.name}</h2>
            <p>Description: {product.description}</p>
            <p>Price: {product.price}</p>
            <div className="product-rating">
              {renderStars(product.rating)} ({product.rating})
            </div>
            <div className="quantity-control">
              <button onClick={decrementQuantity}>-</button>
              <span>{quantity}</span>
              <button onClick={incrementQuantity}>+</button>
            </div>
            <button onClick={handleBuyNow} className="buy-now-btn">Buy Now</button>
          </div>
        </div>
      </div>
      <div className="bill">
        <h3>Order Summary</h3>
        <div className="bill-items">
          <div className="bill-item">
            <span>{product.name}</span>
            <span>{product.price}</span>
          </div>
          {/* Add more bill items as needed */}
        </div>
        <div className="total">
          <span>Total:</span>
          <span>{product.price}</span>
        </div>
      </div>
    </div>
  );
};

export default AddToCart;
