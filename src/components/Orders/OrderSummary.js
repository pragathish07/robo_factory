// OrderSummary.js
import React from 'react';
import './OrderSummary.css';
import { FaEllipsisV, FaDownload, FaEdit, FaTrash } from 'react-icons/fa';

const orders = [
  { id: 675902, date: '17 May, 2024', items: 10, price: 376.00, paid: 'Yes', address: 'Anna nagar', status: 'Complete', tracking: 'Pending' },
  { id: 675909, date: '1 May, 2024', items: 22, price: 210.00, paid: 'No', address: 'trichy', status: 'Pending', tracking: 'Deliverd' },
  { id: 675912, date: '2 May, 2024', items: 12, price: 320.00, paid: 'No', address: 'Pondy', status: 'Cancelled', tracking: 'Deliverd'},
  { id: 675588, date: '17 May, 2024', items: 10, price: 510.00, paid: 'Yes', address: 'Tambaram', status: 'Complete', tracking: 'Deliverd' },
  { id: 675978, date: '23 May, 2024', items: 22, price: 120.00, paid: 'Yes', address: 'Kolathur', status: 'Complete', tracking: 'Deliverd' },
  { id: 675979, date: '12 May, 2024', items: 13, price: 420.00, paid: 'Yes', address: 'T nagar', status: 'Pending', tracking: 'Out for delivery' },
  { id: 675925, date: '22 May, 2024', items: 12, price: 120.00, paid: 'No', address: 'besant nagar', status: 'Pending', tracking: 'Out for delivery' },
  { id: 675125, date: '21 May, 2024', items: 15, price: 140.00, paid: 'Yes', address: 'ooty', status: 'Complete', tracking: 'Deliverd' },
  { id: 675789, date: '22 May, 2024', items: 16, price: 152.00, paid: 'Yes', address: 'Delhi', status: 'Complete', tracking: 'Deliverd' },
  { id: 675369, date: '24 May, 2024', items: 17, price: 421.00, paid: 'Yes', address: 'Mumbai', status: 'Cancelled', tracking: 'Deliverd' }
];

const OrderSummary = () => {
  const handleActionClick = (action, orderId) => {
    console.log(`${action} clicked for order ${orderId}`);
  };

  return (
    <div className="order-summary">
      <h2>Order Summary</h2>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Order ID</th>
            <th>Date</th>
            <th>Items</th>
            <th>Price</th>
            <th>Paid</th>
            <th>Address</th>
            <th>Status</th>
            <th>Tracking</th> {/* New Column Header */}
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={order.id}>
              <td>{index + 1}</td>
              <td>{order.id}</td>
              <td>{order.date}</td>
              <td>{order.items}</td>
              <td>Rs.{order.price.toFixed(2)}</td>
              <td>{order.paid === 'Yes' ? <span className="paid-yes">Yes</span> : <span className="paid-no">No</span>}</td>
              <td>{order.address}</td>
              <td className={`status-${order.status.toLowerCase()}`}>{order.status}</td>
              <td>{order.tracking}</td> {/* New Column Data */}
              <td>
                <div className="action-menu">
                  <FaEllipsisV />
                  <div className="action-menu-content">
                    <div onClick={() => handleActionClick('Download', order.id)}><FaDownload /> Completed</div>
                    <div onClick={() => handleActionClick('Edit', order.id)}><FaEdit /> Pending</div>
                    <div onClick={() => handleActionClick('Delete', order.id)}><FaTrash />Cancelled</div>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <span>Showing 1 to 10 of 20 entries</span>
        <div>
          <button>Back</button>
          <button>1</button>
          <button>2</button>
          <button>3</button>
          <button>4</button>
          <button>5</button>
          <button>6</button>
          <button>Next</button>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
