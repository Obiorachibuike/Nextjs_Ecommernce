"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { Line, Bar, Pie } from "react-chartjs-2";  // Import Pie chart
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,  // Necessary for Pie chart
} from "chart.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Register chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement // Required for Pie chart
);

// Mock data
const mockData = {
  totalBlogViews: 12345,
  totalUsers: 5000,
  activeUsers: 3000,
  websiteViews: { daily: 200, weekly: 1400, monthly: 6000, yearly: 72000 },
  sales: [65, 59, 80, 81, 56, 55, 72, 80, 85, 90, 92, 95],
  categories: ['Category A', 'Category B', 'Category C', 'Category D'],
  categorySales: [35, 60, 45, 70],
  userStatus: [45, 25, 30],
  orderStatus: [60, 25, 15], // Mock data
};

export default function AnalyticsPage() {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [totalBlogViews, setTotalBlogViews] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [activeUsers, setActiveUsers] = useState(0);
  const [websiteViews, setWebsiteViews] = useState({
    daily: 0,
    weekly: 0,
    monthly: 0,
    yearly: 0,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch analytics data
    async function fetchAnalyticsData() {
      setLoading(true);
      toast.info("Loading analytics data...", { position: "top-right" });

      try {
        const response = await axios.get(`/api/analytics?year=${selectedYear}`);
        const data = response.data;
        setAnalyticsData(data);
        setTotalBlogViews(data.totalBlogViews);
        setTotalUsers(data.totalUsers);
        setActiveUsers(data.activeUsers);
        setWebsiteViews(data.websiteViews);
        toast.success("Analytics data loaded successfully!", { position: "top-right" });
      } catch (error) {
        toast.error("Failed to load analytics data. Using mock data.", { position: "top-right" });
        console.error("Error fetching analytics data:", error);
        // Use mock data on failure
        setAnalyticsData(mockData);
        setTotalBlogViews(mockData.totalBlogViews);
        setTotalUsers(mockData.totalUsers);
        setActiveUsers(mockData.activeUsers);
        setWebsiteViews(mockData.websiteViews);
      } finally {
        setLoading(false);
      }
    }

    fetchAnalyticsData();
  }, [selectedYear]);

  // Default chart data
  const defaultLineChartData = {
    labels: [
      'January', 'February', 'March', 'April', 'May', 'June', 'July',
      'August', 'September', 'October', 'November', 'December'
    ],
    datasets: [
      {
        label: "Sales Over Time",
        data: [65, 59, 80, 81, 56, 55, 72, 80, 85, 90, 92, 95],
        fill: false,
        borderColor: "rgba(255, 165, 0, 1)",
        tension: 0.1,
      },
    ],
  };

  const defaultBarChartData = {
    labels: ['Category A', 'Category B', 'Category C', 'Category D'],
    datasets: [
      {
        label: "Sales by Category",
        data: [35, 60, 45, 70],
        backgroundColor: "rgba(255, 165, 0, 0.2)",
        borderColor: "rgba(255, 165, 0, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Default Pie chart data (for user status example)
  const defaultPieChartData = {
    labels: ['Active Users', 'Inactive Users', 'New Users'],
    datasets: [
      {
        label: 'User Distribution',
        data: [45, 25, 30], // Mock data: 45% active, 25% inactive, 30% new
        backgroundColor: ['rgba(75, 192, 192, 0.5)', 'rgba(255, 99, 132, 0.5)', 'rgba(255, 159, 64, 0.5)'],
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)', 'rgba(255, 159, 64, 1)'],
        borderWidth: 1,
      },
    ],
  };

  const lineChartData = analyticsData ? {
    labels: analyticsData.months,
    datasets: [
      {
        label: "Sales Over Time",
        data: analyticsData.sales,
        fill: false,
        borderColor: "rgba(255, 165, 0, 1)",
        tension: 0.1,
      },
    ],
  } : defaultLineChartData;

  const barChartData = analyticsData ? {
    labels: analyticsData.categories,
    datasets: [
      {
        label: "Sales by Category",
        data: analyticsData.categorySales,
        backgroundColor: "rgba(255, 165, 0, 0.2)",
        borderColor: "rgba(255, 165, 0, 1)",
        borderWidth: 1,
      },
    ],
  } : defaultBarChartData;

  const orderStatusChartData = analyticsData ? {
    labels: ['Completed Orders', 'Pending Orders', 'Cancelled Orders'],
    datasets: [
      {
        data: analyticsData.orderStatus, // Ensure the API provides this
        backgroundColor: ['rgba(54, 162, 235, 0.5)', 'rgba(255, 206, 86, 0.5)', 'rgba(255, 99, 132, 0.5)'],
        borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(255, 99, 132, 1)'],
        borderWidth: 1,
      },
    ],
  } : {
    labels: ['Completed Orders', 'Pending Orders', 'Cancelled Orders'],
    datasets: [
      {
        data: [50, 30, 20], // Mock data
        backgroundColor: ['rgba(54, 162, 235, 0.5)', 'rgba(255, 206, 86, 0.5)', 'rgba(255, 99, 132, 0.5)'],
        borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(255, 99, 132, 1)'],
        borderWidth: 1,
      },
    ],
  };
  

  const pieChartData = analyticsData ? {
    labels: ['Active Users', 'Inactive Users', 'New Users'],
    datasets: [
      {
        data: analyticsData.userStatus,  // Assuming the API provides this
        backgroundColor: ['rgba(75, 192, 192, 0.5)', 'rgba(255, 99, 132, 0.5)', 'rgba(255, 159, 64, 0.5)'],
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)', 'rgba(255, 159, 64, 1)'],
        borderWidth: 1,
      },
    ],
  } : defaultPieChartData;

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  return (
    <div className="p-4 font-sans">
      <h1 className="text-black text-4xl font-semibold mt-10 mb-8">Admin Analytics Dashboard</h1>

      {/* Year Filter Dropdown */}
      <div className="mb-4">
        <label htmlFor="year" className="text-lg text-black font-semibold">Select Year: </label>
        <select
          id="year"
          value={selectedYear}
          onChange={handleYearChange}
          className="border p-2 rounded text-black"
        >
          <option value={new Date().getFullYear()}>{new Date().getFullYear()}</option>
          <option value={new Date().getFullYear() - 1}>{new Date().getFullYear() - 1}</option>
          <option value={new Date().getFullYear() - 2}>{new Date().getFullYear() - 2}</option>
        </select>
      </div>

      {loading && (
        <div className="loading text-center text-gray-600">
          <span>Loading...</span>
        </div>
      )}

      {/* Data Display */}
      <div className="analytics-summary grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        <div className="card p-6 bg-white rounded shadow text-black">
          <h2 className="text-2xl font-bold">Total Blog Views</h2>
          <p>{totalBlogViews}</p>
        </div>
        <div className="card p-6 bg-white rounded shadow text-black">
          <h2 className="text-2xl font-bold">Total Users</h2>
          <p>{totalUsers}</p>
        </div>
        <div className="card p-6 bg-white rounded shadow text-black">
          <h2 className="text-2xl font-bold">Active Users</h2>
          <p>{activeUsers}</p>
        </div>
      </div>

      {/* Website Views */}
      <div className="website-views mb-8">
        <h3 className="text-xl font-semibold">Website Views</h3>
        <div className="flex justify-between">
          <div>
            <h4 className="font-semibold">Daily</h4>
            <p>{websiteViews.daily}</p>
          </div>
          <div>
            <h4 className="font-semibold">Weekly</h4>
            <p>{websiteViews.weekly}</p>
          </div>
          <div>
            <h4 className="font-semibold">Monthly</h4>
            <p>{websiteViews.monthly}</p>
          </div>
          <div>
            <h4 className="font-semibold">Yearly</h4>
            <p>{websiteViews.yearly}</p>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="charts grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
        <div className="line-chart bg-white p-6 rounded shadow">
          <h3 className="text-xl font-semibold">Sales Over Time</h3>
          <Line data={lineChartData} />
        </div>
        <div className="bar-chart bg-white p-6 rounded shadow">
          <h3 className="text-xl font-semibold">Sales by Category</h3>
          <Bar data={barChartData} />
        </div>
        <div className="pie-chart bg-white p-6 rounded shadow">
          <h3 className="text-xl font-semibold">User Status Distribution</h3>
          <Pie data={pieChartData} />
        </div>
        <div className="order-status-chart bg-white p-6 rounded shadow">
          <h3 className="text-xl font-semibold">Order Status</h3>
          <Pie data={orderStatusChartData} />
        </div>
      </div>

      {/* <ToastContainer /> */}
    </div>
  );
}
