// ReturnConfirmation.js

import React, { useState } from 'react';
import './returnConfirmation.css'; // Import your CSS file for styling

const ReturnConfirmation = () => {
  const [returnDetails, setReturnDetails] = useState({
    orderId: '',
    productName: '',
    reason: '',
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReturnDetails({ ...returnDetails, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can handle the return request submission logic
    console.log('Return Details:', returnDetails);
    // Reset form fields after submission (optional)
    setReturnDetails({
      orderId: '',
      productName: '',
      reason: '',
      description: ''
    });
  };

  return (
    <div className="return-confirmation">
      <div className="confirmation-container">
        <h2>Order Return Confirmation</h2>
        <p>Your return request has been successfully submitted.</p>
        <p>We will process your return and get back to you shortly.</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="orderId">Order ID:</label>
            <input
              type="text"
              id="orderId"
              name="orderId"
              value={returnDetails.orderId}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="productName">Product Name:</label>
            <input
              type="text"
              id="productName"
              name="productName"
              value={returnDetails.productName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="reason">Reason for Return:</label>
            <select
              id="reason"
              name="reason"
              value={returnDetails.reason}
              onChange={handleChange}
              required
            >
              <option value="">Select Reason</option>
              <option value="Damaged">Damaged</option>
              <option value="Wrong Item">Wrong Item</option>
              <option value="Not as Expected">Not as Expected</option>
              {/* Add more reasons as needed */}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              value={returnDetails.description}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="submit-return-btn">Submit Return Request</button>
        </form>
        <button className="return-home-btn">Return to Home</button>
      </div>
    </div>
  );
};

export default ReturnConfirmation;
