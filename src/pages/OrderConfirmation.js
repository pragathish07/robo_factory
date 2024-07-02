// OrderConfirmation.js
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const OrderConfirmation = () => {
  const location = useLocation();
  const { order } = location.state || {};
  const Navigate = useNavigate();

  if (!order) {
    return <p>No order found.</p>;
  }

  const handleCancel = async () => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/orders/${order._id}`);
      if (response.data.success) {
        // Handle cancellation success
        alert('Order cancelled successfully.');
        Navigate('/cart')
        // Redirect to admin dashboard or update admin dashboard state
        // Example: history.push('/admin-dashboard');
      } else {
        alert('Failed to cancel order.');
      }
    } catch (error) {
      console.error('Error cancelling order:', error);
      alert('Error cancelling order.');
    }
  };


  return (
    <div>
      <h2>Order Confirmation</h2>
      <p>Order ID: {order._id}</p>
      <p>Total Amount: Rs.{order.totalAmount}</p>
      <p>Status: {order.status}</p>
      <p>Tracking: {order.tracking}</p>
      <Link to="/return">Return Product</Link>
      <button className='btn' onClick={handleCancel}>Cancel Order</button>
    </div>
  );
};

export default OrderConfirmation;
