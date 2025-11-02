import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  ShoppingCart,
  Trash2,
  ArrowLeft,
  Calendar,
  Clock,
  AlertCircle,
  CheckCircle,
  MapPin,
  Info,
} from "lucide-react";

const Cart = () => {
  const [cart, setCart] = useState({});
  const [quantities, setQuantities] = useState({});
  const [units, setUnits] = useState({});
  const [scheduledDate, setScheduledDate] = useState("");
  const [scheduledTime, setScheduledTime] = useState("");
  const [specialInstructions, setSpecialInstructions] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState({
    firstLine: "",
    secondLine: "",
    pincode: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
    loadCart();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      await loadUserAddress();
    } else {
      setIsLoggedIn(false);
    }
  };

  const loadUserAddress = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:8000/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success && response.data.user.address) {
        setDeliveryAddress(response.data.user.address);
      }
    } catch (err) {
      console.error("Load address error:", err);
    }
  };

  const loadCart = () => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart);
      setCart(parsedCart);
      
      const initialQuantities = {};
      const initialUnits = {};
      Object.keys(parsedCart).forEach(productId => {
        const product = parsedCart[productId];
        initialQuantities[productId] = "";
        initialUnits[productId] = product.unitType === 'weight' ? 'kg' : 'piece';
      });
      setQuantities(initialQuantities);
      setUnits(initialUnits);
    }
  };

  const saveCart = (newCart) => {
    localStorage.setItem("cart", JSON.stringify(newCart));
    setCart(newCart);
  };

  const removeItem = (productId) => {
    const newCart = { ...cart };
    const newQuantities = { ...quantities };
    const newUnits = { ...units };
    
    delete newCart[productId];
    delete newQuantities[productId];
    delete newUnits[productId];
    
    saveCart(newCart);
    setQuantities(newQuantities);
    setUnits(newUnits);
  };

  const clearCart = () => {
    localStorage.removeItem("cart");
    setCart({});
    setQuantities({});
    setUnits({});
  };

  const updateQuantity = (productId, value) => {
    setQuantities({
      ...quantities,
      [productId]: value
    });
  };

  const updateUnit = (productId, unit) => {
    setUnits({
      ...units,
      [productId]: unit
    });
  };

  const calculateItemPrice = (product, quantityText, unit) => {
    if (!quantityText || quantityText.trim() === "") return 0;
    
    const quantity = parseFloat(quantityText);
    if (isNaN(quantity) || quantity <= 0) return 0;

    if (product.unitType === 'weight') {
      const quantityInKg = unit === 'gram' ? quantity / 1000 : quantity;
      return product.pricePerUnit * quantityInKg;
    } else {
      return product.pricePerUnit * quantity;
    }
  };

  const calculateTotal = () => {
    return Object.keys(cart).reduce((sum, productId) => {
      const product = cart[productId];
      const quantity = quantities[productId];
      const unit = units[productId];
      return sum + calculateItemPrice(product, quantity, unit);
    }, 0);
  };

  const getTodayDate = () => {
    return new Date().toISOString().split("T")[0];
  };

  const handleScheduleOrder = async () => {
    setError("");

    if (!isLoggedIn) {
      // Save cart and redirect to login
      localStorage.setItem("cart", JSON.stringify(cart));
      localStorage.setItem("redirectAfterLogin", "/cart");
      navigate("/login");
      return;
    }
    
    if (Object.keys(cart).length === 0) {
      setError("Your cart is empty");
      return;
    }

    // Validate all quantities
    for (let productId in cart) {
      if (!quantities[productId] || quantities[productId].trim() === "") {
        setError("Please enter quantity for all items");
        return;
      }
      const qty = parseFloat(quantities[productId]);
      if (isNaN(qty) || qty <= 0) {
        setError("Please enter valid quantities (numbers greater than 0)");
        return;
      }
    }

    if (!scheduledDate || !scheduledTime) {
      setError("Please select pickup date and time");
      return;
    }

    const scheduledDateTime = new Date(`${scheduledDate}T${scheduledTime}`);
    const now = new Date();
    
    if (scheduledDateTime < now) {
      setError("Pickup time cannot be in the past");
      return;
    }

    if (!deliveryAddress.firstLine.trim() || !deliveryAddress.pincode.trim()) {
      setError("Please enter your pickup address with pincode");
      return;
    }

    try {
      setLoading(true);

      const orderItems = Object.keys(cart).map((productId) => {
        const product = cart[productId];
        const quantityValue = parseFloat(quantities[productId]);
        const unit = units[productId];
        
        const quantityText = `${quantityValue} ${unit}${unit === 'piece' && quantityValue > 1 ? 's' : ''}`;
        
        return {
          product: productId,
          quantityText: quantityText,
          quantityValue: quantityValue,
          unit: unit
        };
      });

      const token = localStorage.getItem("token");
      
      const response = await axios.post(
        "http://localhost:8000/api/order",
        {
          orderItems,
          scheduledDate,
          scheduledTime,
          specialInstructions,
          deliveryAddress: deliveryAddress,
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
        localStorage.removeItem("redirectAfterLogin");
        
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
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-semibold text-lg">{item.name}</h3>
                          <p className="text-sm text-gray-400">
                            {item.category?.name}
                          </p>
                          <p className="text-sm text-purple-400 mt-1">
                            ₹{item.pricePerUnit}/{item.unitType === 'weight' ? 'kg' : 'piece'}
                          </p>
                        </div>
                        <button
                          onClick={() => removeItem(item._id)}
                          className="p-2 hover:bg-red-600/20 rounded-lg transition-colors text-red-400"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>

                      {/* Quantity Input */}
                      <div className="flex items-center gap-3">
                        <div className="flex-1">
                          <label className="block text-xs text-gray-400 mb-1">Quantity</label>
                          <div className="flex gap-2">
                            <input
                              type="number"
                              step={item.unitType === 'weight' ? '0.1' : '1'}
                              min="0"
                              value={quantities[item._id] || ""}
                              onChange={(e) => updateQuantity(item._id, e.target.value)}
                              placeholder={item.unitType === 'weight' ? "e.g., 2.5" : "e.g., 5"}
                              className="flex-1 bg-slate-900/50 border border-purple-500/30 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-purple-500"
                            />
                            
                            {item.unitType === 'weight' && (
                              <select
                                value={units[item._id] || 'kg'}
                                onChange={(e) => updateUnit(item._id, e.target.value)}
                                className="bg-slate-900/50 border border-purple-500/30 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-purple-500"
                              >
                                <option value="kg">kg</option>
                                <option value="gram">gram</option>
                              </select>
                            )}
                            
                            {item.unitType === 'piece' && (
                              <div className="px-4 py-2 bg-slate-900/50 border border-purple-500/30 rounded-lg text-gray-400">
                                piece{quantities[item._id] && parseFloat(quantities[item._id]) > 1 ? 's' : ''}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="text-right">
                          <p className="text-xs text-gray-400 mb-1">Total</p>
                          <p className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                            ₹{calculateItemPrice(item, quantities[item._id], units[item._id]).toFixed(2)}
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
                      Pickup Date *
                    </label>
                    <input
                      type="date"
                      value={scheduledDate}
                      onChange={(e) => setScheduledDate(e.target.value)}
                      min={getTodayDate()}
                      className="w-full bg-slate-900/50 border border-purple-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2">
                      Pickup Time (IST) *
                    </label>
                    <input
                      type="time"
                      value={scheduledTime}
                      onChange={(e) => setScheduledTime(e.target.value)}
                      className="w-full bg-slate-900/50 border border-purple-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                    />
                  </div>

                  {/* Auto-filled Address for Logged-in Users */}
                  {isLoggedIn && deliveryAddress.firstLine && (
                    <div className="p-4 bg-green-600/10 border border-green-500/30 rounded-lg">
                      <div className="flex items-start gap-2 mb-2">
                        <MapPin className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-green-300 mb-1">Your Saved Address</p>
                          <p className="text-xs text-gray-400">
                            {deliveryAddress.firstLine}
                            {deliveryAddress.secondLine && `, ${deliveryAddress.secondLine}`}
                            <br />
                            PIN: {deliveryAddress.pincode}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2 mt-2 pt-2 border-t border-green-500/20">
                        <Info className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                        <p className="text-xs text-gray-400">
                          Using your profile address. Update in Profile settings if needed.
                        </p>
                      </div>
                    </div>
                  )}

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

              {/* Price Summary - NO TAX */}
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20">
                <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
                
                <div className="space-y-3 mb-4">
                  <div className="border-t border-purple-500/20 pt-3 flex justify-between text-2xl font-bold">
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
                  {loading ? "Scheduling..." : isLoggedIn ? "Schedule Order" : "Login to Schedule"}
                </button>

                {!isLoggedIn && (
                  <p className="text-xs text-center text-gray-400 mt-3">
                    Please login to schedule your order. Your cart will be saved.
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;