import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaStar } from 'react-icons/fa';
import { UserContext } from '../context/UserContext';
import { useCart } from '../context/CartContext';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [userCanReview, setUserCanReview] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');
  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useCart();

  useEffect(() => {
    fetchProductDetails();
    if (user) {
      checkUserPurchase();
    }
  }, [id, user]);

  const fetchProductDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/products/${id}`);
      setProduct(response.data.product);
      setReviews(response.data.product.reviews);
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };

  const checkUserPurchase = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/products/${user._id}/purchases`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const purchasedProducts = response.data.purchasedProducts;
      const hasPurchased = purchasedProducts.some(p => p._id === id);
      setUserCanReview(hasPurchased);
    } catch (error) {
      console.error('Error checking user purchase:', error);
    }
  };

  const handleAddReview = async () => {
    if (!rating || !comment) {
      setError('Please provide a rating and a comment.');
      return;
    }
    try {
      const newReview = { user: user._id, rating, comment };
      const response = await axios.post(`http://localhost:5000/api/products/${id}/reviews`, newReview, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setReviews([...reviews, response.data.review]);
      setRating(0);
      setComment('');
      setError('');
    } catch (error) {
      setError('Error adding review');
      console.error('Error adding review:', error);
    }
  };

  const handleAddToCart = async () => {
    if (!user || !user._id) {
      setError('Please log in to add items to your cart.');
      return;
    }
    try {
      await addToCart(product._id, quantity);
      alert('Item added to cart');
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const handleBuyNow = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/buy', {
        productId: product._id,
        quantity: 1,
        userId: user._id,
        totalAmount: product.basePrice, 
        address: 'chennai', // Replace with actual address
      });

      const data = response.data;
      navigate('/order-confirmation', { state: { order: data.order } });
    } catch (error) {
      console.error('Error making purchase:', error);
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-detail">
      <div className="product-detail-top">
        <div className="product-carousel">
          <Carousel showThumbs={true} infiniteLoop={true} showArrows={true}>
            {product.images.map((image, index) => (
              <div key={index}>
                <img src={`http://localhost:5000/${image}`} alt={`${product.name} ${index + 1}`} />
              </div>
            ))}
          </Carousel>
        </div>
        <div className="product-info">
          <h1>{product.name}</h1>
          <p>Price: ₹{product.basePrice}</p>
          <div>
            <label>Quantity:</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              min="1"
            />
          </div>
          <div className="button-container">
            <button onClick={handleAddToCart}>Add to Cart</button>
            <button onClick={handleBuyNow}>Buy Now</button>
          </div>
          {userCanReview && (
            <div className="add-review">
              <h3>Add a Review</h3>
              <div className="star-rating">
                {[...Array(5)].map((_, index) => (
                  <FaStar
                    key={index}
                    className={`star ${index < rating ? 'active' : ''}`}
                    onClick={() => setRating(index + 1)}
                  />
                ))}
              </div>
              <textarea
                placeholder="Write your review here..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <button onClick={handleAddReview}>Submit Review</button>
              {error && <p className="error">{error}</p>}
            </div>
          )}
        </div>
      </div>
      <div className="description">
        <h2>Description</h2>
        <p>{product.description}</p>
      </div>
      <div className="description">
        <h2>Features</h2>
        <p>{product.features}</p>
      </div>
      <div className="reviews">
        <h2>Reviews</h2>
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <div key={index} className="review">
              <p>
                <strong>{review.user}</strong> - {review.rating} <FaStar className="star active" />
              </p>
              <p>{review.comment}</p>
            </div>
          ))
        ) : (
          <p>No reviews yet.</p>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
