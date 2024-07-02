import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import axios from 'axios';
import './CustomerDashboard.css';

const CustomerDashboard = () => {
  const [customerData, setCustomerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/users/${user._id}`);
        setCustomerData(response.data);
      } catch (err) {
        console.error('Error fetching customer data:', err);
        setError('Error fetching customer data');
      } finally {
        setLoading(false);
      }
    };

    if (user && user._id) {
      fetchCustomerData();
    }
  }, [user]);

  const handleViewAllClick = () => {
    navigate('/pages/orders');
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!customerData) return <div>No customer data found</div>;

  const { customer, orders } = customerData;

  return (
    <div className="customer-dashboard">
      <div className="customer-info-box">
        <div className="customer-info">
          {/* <img src={customer.photo} alt="Customer" className="customer-photo" /> */}
          <div className="customer-details">
            <h2>{customer.name}</h2>
           {/*  <div className="customer-details-box">
              <p><strong>Phone:</strong> {customer.phone}</p>
            </div> */}
            <div className="customer-details-box">
              <p><strong>Email:</strong> {customer.email}</p>
            </div>
{/*             <div className="customer-details-box">
              <p><strong>Pincode:</strong> {customer.pincode}</p>
            </div>
            <div className="customer-details-box">
              <p><strong>Address:</strong> {customer.address}</p>
            </div> */}
          </div>
        </div>
      </div>
      <div className="previous-orders-box">
        <h2>Previous Orders</h2>
        <div className="previous-orders">
          {orders.map(order => (
            <div key={order._id} className="order-card">
              <h3>Order ID: {order._id}</h3>
              <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
              <p><strong>Total:</strong> Rs.{order.totalAmount}</p>
              <h4>Items:</h4>
              <ul>
                {order.items.length > 0 && order.items.map((item, index) => (
                  <li key={index}>{item.product.name} - {item.quantity} x Rs.{item.product.price}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="view-all-button">
          <button onClick={handleViewAllClick}>View All</button>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
