// DashboardHome.js
import React from 'react';
import './DashboardHome.css';

const DashboardHome = () => {
  return (
    <div className="dashboard-home">
      <div className="overview">
        <div className="current-balance">
          <h3>Total Earnings</h3>
          <p>Rs.1,00,000</p>
        </div>
        <div className="statistics">
          <div className="stat">
            <h4>130</h4>
            <p>Total orders</p>
          </div>
          <div className="stat">
            <h4>15 pcs</h4>
            <p>New orders</p>
          </div>
        </div>
      </div>
      <div className="info-cards">
        <div className="card">
          <h3>165</h3>
          <p>All Products</p>
        </div>
        <div className="card">
          <h3>15</h3>
          <p>Total customers</p>
        </div>
        <div className="card">
          <h3>160</h3>
          <p>Visitor Count</p>
        </div>
      </div>
      <div className="recent-sold">
        <h3>Recent Sold</h3>
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Customer</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Robo Parts</td>
              <td>BOT</td>
              <td>900 </td>
              <td>15/05/2024</td>
              <td>Nur Alam</td>
              <td>Processing</td>
            </tr>
            <tr>
              <td>Battery</td>
              <td>BOT</td>
              <td>16,600</td>
              <td>21/05/2024</td>
              <td>S A Sams</td>
              <td>Shipped</td>
            </tr>
            <tr>
              <td>Robotic toolkit</td>
              <td>toolkit</td>
              <td>800</td>
              <td>25/05/2024</td>
              <td>Sadek Rahman</td>
              <td>Done</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="top-categories">
        <h3>Top Categories</h3>
        <ul>
          <li>P1 - 1308</li>
          <li>P2 - 1019</li>
          <li>p3- 807</li>
          <li>p4- 633</li>
          <li>p5- 418</li>
          <li>p6 - 312</li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardHome;
