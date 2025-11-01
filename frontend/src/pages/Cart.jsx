import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  ArrowLeft,
  Calendar,
  Clock,
  AlertCircle,
  CheckCircle,
} from "lucide-react";

const Cart = () => {
  const [cart, setCart] = useState({});
  const [scheduledDate, setScheduledDate] = useState("");
  const [scheduledTime, setScheduledTime] = useState("");
  const [specialInstructions, setSpecialInstructions] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = () => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  };

  const saveCart = (newCart) => {
    localStorage.setItem("cart", JSON.stringify(newCart));
    setCart(newCart);
  };

  const updateQuantity = (productId, change) => {
    const newCart = { ...cart };
    if (newCart[productId]) {
      newCart[productId].quantity += change;
      if (newCart[productId].quantity <= 0) {
        delete newCart[productId];
      }
      saveCart(newCart);
    }
  };

  const removeItem = (productId) => {
    const newCart = { ...cart };
    delete newCart[productId];
    saveCart(newCart);
  };

  const clearCart = () => {
    localStorage.removeItem("cart");
    setCart({});
  };

  const calculateSubtotal = () => {
    return Object.values(cart).reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.1; // 10% tax
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  const getMinDateTime = () => {
    const now = new Date();
    now.setHours(now.getHours() + 2); // Minimum 2 hours from now
    return now.toISOString().slice(0, 16);
  };

  const handleScheduleOrder = async () => {
    setError("");
    
    // Validation
    if (Object.keys(cart).length === 0) {
      setError("Your cart is empty");
      return;
    }

    if (!scheduledDate || !scheduledTime) {
      setError("Please select pickup date and time");
      return;
    }

    const scheduledDateTime = new Date(`${scheduledDate}T${scheduledTime}`);
    const now = new Date();
    
    if (scheduledDateTime <= now) {
      setError("Pickup time must be in the future");
      return;
    }

    if (!deliveryAddress.trim()) {
      setError("Please enter your pickup address");
      return;
    }

    try {
      setLoading(true);

      const orderItems = Object.values(cart).map((item) => ({
        product: item._id,
        quantity: item.quantity,
      }));

      const token = localStorage.getItem("token");
      
      const response = await axios.post(
        "http://localhost:8000/api/order",
        {
          orderItems,
          scheduledDate,
          scheduledTime,
          specialInstructions,
          deliveryAddress,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setSuccess(true);
        clearCart();
        
        // Redirect to orders page after 2 seconds
        setTimeout(() => {
          navigate("/my-orders");
        }, 2000);
      }
    } catch (err) {
      console.error("Order error:", err);
      setError(err.response?.data?.message || "Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  const cartItems = Object.values(cart);

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-black flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Order Scheduled!</h2>
          <p className="text-gray-400 mb-4">Your order has been successfully scheduled.</p>
          <p className="text-sm text-gray-500">Redirecting to orders page...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-black text-white pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate("/products")}
            className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Shopping Cart
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              {cartItems.length} item{cartItems.length !== 1 ? "s" : ""} in your cart
            </p>
          </div>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingCart className="w-12 h-12 text-gray-600" />
            </div>
            <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-gray-400 mb-6">Add some products to get started!</p>
            <button
              onClick={() => navigate("/products")}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-semibold hover:from-pink-600 hover:to-purple-600 transition-all duration-300"
            >
              Browse Products
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-4 border border-purple-500/20 hover:border-purple-500/40 transition-all"
                >
                  <div className="flex gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-xl bg-slate-900"
                    />
                    
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold text-lg">{item.name}</h3>
                          <p className="text-sm text-gray-400">
                            {item.category?.name}
                          </p>
                        </div>
                        <button
                          onClick={() => removeItem(item._id)}
                          className="p-2 hover:bg-red-600/20 rounded-lg transition-colors text-red-400"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2 bg-slate-900/50 rounded-lg p-1">
                          <button
                            onClick={() => updateQuantity(item._id, -1)}
                            className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="px-4 font-semibold">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item._id, 1)}
                            className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="text-right">
                          <p className="text-sm text-gray-400">
                            ₹{item.price} × {item.quantity}
                          </p>
                          <p className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                            ₹{(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary & Scheduling */}
            <div className="space-y-6">
              
              {/* Scheduling */}
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-purple-400" />
                  Schedule Pickup
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">
                      Pickup Date
                    </label>
                    <input
                      type="date"
                      value={scheduledDate}
                      onChange={(e) => setScheduledDate(e.target.value)}
                      min={new Date().toISOString().split("T")[0]}
                      className="w-full bg-slate-900/50 border border-purple-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2">
                      Pickup Time (IST)
                    </label>
                    <input
                      type="time"
                      value={scheduledTime}
                      onChange={(e) => setScheduledTime(e.target.value)}
                      className="w-full bg-slate-900/50 border border-purple-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2">
                      Pickup Address
                    </label>
                    <textarea
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      placeholder="Enter your pickup address..."
                      rows="3"
                      className="w-full bg-slate-900/50 border border-purple-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2">
                      Special Instructions (Optional)
                    </label>
                    <textarea
                      value={specialInstructions}
                      onChange={(e) => setSpecialInstructions(e.target.value)}
                      placeholder="Any special requirements..."
                      rows="3"
                      className="w-full bg-slate-900/50 border border-purple-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Price Summary */}
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20">
                <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
                
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-gray-400">
                    <span>Subtotal</span>
                    <span>₹{calculateSubtotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Tax (10%)</span>
                    <span>₹{calculateTax().toFixed(2)}</span>
                  </div>
                  <div className="border-t border-purple-500/20 pt-3 flex justify-between text-xl font-bold">
                    <span>Total</span>
                    <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                      ₹{calculateTotal().toFixed(2)}
                    </span>
                  </div>
                </div>

                {error && (
                  <div className="mb-4 p-3 bg-red-600/20 border border-red-500/50 rounded-lg flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-red-300">{error}</p>
                  </div>
                )}

                <button
                  onClick={handleScheduleOrder}
                  disabled={loading}
                  className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold text-lg hover:from-pink-600 hover:to-purple-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-purple-500/50"
                >
                  {loading ? "Scheduling..." : "Schedule Order"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;