import React from 'react';
import './OrdersAndReturns.css';

const OrdersAndReturns = () => {
  const orders = [
    {
      id: 1,
      productName: 'Arduino Uno',
      orderDate: '2023-05-20',
      status: 'Delivered',
      returnStatus: 'No Returns',
      image: '/path-to-image/arduino-uno.jpg',
      price: '$25.00'
    },
    {
      id: 2,
      productName: 'Raspberry Pi 4',
      orderDate: '2023-06-15',
      status: 'Pending',
      returnStatus: 'Return Requested',
      image: '/path-to-image/raspberry-pi-4.jpg',
      price: '$35.00'
    },
    // Add more orders as needed
  ];

  return (
    <div className="orders-returns-container">
      <h2>Your Orders & Returns</h2>
      <ul className="orders-list">
        {orders.map(order => (
          <li key={order.id} className="order-item">
            <img src={order.image} alt={order.productName} />
            <div className="order-details">
              <h3>{order.productName}</h3>
              <p>Order Date: {order.orderDate}</p>
              <p>Status: {order.status}</p>
              <p>Return Status: {order.returnStatus}</p>
              <p>Price: {order.price}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrdersAndReturns;
