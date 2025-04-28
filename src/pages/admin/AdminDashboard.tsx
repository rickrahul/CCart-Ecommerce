import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ShoppingBag,
  Users,
  DollarSign,
  Package,
  BarChart,
  TrendingUp,
  TrendingDown,
  Percent,
  ChevronRight
} from 'lucide-react';
import { useProducts } from '../../contexts/ProductContext';
import { useAuth } from '../../contexts/AuthContext';

const AdminDashboard = () => {
  const { products } = useProducts();
  const { user } = useAuth();
  const [salesData, setSalesData] = useState({
    today: 24500,
    thisWeek: 126800,
    thisMonth: 425000,
    lastMonth: 387500
  });
  const [stats, setStats] = useState({
    totalOrders: 312,
    totalCustomers: 842,
    totalProducts: products.length,
    totalRevenue: 425000,
    conversionRate: 3.2,
    averageOrderValue: 1360
  });

  const formatPrice = (amount: number) => {
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  const cards = [
    {
      title: 'Total Revenue',
      value: formatPrice(stats.totalRevenue),
      icon: <DollarSign size={20} className="text-green-500" />,
      change: 10.2,
      trend: 'up',
      period: 'from last month'
    },
    {
      title: 'Orders',
      value: stats.totalOrders,
      icon: <ShoppingBag size={20} className="text-orange-500" />,
      change: 5.3,
      trend: 'up',
      period: 'from last month'
    },
    {
      title: 'Customers',
      value: stats.totalCustomers,
      icon: <Users size={20} className="text-purple-500" />,
      change: 12.5,
      trend: 'up',
      period: 'from last month'
    },
    {
      title: 'Conversion Rate',
      value: `${stats.conversionRate}%`,
      icon: <Percent size={20} className="text-orange-500" />,
      change: 0.8,
      trend: 'down',
      period: 'from last month'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
        <p className="text-gray-600">Welcome back, {user?.name}</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {cards.map((card, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-sm text-gray-500">{card.title}</p>
                <h3 className="text-2xl font-bold text-gray-800">{card.value}</h3>
              </div>
              <div className="p-2 rounded-full bg-gray-100">
                {card.icon}
              </div>
            </div>
            <div className="flex items-center text-sm">
              {card.trend === 'up' ? (
                <TrendingUp size={16} className="text-green-500 mr-1" />
              ) : (
                <TrendingDown size={16} className="text-red-500 mr-1" />
              )}
              <span
                className={card.trend === 'up' ? 'text-green-500 mr-1' : 'text-red-500 mr-1'}
              >
                {card.change}%
              </span>
              <span className="text-gray-500">{card.period}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Admin Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Link
          to="/admin/products"
          className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow flex justify-between items-center"
        >
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-orange-100 mr-4">
              <Package size={24} className="text-orange-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Manage Products</h3>
              <p className="text-sm text-gray-500">{stats.totalProducts} products</p>
            </div>
          </div>
          <ChevronRight size={20} className="text-gray-400" />
        </Link>

        <Link
          to="/admin/orders"
          className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow flex justify-between items-center"
        >
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 mr-4">
              <ShoppingBag size={24} className="text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Manage Orders</h3>
              <p className="text-sm text-gray-500">{stats.totalOrders} orders</p>
            </div>
          </div>
          <ChevronRight size={20} className="text-gray-400" />
        </Link>

        <Link
          to="/admin/customers"
          className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow flex justify-between items-center"
        >
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 mr-4">
              <Users size={24} className="text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Manage Customers</h3>
              <p className="text-sm text-gray-500">{stats.totalCustomers} customers</p>
            </div>
          </div>
          <ChevronRight size={20} className="text-gray-400" />
        </Link>
      </div>

      {/* Recent Orders */}
      <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-800">Recent Orders</h2>
          <Link to="/admin/orders" className="text-orange-600 hover:text-orange-800 text-sm font-medium">
            View All
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[
                { id: 'ORD-7352', customer: 'Priya Sharma', date: '2 hours ago', amount: '₹12,999', status: 'Delivered' },
                { id: 'ORD-7351', customer: 'Rahul Verma', date: '5 hours ago', amount: '₹8,999', status: 'Processing' },
                { id: 'ORD-7350', customer: 'Anita Patel', date: '1 day ago', amount: '₹24,550', status: 'Shipped' },
                { id: 'ORD-7349', customer: 'Rajesh Kumar', date: '1 day ago', amount: '₹4,299', status: 'Delivered' },
                { id: 'ORD-7348', customer: 'Neha Singh', date: '2 days ago', amount: '₹15,999', status: 'Cancelled' }
              ].map((order, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-orange-600">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {order.customer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {order.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        order.status === 'Delivered'
                          ? 'bg-green-100 text-green-800'
                          : order.status === 'Processing'
                          ? 'bg-orange-100 text-orange-800'
                          : order.status === 'Shipped'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;