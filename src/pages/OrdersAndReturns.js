import React, { useContext, useEffect, useState } from 'react';
import './OrdersAndReturns.css';
import axios from 'axios';
import { UserContext } from '../context/UserContext';

const OrdersAndReturns = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [order, setOrder] = useState(null);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const getAllOrders = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:5000/api/users/${user._id}`);
        setOrder(res.data);
        console.log(res.data.orders)
      } catch (err) {
        setError('Error fetching orders');
        console.error('Error fetching orders:', err);
      } finally {
        setLoading(false);
      }
    };

    if (user && user._id) {
      getAllOrders();
    }
  }, [user]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!order) return <p>No orders found</p>;

  const { customer, orders } = order;

  return (
    <div className="orders-returns-container">
      <h2>Your Orders & Returns</h2>
      <ul className="orders-list">
        {orders.map(order => (
          <li key={order._id} className="order-item">
            <img src={`http://localhost:5000/${order.items[0].product.images[0]}`} alt={order.items[0].product.name} />
            <div className="order-details">
              <h3>{order.items[0].product.name}</h3>
              <p>Order Date: {new Date(order.createdAt).toLocaleDateString()}</p>
              <p>Status: {order.status}</p>
              <p>Return Status: {order.returnStatus || 'N/A'}</p>
              <p>Price: Rs.{order.totalAmount.toFixed(2)}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrdersAndReturns;
