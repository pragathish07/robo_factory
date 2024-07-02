// Orders.js
import React from 'react';
import Sidebar from '../Dashboard/Sidebar';
import OrderSummary from './OrderSummary';
import './Orders.css';

const Orders = () => {
  return (
    <div>
      <div className="add-product-container">
        <Sidebar />
      <div className="main-content">
          <OrderSummary />
        </div>
      </div>
    </div>
  );
};

export default Orders;
