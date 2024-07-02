import React, { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import Loader from 'react-js-loader';
import './Cart.css';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const Cart = () => {
  const { cart, updateCartItemQuantity, removeFromCart, fetchCart } = useCart();
  const { user } = useUser()
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const address = "chennai"

  useEffect(() => {
    const loadCart = async () => {
      setLoading(true);
      try {
        

        await fetchCart();
      } finally {
        setLoading(false);
      }
    };

    loadCart();
  }, []);

  const handleQuantityChange = async (productId, quantity) => {
    setLoading(true);
    try {
      await updateCartItemQuantity(productId, quantity);
      await fetchCart(); // Fetch the updated cart
    } catch (error) {
      console.error('Failed to update item quantity. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFromCart = async (productId) => {
    setLoading(true);
    try {
      await removeFromCart(productId);
      await fetchCart(); // Fetch the updated cart
    } catch (error) {
      console.error('Failed to remove item from cart. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleBuyNow = async (productPrice, productId) => {
    try {
      const response = await axios.post('http://localhost:5000/api/buy', {
        productId: productId,
        quantity: 1,
        userId: user._id,
        totalAmount: productPrice,
        address: 'chennai', // Replace with actual address
      });

      const data = response.data;
      navigate('/order-confirmation', { state: { order: data.order } });
    } catch (error) {
      console.error('Error making purchase:', error);
    }
  };


  const handleCheckout = async () => {
    setLoading(true);
    try {
      const userId = user._id; // Replace with actual user ID from authentication
      const response = await axios.post('http://localhost:5000/api/checkout', {
        userId,
        items: cart.items,
        address,
      });

      const data = response.data;
      // Assuming the response contains the order details
      const order = data.order;

      // Navigate to order confirmation page with state
      navigate('/order-confirmation', { state: { order } });
    } catch (error) {
      console.error('Error during checkout:', error);
      // Handle error states here
    } finally {
      setLoading(false);
    }
  };

 

  return (
    <div className="cart-wrapper">
      <div className="cart-container">
        <h2>Shopping Cart</h2>
        {loading ? (
          <Loader type="box-rectangular" bgColor={"grey"} color={"grey"} title={"Please wait"} size={100} />
        ) : (
          <>
            {cart.items && cart.items.length > 0 ? (
              cart.items.map((item, index) => (
                <div key={index} className="cart-item">
                  {item.product.images?.length ? (
                    <img src={`http://localhost:5000/${item.product.images[0]}`} alt={item.product.name} />
                  ) : (
                    <img src='https://placehold.co/600x400' alt='Placeholder' />
                  )}
                  <div className="cart-item-details">
                    <p className="cart-item-name">{item.product.name}</p>
                    <div className="cart-item-quantity" style={{ margin: '30px' }}>
                      <label>Quantity:</label>
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item.product._id, parseInt(e.target.value))}
                        min="1"
                      />
                    </div>
                    <p className="cart-item-price">Price: ₹{item.product.basePrice}</p>
                    <button onClick={() => handleBuyNow(item.product.basePrice, item.product._id)}>Buy Now</button>
                    <button onClick={() => handleRemoveFromCart(item.product._id)} style={{ margin: '10px' }}>Remove</button>
                  </div>
                </div>
              ))
            ) : (
              <p>Your cart is empty.</p>
            )}
            {cart.items && cart.items.length > 0 && (
              <div className="cart-summary">
                <h3>Cart Summary</h3>
                <div className="cart-summary-items">
                  {cart.items.map((item, index) => (
                    <div key={index} className="cart-summary-item">
                      <p className="cart-summary-name">{item.product.name}</p>
                      <p className="cart-summary-quantity">{item.quantity || 1}</p>
                      <p className="cart-summary-price">₹{(item.product.basePrice * (item.quantity || 1)).toFixed(2)}</p><br />
                    </div>
                  ))}
                </div>
                <div className="cart-total" style={{ margin: '30px 10px 10px 20px' }}>
                  Total: ₹{cart.items.reduce((total, item) => total + item.product.basePrice * item.quantity, 0).toFixed(2)}
                </div>
                <button className="checkout-btn" onClick={handleCheckout} style={{ float:'right',marginTop:'5px' }}>Checkout Now!</button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
