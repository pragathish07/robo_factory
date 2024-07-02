import React, { useEffect, useState } from 'react';
import './OrderSummary.css';
import { FaEllipsisV, FaDownload, FaEdit, FaTrash } from 'react-icons/fa';
import { convertToCSV, downloadCSV } from '../../utils/csvExport';

const OrderSummary = () => {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage] = useState(10);

  useEffect(() => {
    fetch('http://localhost:5000/api/orders')
      .then(response => response.json())
      .then(data => setOrders(data))
      .catch(error => console.error('Error fetching orders:', error));
  }, []);

  const handleActionClick = (action, orderId) => {
    console.log(`${action} clicked for order ${orderId}`);
  };

  const handleDownloadCSV = () => {
    const csvData = convertToCSV(orders);
    downloadCSV(csvData, 'orders.csv');
  };

  // Pagination logic
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = orders.slice(indexOfFirstEntry, indexOfLastEntry);

  const totalPages = Math.ceil(orders.length / entriesPerPage);

  return (
    <div className="order-summary">
      <h2>Order Summary</h2>
      <button onClick={handleDownloadCSV} className="download-csv-btn">
        <FaDownload /> Download Orders as CSV
      </button>
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
            <th>Tracking</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentEntries.map((order, index) => (
            <tr key={order._id}>
              <td>{indexOfFirstEntry + index + 1}</td>
              <td>{order._id}</td>
              <td>{new Date(order.createdAt).toLocaleDateString()}</td>
              <td>
                <ul>
                  {order.items.map((item, i) => (
                    <li key={i}>{item.product.name} x {item.quantity}</li>
                  ))}
                </ul>
              </td>
              <td>Rs.{order.totalAmount}</td>
              <td>{order.paid ? <span className="paid-yes">Yes</span> : <span className="paid-no">No</span>}</td>
              <td>{order.address}</td>
              <td className={`status-${order.status.toLowerCase()}`}>{order.status}</td>
              <td>{order.tracking}</td>
              <td>
                <div className="action-menu">
                  <FaEllipsisV />
                  <div className="action-menu-content">
                    <div onClick={() => handleActionClick('Download', order._id)}><FaDownload /> Download</div>
                    <div onClick={() => handleActionClick('Edit', order._id)}><FaEdit /> Edit</div>
                    <div onClick={() => handleActionClick('Delete', order._id)}><FaTrash /> Delete</div>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <span>Showing {indexOfFirstEntry + 1} to {Math.min(indexOfLastEntry, orders.length)} of {orders.length} entries</span>
        <div>
          <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>Back</button>
          {[...Array(totalPages)].map((_, page) => (
            <button key={page + 1} onClick={() => setCurrentPage(page + 1)} className={currentPage === page + 1 ? 'active' : ''}>{page + 1}</button>
          ))}
          <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
