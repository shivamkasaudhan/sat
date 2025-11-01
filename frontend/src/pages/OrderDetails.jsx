import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  ArrowLeft,
  Package,
  Calendar,
  Clock,
  MapPin,
  Phone,
  FileText,
  Loader,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";

const OrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(false);

  useEffect(() => {
    fetchOrderDetails();
  }, [id]);

  const fetchOrderDetails = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      
      const response = await axios.get(
        `http://localhost:8000/api/order/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        setOrder(response.data.order);
      }
    } catch (err) {
      console.error("Fetch order details error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOrder = async () => {
    if (!window.confirm("Are you sure you want to cancel this order?")) {
      return;
    }

    try {
      setCancelling(true);
      const token = localStorage.getItem("token");
      
      const response = await axios.patch(
        `http://localhost:8000/api/order/${id}/cancel`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        fetchOrderDetails();
      }
    } catch (err) {
      console.error("Cancel order error:", err);
      alert(err.response?.data?.message || "Failed to cancel order");
    } finally {
      setCancelling(false);
    }
  };

  const getStatusConfig = (status) => {
    const configs = {
      pending: {
        color: "text-yellow-400",
        bg: "bg-yellow-500/10",
        border: "border-yellow-500/30",
        icon: Clock,
        label: "Pending Confirmation",
        description: "Your order is waiting for confirmation",
      },
      confirmed: {
        color: "text-blue-400",
        bg: "bg-blue-500/10",
        border: "border-blue-500/30",
        icon: CheckCircle,
        label: "Confirmed",
        description: "Your order has been confirmed",
      },
      preparing: {
        color: "text-purple-400",
        bg: "bg-purple-500/10",
        border: "border-purple-500/30",
        icon: Package,
        label: "Being Prepared",
        description: "We're preparing your order",
      },
      ready: {
        color: "text-green-400",
        bg: "bg-green-500/10",
        border: "border-green-500/30",
        icon: CheckCircle,
        label: "Ready for Pickup",
        description: "Your order is ready! Please collect it",
      },
      completed: {
        color: "text-emerald-400",
        bg: "bg-emerald-500/10",
        border: "border-emerald-500/30",
        icon: CheckCircle,
        label: "Completed",
        description: "Order has been completed",
      },
      cancelled: {
        color: "text-red-400",
        bg: "bg-red-500/10",
        border: "border-red-500/30",
        icon: XCircle,
        label: "Cancelled",
        description: "This order has been cancelled",
      },
    };
    return configs[status] || configs.pending;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-black flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 text-purple-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-black flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Order Not Found</h2>
          <p className="text-gray-400 mb-6">The order you're looking for doesn't exist</p>
          <button
            onClick={() => navigate("/my-orders")}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-semibold hover:from-pink-600 hover:to-purple-600 transition-all"
          >
            Back to Orders
          </button>
        </div>
      </div>
    );
  }

  const statusConfig = getStatusConfig(order.status);
  const StatusIcon = statusConfig.icon;
  const canCancel = ["pending", "confirmed"].includes(order.status);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-black text-white pt-20 pb-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate("/my-orders")}
            className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {order.orderNumber}
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              Placed on {formatDateTime(order.createdAt)}
            </p>
          </div>
        </div>

        {/* Status Card */}
        <div className={`mb-8 p-6 rounded-2xl ${statusConfig.bg} border ${statusConfig.border}`}>
          <div className="flex items-center gap-4 mb-2">
            <StatusIcon className={`w-8 h-8 ${statusConfig.color}`} />
            <div>
              <h2 className={`text-xl font-bold ${statusConfig.color}`}>
                {statusConfig.label}
              </h2>
              <p className="text-gray-300 text-sm">{statusConfig.description}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Order Items */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Package className="w-5 h-5 text-purple-400" />
                Order Items
              </h3>
              
              <div className="space-y-4">
                {order.orderItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex gap-4 p-4 bg-slate-900/50 rounded-xl border border-purple-500/10"
                  >
                    <img
                      src={item.product?.image || item.image}
                      alt={item.productName}
                      className="w-20 h-20 object-cover rounded-lg bg-slate-800"
                    />
                    
                    <div className="flex-1">
                      <h4 className="font-semibold mb-1">{item.productName}</h4>
                      <p className="text-sm text-gray-400 mb-2">
                        Quantity: {item.quantity}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-400">
                          ₹{item.price} × {item.quantity}
                        </span>
                        <span className="font-semibold text-purple-400">
                          ₹{item.totalPrice.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Special Instructions */}
            {order.specialInstructions && (
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-purple-400" />
                  Special Instructions
                </h3>
                <p className="text-gray-300">{order.specialInstructions}</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* Pickup Details */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20">
              <h3 className="text-lg font-semibold mb-4">Pickup Details</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-purple-400 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Date</p>
                    <p className="text-white font-medium">
                      {formatDate(order.scheduledDate)}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-pink-400 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Time</p>
                    <p className="text-white font-medium">{order.scheduledTime} IST</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-purple-400 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Address</p>
                    <p className="text-white font-medium">{order.deliveryAddress}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-pink-400 mt-0.5" />
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Contact</p>
                    <p className="text-white font-medium">{order.contactPhone}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Price Summary */}
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20">
              <h3 className="text-lg font-semibold mb-4">Payment Summary</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal</span>
                  <span>₹{order.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Tax (10%)</span>
                  <span>₹{order.tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-purple-500/20 pt-3 flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    ₹{order.totalAmount.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Cancel Order Button */}
            {canCancel && (
              <button
                onClick={handleCancelOrder}
                disabled={cancelling}
                className="w-full py-3 bg-red-600/20 hover:bg-red-600/30 border border-red-500/50 rounded-xl font-semibold text-red-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {cancelling ? "Cancelling..." : "Cancel Order"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;