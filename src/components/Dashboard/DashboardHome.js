import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import axios from 'axios';
import './DashboardHome.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const DashboardHome = () => {
  const [revenueData, setRevenueData] = useState(null);
  const [customerData, setCustomerData] = useState(null);
  const [dashboardStats, setDashboardStats] = useState({});
  const [recentSold, setRecentSold] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const statsResponse = await axios.get('http://localhost:5000/api/dashboard-stats');
        setDashboardStats(statsResponse.data);

        const response = await axios.get('http://localhost:5000/api/monthly-stats');
        const { revenueStats, customerStats } = response.data;

        const revenueLabels = revenueStats.map(stat => `${stat._id.day}/${stat._id.month}/${stat._id.year}`);
        const revenueValues = revenueStats.map(stat => stat.totalRevenue);

        const customerLabels = customerStats.map(stat => `${stat._id.month}/${stat._id.year}`);
        const customerValues = customerStats.map(stat => stat.newCustomers);

        setRevenueData({
          labels: revenueLabels,
          datasets: [
            {
              label: 'Revenue',
              data: revenueValues,
              fill: false,
              backgroundColor: 'rgb(75, 192, 192)',
              borderColor: 'rgba(75, 192, 192, 0.2)',
            },
          ],
        });

        setCustomerData({
          labels: customerStats.map(stat => `${stat._id.day}/${stat._id.month}/${stat._id.year}`),
          datasets: [
            {
              label: 'New Customers',
              data: customerStats.map(stat => stat.newCustomers),
              fill: false,
              backgroundColor: 'rgb(153, 102, 255)',
              borderColor: 'rgba(153, 102, 255, 0.2)',
            },
          ],
        });
      } catch (error) {
        setError('Error fetching monthly statistics.');
      }
    };

    const fetchRecentSold = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/recent-sold');
        setRecentSold(response.data);
      } catch (error) {
        setError('Error fetching recent sold data.');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
    fetchRecentSold();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="dashboard-home">
      <div className="details-box">
        <div className="current-balance">
          <h3>Total Earnings</h3>
          <p style={{ color: 'black', fontSize: '20px',fontFamily:'Segoe UI' }}>Rs.{dashboardStats?.totalEarnings || 0}</p>
        </div>
        <div className="stat">
          <p style={{ color: 'black', fontSize: '20px' ,fontFamily:'Segoe UI'}}>Total orders</p>
          <h4>{dashboardStats?.totalOrders || 0}</h4>
          
        </div>
        <div className="stat">
        <p style={{ color: 'black', fontSize: '20px',fontFamily:'Segoe UI' }}>New orders</p>
          <h4>{dashboardStats?.newOrders || 0} pcs</h4>
          
        </div>
        <div className="card">
        <p style={{ color: 'black', fontSize: '20px',fontFamily:'Segoe UI' }}>All Products</p>
          <h3>{dashboardStats?.allProducts || 0}</h3>
          
        </div>
        <div className="card">
        <p style={{ color: 'black', fontSize: '20px',fontFamily:'Segoe UI'}}>Total customers</p>
          <h3>{dashboardStats?.totalCustomers || 0}</h3>
          
        </div>

      </div>
      <div className="charts">
        <div className="chart">
          <h3>Revenue Over Time</h3>
          {revenueData ? <Line data={revenueData} /> : <p>No data available</p>}
        </div>
        <div className="chart">
          <h3>Number of Customers Over Time</h3>
          {customerData ? <Line data={customerData} /> : <p>No data available</p>}
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
            {recentSold.length > 0 ? (
              recentSold.map((order, index) => (
                <tr key={index}>
                  <td>{order.items.map(item => item.product?.name || 'N/A').join(', ')}</td>
                  <td>{order.items.map(item => item.product?.category || 'N/A').join(', ')}</td>
                  <td>{order.totalAmount}</td>
                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td>{order.user?.name || 'N/A'}</td>
                  <td>{order.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No recent sold data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardHome;
