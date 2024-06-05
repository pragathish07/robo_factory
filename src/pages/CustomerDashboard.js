import React from 'react';
import './CustomerDashboard.css';
import { useNavigate } from 'react-router-dom';

const customerData = {
  photo: 'https://via.placeholder.com/150',
  name: 'John Doe',
  phone: '123-456-7890',
  email: 'john.doe@example.com',
  pincode: '123456',
  address: '123 Main St, Anytown, USA',
  previousOrders: [
    {
      id: '123',
      date: '2023-01-01',
      total: '$100',
      items: [
        { name: 'Product 1', quantity: 1, price: '$50' },
        { name: 'Product 2', quantity: 1, price: '$50' },
      ],
    },
    {
      id: '124',
      date: '2023-02-01',
      total: '$200',
      items: [
        { name: 'Product 3', quantity: 2, price: '$100' },
      ],
    },
  ],
};

const CustomerDashboard = () => {
  const navigate = useNavigate();

  const handleViewAllClick = () => {
    navigate('/pages/orders');
  };

  return (
    <div className="customer-dashboard">
      <div className="customer-info-box">
        <div className="customer-info">
          <img src={customerData.photo} alt="Customer" className="customer-photo" />
          <div className="customer-details">
            <h2>{customerData.name}</h2>
            <div className="customer-details-box">
              <p><strong>Phone:</strong> {customerData.phone}</p>
            </div>
            <div className="customer-details-box">
              <p><strong>Email:</strong> {customerData.email}</p>
            </div>
            <div className="customer-details-box">
              <p><strong>Pincode:</strong> {customerData.pincode}</p>
            </div>
            <div className="customer-details-box">
              <p><strong>Address:</strong> {customerData.address}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="previous-orders-box">
        <h2>Previous Orders</h2>
        <div className="previous-orders">
          {customerData.previousOrders.map(order => (
            <div key={order.id} className="order-card">
              <h3>Order ID: {order.id}</h3>
              <p><strong>Date:</strong> {order.date}</p>
              <p><strong>Total:</strong> {order.total}</p>
              <h4>Items:</h4>
              <ul>
                {order.items.map((item, index) => (
                  <li key={index}>{item.name} - {item.quantity} x {item.price}</li>
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
