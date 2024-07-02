// context/CartContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { UserContext } from './UserContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [] });
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      fetchCart();
    }
  }, [user]);

  const fetchCart = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/cart/${user._id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setCart(response.data.cart);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const addToCart = async (productId, quantity) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/cart/${user._id}`,
        { productId, quantity },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setCart(response.data.cart);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const updateCartItemQuantity = async (productId, quantity) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/cart/${user._id}`,
        { productId, quantity },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setCart(response.data.cart);
    } catch (error) {
      console.error('Error updating cart item quantity:', error);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/cart/${user._id}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
          data: { productId },
        }
      );
      setCart(response.data.cart);
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const checkout = async (userId, items, address) => {
    try {
      const response = await axios.post('http://localhost:5000/api/checkout', { userId, items, address }); // Adjust URL
      const data = response.data;
      // Handle successful checkout (navigate to order confirmation page, etc.)
      console.log('Order placed successfully:', data);
    } catch (error) {
      console.error('Error during checkout:', error);
      // Handle error (display error message, retry logic, etc.)
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, updateCartItemQuantity, removeFromCart, fetchCart , checkout }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
