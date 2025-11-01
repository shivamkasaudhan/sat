import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Package,
  Clock,
  CheckCircle,
  TrendingUp,
  Calendar,
  Users,
  Bell,
  Search,
  Filter,
  Eye,
  Loader,
} from "lucide-react";

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchDashboardData();
  }, [statusFilter, dateFilter]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      // Build query params
      const params = new URLSearchParams();
      if (statusFilter) params.append("status", statusFilter);
      if (dateFilter) params.append("date", dateFilter);

      const [ordersRes, statsRes, notifRes] = await Promise.all([
        axios.get(`http://localhost:8000/api/order/admin/all?${params}`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get("http://localhost:8000/api/order/admin/stats", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get("http://localhost:8000/api/notification?unreadOnly=true", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      if (ordersRes.data.success) {
        setOrders(ordersRes.data.orders);
      }
      if (statsRes.data.success) {
        setStats(statsRes.data.stats);
      }
      if (notifRes.data.success) {
        setNotifications(notifRes.data.notifications);
      }
    } catch (err) {
      console.error("Fetch dashboard error:", err);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.patch(
        `http://localhost:8000/api/order/${orderId}/status`,
        { status: newStatus },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        fetchDashboardData();
      }
    } catch (err) {
      console.error("Update status error:", err);
      alert(err.response?.data?.message || "Failed to update status");
    }
  };

  const getStatusConfig = (status) => {
    const configs = {
      pending: {
        color: "text-yellow-400",
        bg: "bg-yellow-500/10",
        border: "border-yellow-500/30",
      },
      confirmed: {
        color: "text-blue-400",
        bg: "bg-blue-500/10",
        border: "border-blue-500/30",
      },
      preparing: {
        color: "text-purple-400",
        bg: "bg-purple-500/10",
        border: "border-purple-500/30",
      },
      ready: {
        color: "text-green-400",
        bg: "bg-green-500/10",
        border: "border-green-500/30",
      },
      completed: {
        color: "text-emerald-400",
        bg: "bg-emerald-500/10",
        border: "border-emerald-500/30",
      },
      cancelled: {
        color: "text-red-400",
        bg: "bg-red-500/10",
        border: "border-red-500/30",
      },
    };
    return configs[status] || configs.pending;
  };

  const getStatusCounts = () => {
    if (!stats?.statusCounts) return {};
    return stats.statusCounts.reduce((acc, item) => {
      acc[item._id] = item.count;
      return acc;
    }, {});
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const filteredOrders = orders.filter(
    (order) =>
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.user?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const statusCounts = getStatusCounts();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-black flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 text-purple-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-black text-white pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-400">Manage orders and monitor business</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-600/20 rounded-xl">
                <Package className="w-6 h-6 text-purple-400" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {orders.length}
              </span>
            </div>
            <h3 className="text-gray-400 text-sm">Total Orders</h3>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-yellow-500/20">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-yellow-600/20 rounded-xl">
                <Clock className="w-6 h-6 text-yellow-400" />
              </div>
              <span className="text-2xl font-bold text-yellow-400">
                {statusCounts.pending || 0}
              </span>
            </div>
            <h3 className="text-gray-400 text-sm">Pending Orders</h3>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-green-500/20">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-600/20 rounded-xl">
                <CheckCircle className="w-6 h-6 text-green-400" />
              </div>
              <span className="text-2xl font-bold text-green-400">
                {statusCounts.completed || 0}
              </span>
            </div>
            <h3 className="text-gray-400 text-sm">Completed</h3>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/20">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-600/20 rounded-xl">
                <TrendingUp className="w-6 h-6 text-blue-400" />
              </div>
              <span className="text-2xl font-bold text-blue-400">
                ₹{stats?.totalRevenue?.[0]?.total?.toFixed(2) || "0.00"}
              </span>
            </div>
            <h3 className="text-gray-400 text-sm">Total Revenue</h3>
          </div>
        </div>

        {/* Notifications Banner */}
        {notifications.length > 0 && (
          <div className="mb-8 bg-purple-600/20 border border-purple-500/30 rounded-2xl p-4">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-purple-400 animate-pulse" />
              <div className="flex-1">
                <h3 className="font-semibold text-white">
                  {notifications.length} New Notification{notifications.length !== 1 ? "s" : ""}
                </h3>
                <p className="text-sm text-gray-300">
                  {notifications[0]?.message}
                </p>
              </div>
              <button
                onClick={() => navigate("/profile")}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors text-sm font-medium"
              >
                View All
              </button>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="mb-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search orders or customers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-800/50 border border-purple-500/30 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-800/50 border border-purple-500/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="preparing">Preparing</option>
            <option value="ready">Ready</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>

          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="bg-slate-800/50 border border-purple-500/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
          />
        </div>

        {/* Orders Table */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-purple-500/20 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-900/50 border-b border-purple-500/20">
                <tr>
                  <th className="text-left p-4 text-sm font-semibold text-gray-400">Order ID</th>
                  <th className="text-left p-4 text-sm font-semibold text-gray-400">Customer</th>
                  <th className="text-left p-4 text-sm font-semibold text-gray-400">Scheduled</th>
                  <th className="text-left p-4 text-sm font-semibold text-gray-400">Amount</th>
                  <th className="text-left p-4 text-sm font-semibold text-gray-400">Status</th>
                  <th className="text-left p-4 text-sm font-semibold text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-12 text-gray-400">
                      No orders found
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order) => {
                    const statusConfig = getStatusConfig(order.status);
                    return (
                      <tr
                        key={order._id}
                        className="border-b border-purple-500/10 hover:bg-slate-900/30 transition-colors"
                      >
                        <td className="p-4">
                          <span className="font-semibold text-white">
                            {order.orderNumber}
                          </span>
                        </td>
                        <td className="p-4">
                          <div>
                            <p className="text-white font-medium">{order.user?.name}</p>
                            <p className="text-sm text-gray-400">{order.user?.phone}</p>
                          </div>
                        </td>
                        <td className="p-4">
                          <div>
                            <p className="text-white">{formatDate(order.scheduledDate)}</p>
                            <p className="text-sm text-gray-400">{order.scheduledTime}</p>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="font-semibold text-purple-400">
                            ₹{order.totalAmount.toFixed(2)}
                          </span>
                        </td>
                        <td className="p-4">
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${statusConfig.bg} ${statusConfig.color} ${statusConfig.border} border`}
                          >
                            {order.status}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => navigate(`/order/${order._id}`)}
                              className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
                              title="View Details"
                            >
                              <Eye className="w-4 h-4 text-gray-400" />
                            </button>
                            
                            {order.status === "pending" && (
                              <button
                                onClick={() => updateOrderStatus(order._id, "confirmed")}
                                className="px-3 py-1 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 rounded-lg text-xs font-medium transition-colors"
                              >
                                Confirm
                              </button>
                            )}
                            
                            {order.status === "confirmed" && (
                              <button
                                onClick={() => updateOrderStatus(order._id, "preparing")}
                                className="px-3 py-1 bg-purple-600/20 hover:bg-purple-600/30 text-purple-400 rounded-lg text-xs font-medium transition-colors"
                              >
                                Prepare
                              </button>
                            )}
                            
                            {order.status === "preparing" && (
                              <button
                                onClick={() => updateOrderStatus(order._id, "ready")}
                                className="px-3 py-1 bg-green-600/20 hover:bg-green-600/30 text-green-400 rounded-lg text-xs font-medium transition-colors"
                              >
                                Ready
                              </button>
                            )}
                            
                            {order.status === "ready" && (
                              <button
                                onClick={() => updateOrderStatus(order._id, "completed")}
                                className="px-3 py-1 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 rounded-lg text-xs font-medium transition-colors"
                              >
                                Complete
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;