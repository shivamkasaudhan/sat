import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Package,
  Clock,
  CheckCircle,
  XCircle,
  Calendar,
  MapPin,
  Eye,
  Loader,
} from "lucide-react";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, [filter]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      
      const url = filter === "all" 
        ? "http://localhost:8000/api/order/my-orders"
        : `http://localhost:8000/api/order/my-orders?status=${filter}`;

      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        setOrders(response.data.orders);
      }
    } catch (err) {
      console.error("Fetch orders error:", err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusConfig = (status) => {
    const configs = {
      pending: {
        color: "text-yellow-400",
        bg: "bg-yellow-500/10",
        border: "border-yellow-500/30",
        icon: Clock,
        label: "Pending",
      },
      confirmed: {
        color: "text-blue-400",
        bg: "bg-blue-500/10",
        border: "border-blue-500/30",
        icon: CheckCircle,
        label: "Confirmed",
      },
      preparing: {
        color: "text-purple-400",
        bg: "bg-purple-500/10",
        border: "border-purple-500/30",
        icon: Package,
        label: "Preparing",
      },
      ready: {
        color: "text-green-400",
        bg: "bg-green-500/10",
        border: "border-green-500/30",
        icon: CheckCircle,
        label: "Ready for Pickup",
      },
      completed: {
        color: "text-emerald-400",
        bg: "bg-emerald-500/10",
        border: "border-emerald-500/30",
        icon: CheckCircle,
        label: "Completed",
      },
      cancelled: {
        color: "text-red-400",
        bg: "bg-red-500/10",
        border: "border-red-500/30",
        icon: XCircle,
        label: "Cancelled",
      },
    };
    return configs[status] || configs.pending;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const formatTime = (timeString) => {
    return timeString;
  };

  // Format address object to string
  const formatAddress = (address) => {
    if (typeof address === 'string') return address;
    if (!address) return 'N/A';
    
    const parts = [];
    if (address.firstLine) parts.push(address.firstLine);
    if (address.secondLine) parts.push(address.secondLine);
    if (address.pincode) parts.push(`PIN: ${address.pincode}`);
    
    return parts.join(', ') || 'N/A';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-black flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 text-purple-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading your orders...</p>
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
            My Orders
          </h1>
          <p className="text-gray-400">Track and manage your scheduled orders</p>
        </div>

        {/* Filter Tabs */}
        <div className="mb-8 overflow-x-auto scrollbar-hide">
          <div className="flex gap-2 pb-2">
            {[
              { value: "all", label: "All Orders" },
              { value: "pending", label: "Pending" },
              { value: "confirmed", label: "Confirmed" },
              { value: "preparing", label: "Preparing" },
              { value: "ready", label: "Ready" },
              { value: "completed", label: "Completed" },
            ].map((tab) => (
              <button
                key={tab.value}
                onClick={() => setFilter(tab.value)}
                className={`flex-shrink-0 px-6 py-2 rounded-xl font-medium transition-all duration-300 ${
                  filter === tab.value
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                    : "bg-slate-800/50 text-gray-400 hover:bg-slate-800 border border-purple-500/20"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Orders List */}
        {orders.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <Package className="w-12 h-12 text-gray-600" />
            </div>
            <h2 className="text-2xl font-semibold mb-2">No orders found</h2>
            <p className="text-gray-400 mb-6">
              {filter === "all"
                ? "You haven't placed any orders yet"
                : `No ${filter} orders found`}
            </p>
            <button
              onClick={() => navigate("/products")}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-semibold hover:from-pink-600 hover:to-purple-600 transition-all duration-300"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => {
              const statusConfig = getStatusConfig(order.status);
              const StatusIcon = statusConfig.icon;

              return (
                <div
                  key={order._id}
                  className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-purple-500/20 hover:border-purple-500/40 transition-all overflow-hidden"
                >
                  <div className="p-6">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold text-white">
                            {order.orderNumber}
                          </h3>
                          <div
                            className={`flex items-center gap-2 px-3 py-1 rounded-full ${statusConfig.bg} ${statusConfig.border} border`}
                          >
                            <StatusIcon className={`w-4 h-4 ${statusConfig.color}`} />
                            <span className={`text-sm font-medium ${statusConfig.color}`}>
                              {statusConfig.label}
                            </span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-400">
                          Ordered on {formatDate(order.createdAt)}
                        </p>
                      </div>

                      <button
                        onClick={() => navigate(`/order/${order._id}`)}
                        className="flex items-center gap-2 px-4 py-2 bg-purple-600/20 hover:bg-purple-600/30 rounded-lg transition-colors text-purple-400 font-medium"
                      >
                        <Eye className="w-4 h-4" />
                        View Details
                      </button>
                    </div>

                    {/* Pickup Info */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 p-4 bg-slate-900/50 rounded-xl">
                      <div className="flex items-start gap-3">
                        <Calendar className="w-5 h-5 text-purple-400 mt-0.5" />
                        <div>
                          <p className="text-xs text-gray-400 mb-1">Scheduled Pickup</p>
                          <p className="text-white font-medium">
                            {formatDate(order.scheduledDate)} at {formatTime(order.scheduledTime)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-pink-400 mt-0.5" />
                        <div>
                          <p className="text-xs text-gray-400 mb-1">Pickup Address</p>
                          <p className="text-white font-medium line-clamp-2">
                            {formatAddress(order.deliveryAddress)}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Order Items Preview */}
                    <div className="mb-4">
                      <p className="text-sm text-gray-400 mb-2">
                        {order.orderItems.length} item{order.orderItems.length !== 1 ? "s" : ""}
                      </p>
                      <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                        {order.orderItems.slice(0, 5).map((item, idx) => (
                          <div
                            key={idx}
                            className="flex-shrink-0 w-16 h-16 bg-slate-900 rounded-lg overflow-hidden"
                          >
                            <img
                              src={item.product?.image || item.image}
                              alt={item.productName}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                        {order.orderItems.length > 5 && (
                          <div className="flex-shrink-0 w-16 h-16 bg-slate-900 rounded-lg flex items-center justify-center text-gray-400 text-sm">
                            +{order.orderItems.length - 5}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Total */}
                    <div className="flex justify-between items-center pt-4 border-t border-purple-500/20">
                      <span className="text-gray-400">Total Amount</span>
                      <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        ₹{order.totalAmount.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;