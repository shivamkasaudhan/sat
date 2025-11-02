// pages/AdminDashboard.jsx - COMPLETE FULL VERSION
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Package, Clock, CheckCircle, TrendingUp, Bell, Search, Eye, Loader, LogOut,
  Plus, Users, Tag, Grid, X, Edit, Trash2, Save, EyeOff as EyeIcon,
} from "lucide-react";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("orders");
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const [productForm, setProductForm] = useState({
    name: "", description: "", category: "", pricePerUnit: "", unitType: "piece", inStock: true, image: null,
  });

  const [categoryForm, setCategoryForm] = useState({ name: "", image: null });

  const [adminForm, setAdminForm] = useState({
    name: "", phone: "", password: "", addressLine1: "", addressLine2: "", pincode: "",
  });

  const [formError, setFormError] = useState("");

  useEffect(() => {
    fetchDashboardData();
    if (activeTab === "products") fetchProducts();
    if (activeTab === "categories") fetchCategories();
  }, [statusFilter, dateFilter, activeTab]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const params = new URLSearchParams();
      if (statusFilter) params.append("status", statusFilter);
      if (dateFilter) params.append("date", dateFilter);

      const [ordersRes, statsRes, notifRes] = await Promise.all([
        axios.get(`http://localhost:8000/api/order/admin/all?${params}`, { headers: { Authorization: `Bearer ${token}` } }),
        axios.get("http://localhost:8000/api/order/admin/stats", { headers: { Authorization: `Bearer ${token}` } }),
        axios.get("http://localhost:8000/api/notification?unreadOnly=true", { headers: { Authorization: `Bearer ${token}` } }),
      ]);

      if (ordersRes.data.success) setOrders(ordersRes.data.orders);
      if (statsRes.data.success) setStats(statsRes.data.stats);
      if (notifRes.data.success) {
        setNotifications(notifRes.data.notifications);
        setUnreadCount(notifRes.data.unreadCount);
      }
    } catch (err) {
      console.error("Fetch dashboard error:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/product");
      setProducts(response.data);
    } catch (err) {
      console.error("Fetch products error:", err);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/category");
      setCategories(response.data);
    } catch (err) {
      console.error("Fetch categories error:", err);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.patch(`http://localhost:8000/api/order/${orderId}/status`, 
        { status: newStatus }, { headers: { Authorization: `Bearer ${token}` } });
      if (response.data.success) fetchDashboardData();
    } catch (err) {
      console.error("Update status error:", err);
      alert(err.response?.data?.message || "Failed to update status");
    }
  };

  const markNotificationAsRead = async (notifId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(`http://localhost:8000/api/notification/${notifId}/read`, {}, 
        { headers: { Authorization: `Bearer ${token}` } });
      fetchDashboardData();
    } catch (err) {
      console.error("Mark notification error:", err);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = "/";
  };

  const openProductModal = (product = null) => {
    setModalType("product");
    setEditMode(!!product);
    setCurrentItem(product);
    if (product) {
      setProductForm({
        name: product.name, description: product.description, category: product.category?._id || "",
        pricePerUnit: product.pricePerUnit, unitType: product.unitType, inStock: product.inStock, image: null,
      });
    } else {
      setProductForm({ name: "", description: "", category: "", pricePerUnit: "", unitType: "piece", inStock: true, image: null });
    }
    setFormError("");
    setShowModal(true);
  };

  const handleProductSubmit = async () => {
    try {
      setFormError("");
      const token = localStorage.getItem("token");
      if (!productForm.name || !productForm.description || !productForm.category || !productForm.pricePerUnit) {
        setFormError("Please fill all required fields");
        return;
      }
      if (!editMode && !productForm.image) {
        setFormError("Please upload a product image");
        return;
      }

      const formData = new FormData();
      formData.append("name", productForm.name);
      formData.append("description", productForm.description);
      formData.append("category", productForm.category);
      formData.append("pricePerUnit", productForm.pricePerUnit);
      formData.append("price", productForm.pricePerUnit);
      formData.append("unitType", productForm.unitType);
      formData.append("inStock", productForm.inStock);
      if (productForm.image) formData.append("image", productForm.image);

      const url = editMode ? `http://localhost:8000/api/product/${currentItem._id}` : "http://localhost:8000/api/product/add";
      const method = editMode ? "put" : "post";
      const response = await axios[method](url, formData, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
      });

      if (response.data.success) {
        alert(`Product ${editMode ? "updated" : "added"} successfully!`);
        setShowModal(false);
        fetchProducts();
      }
    } catch (err) {
      console.error("Product submit error:", err);
      setFormError(err.response?.data?.message || "Failed to save product");
    }
  };

  const handleProductDelete = async (productId) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:8000/api/product/${productId}`, { headers: { Authorization: `Bearer ${token}` } });
      alert("Product deleted successfully!");
      fetchProducts();
    } catch (err) {
      console.error("Delete product error:", err);
      alert(err.response?.data?.message || "Failed to delete product");
    }
  };

  const openCategoryModal = (category = null) => {
    setModalType("category");
    setEditMode(!!category);
    setCurrentItem(category);
    if (category) {
      setCategoryForm({ name: category.name, image: null });
    } else {
      setCategoryForm({ name: "", image: null });
    }
    setFormError("");
    setShowModal(true);
  };

  const handleCategorySubmit = async () => {
    try {
      setFormError("");
      const token = localStorage.getItem("token");
      if (!categoryForm.name) {
        setFormError("Please enter category name");
        return;
      }
      if (!editMode && !categoryForm.image) {
        setFormError("Please upload a category image");
        return;
      }

      const formData = new FormData();
      formData.append("name", categoryForm.name);
      if (categoryForm.image) formData.append("image", categoryForm.image);

      const url = editMode ? `http://localhost:8000/api/category/${currentItem._id}` : "http://localhost:8000/api/category/add";
      const method = editMode ? "put" : "post";
      const response = await axios[method](url, formData, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
      });

      if (response.data.success) {
        alert(`Category ${editMode ? "updated" : "added"} successfully!`);
        setShowModal(false);
        fetchCategories();
      }
    } catch (err) {
      console.error("Category submit error:", err);
      setFormError(err.response?.data?.message || "Failed to save category");
    }
  };

  const handleCategoryDelete = async (categoryId) => {
    if (!confirm("Are you sure you want to delete this category?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:8000/api/category/${categoryId}`, { headers: { Authorization: `Bearer ${token}` } });
      alert("Category deleted successfully!");
      fetchCategories();
    } catch (err) {
      console.error("Delete category error:", err);
      alert(err.response?.data?.message || "Failed to delete category");
    }
  };

  const openAdminModal = () => {
    setModalType("admin");
    setEditMode(false);
    setAdminForm({ name: "", phone: "", password: "", addressLine1: "", addressLine2: "", pincode: "" });
    setFormError("");
    setShowModal(true);
  };

  const handleAdminSubmit = async () => {
    try {
      setFormError("");
      const token = localStorage.getItem("token");
      if (!adminForm.name || !adminForm.phone || !adminForm.password || !adminForm.addressLine1 || !adminForm.pincode) {
        setFormError("Please fill all required fields");
        return;
      }
      if (!/^[0-9]{10}$/.test(adminForm.phone)) {
        setFormError("Phone must be 10 digits");
        return;
      }
      if (adminForm.password.length < 6) {
        setFormError("Password must be at least 6 characters");
        return;
      }

      const response = await axios.post("http://localhost:8000/admin/signup", {
        name: adminForm.name, phone: adminForm.phone, password: adminForm.password,
        address: { firstLine: adminForm.addressLine1, secondLine: adminForm.addressLine2, pincode: adminForm.pincode },
      }, { headers: { Authorization: `Bearer ${token}` } });

      if (response.data.success) {
        alert("Admin created successfully!");
        setShowModal(false);
      }
    } catch (err) {
      console.error("Admin submit error:", err);
      setFormError(err.response?.data?.message || "Failed to create admin");
    }
  };

  const getStatusConfig = (status) => {
    const configs = {
      pending: { color: "text-yellow-400", bg: "bg-yellow-500/10", border: "border-yellow-500/30" },
      confirmed: { color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/30" },
      preparing: { color: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/30" },
      ready: { color: "text-green-400", bg: "bg-green-500/10", border: "border-green-500/30" },
      completed: { color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/30" },
      cancelled: { color: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/30" },
    };
    return configs[status] || configs.pending;
  };

  const getStatusCounts = () => {
    if (!stats?.statusCounts) return {};
    return stats.statusCounts.reduce((acc, item) => { acc[item._id] = item.count; return acc; }, {});
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
  };

  const filteredOrders = orders.filter((order) =>
    order.orderNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.user?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const statusCounts = getStatusCounts();

  if (loading && activeTab === "orders") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-black flex items-center justify-center">
        <div className="text-center text-white">
          <Loader className="w-12 h-12 text-purple-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-black text-white">
      <div className="bg-slate-900/50 backdrop-blur-md border-b border-purple-500/20 sticky top-0 z-50">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Admin Dashboard</h1>
                <p className="text-xs text-gray-400">Shri Ashok Traders</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <button onClick={() => setShowNotifications(!showNotifications)} className="relative p-2 hover:bg-slate-800 rounded-lg transition-colors">
                  <Bell className="w-6 h-6" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-pink-500 rounded-full flex items-center justify-center text-xs font-bold">{unreadCount}</span>
                  )}
                </button>
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-96 bg-slate-800 border border-purple-500/30 rounded-xl shadow-2xl overflow-hidden">
                    <div className="p-4 border-b border-purple-500/20"><h3 className="font-semibold">Notifications</h3></div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.length === 0 ? (
                        <p className="p-4 text-center text-gray-400 text-sm">No new notifications</p>
                      ) : (
                        notifications.map((notif) => (
                          <div key={notif._id} onClick={() => markNotificationAsRead(notif._id)}
                            className="p-4 border-b border-purple-500/10 hover:bg-slate-700/50 cursor-pointer transition-colors">
                            <h4 className="font-semibold text-sm mb-1">{notif.title}</h4>
                            <p className="text-xs text-gray-400">{notif.message}</p>
                            <p className="text-xs text-gray-500 mt-1">{formatDate(notif.createdAt)}</p>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>
              <button onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-red-600/20 hover:bg-red-600/30 rounded-lg transition-colors text-red-400 font-medium">
                <LogOut className="w-5 h-5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex gap-4 overflow-x-auto scrollbar-hide">
          {[
            { id: "orders", label: "Orders", icon: Package },
            { id: "products", label: "Products", icon: Grid },
            { id: "categories", label: "Categories", icon: Tag },
            { id: "admins", label: "Admins", icon: Users },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                  activeTab === tab.id ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white" : "bg-slate-800/50 text-gray-400 hover:bg-slate-800"
                }`}>
                <Icon className="w-5 h-5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {activeTab === "orders" && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-purple-600/20 rounded-xl"><Package className="w-6 h-6 text-purple-400" /></div>
                  <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">{orders.length}</span>
                </div>
                <h3 className="text-gray-400 text-sm">Total Orders</h3>
              </div>
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-yellow-500/20">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-yellow-600/20 rounded-xl"><Clock className="w-6 h-6 text-yellow-400" /></div>
                  <span className="text-2xl font-bold text-yellow-400">{statusCounts.pending || 0}</span>
                </div>
                <h3 className="text-gray-400 text-sm">Pending Orders</h3>
              </div>
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-green-500/20">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-green-600/20 rounded-xl"><CheckCircle className="w-6 h-6 text-green-400" /></div>
                  <span className="text-2xl font-bold text-green-400">{statusCounts.completed || 0}</span>
                </div>
                <h3 className="text-gray-400 text-sm">Completed</h3>
              </div>
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/20">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-blue-600/20 rounded-xl"><TrendingUp className="w-6 h-6 text-blue-400" /></div>
                  <span className="text-2xl font-bold text-blue-400">₹{stats?.totalRevenue?.[0]?.total?.toFixed(2) || "0.00"}</span>
                </div>
                <h3 className="text-gray-400 text-sm">Total Revenue</h3>
              </div>
            </div>

            <div className="mb-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input type="text" placeholder="Search orders..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-slate-800/50 border border-purple-500/30 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500" />
              </div>
              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-slate-800/50 border border-purple-500/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500">
                <option value="">All Status</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="preparing">Preparing</option>
                <option value="ready">Ready</option>
                <option value="completed">Completed</option>
              </select>
              <input type="date" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)}
                className="bg-slate-800/50 border border-purple-500/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500" />
            </div>

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
                      <tr><td colSpan="6" className="text-center py-12 text-gray-400">No orders found</td></tr>
                    ) : (
                      filteredOrders.map((order) => {
                        const statusConfig = getStatusConfig(order.status);
                        return (
                          <tr key={order._id} className="border-b border-purple-500/10 hover:bg-slate-900/30 transition-colors">
                            <td className="p-4"><span className="font-semibold text-white">{order.orderNumber}</span></td>
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
                            <td className="p-4"><span className="font-semibold text-purple-400">₹{order.totalAmount?.toFixed(2)}</span></td>
                            <td className="p-4">
                              <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${statusConfig.bg} ${statusConfig.color} ${statusConfig.border} border`}>
                                {order.status}
                              </span>
                            </td>
                            <td className="p-4">
                              <div className="flex items-center gap-2">
                                <button onClick={() => navigate(`/order/${order._id}`)} className="p-2 hover:bg-slate-700 rounded-lg transition-colors" title="View Details">
                                  <Eye className="w-4 h-4 text-gray-400" />
                                </button>
                                {order.status === "pending" && (
                                  <button onClick={() => updateOrderStatus(order._id, "confirmed")}
                                    className="px-3 py-1 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 rounded-lg text-xs font-medium transition-colors">Confirm</button>
                                )}
                                {order.status === "confirmed" && (
                                  <button onClick={() => updateOrderStatus(order._id, "preparing")}
                                    className="px-3 py-1 bg-purple-600/20 hover:bg-purple-600/30 text-purple-400 rounded-lg text-xs font-medium transition-colors">Prepare</button>
                                )}
                                {order.status === "preparing" && (
                                  <button onClick={() => updateOrderStatus(order._id, "ready")}
                                    className="px-3 py-1 bg-green-600/20 hover:bg-green-600/30 text-green-400 rounded-lg text-xs font-medium transition-colors">Ready</button>
                                )}
                                {order.status === "ready" && (
                                  <button onClick={() => updateOrderStatus(order._id, "completed")}
                                    className="px-3 py-1 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 rounded-lg text-xs font-medium transition-colors">Complete</button>
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
          </>
        )}

        {activeTab === "products" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Products Management</h2>
              <button onClick={() => openProductModal()}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-medium hover:from-pink-600 hover:to-purple-600 transition-all">
                <Plus className="w-5 h-5" />Add Product
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div key={product._id} className="bg-slate-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-purple-500/20">
                  <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                    <p className="text-sm text-gray-400 mb-3 line-clamp-2">{product.description}</p>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-lg font-bold text-purple-400">₹{product.pricePerUnit}/{product.unitType}</span>
                      <span className={`px-2 py-1 text-xs rounded ${product.inStock ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                        {product.inStock ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => openProductModal(product)}
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 rounded-lg transition-colors">
                        <Edit className="w-4 h-4" />Edit
                      </button>
                      <button onClick={() => handleProductDelete(product._id)}
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "categories" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Categories Management</h2>
              <button onClick={() => openCategoryModal()}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-medium hover:from-pink-600 hover:to-purple-600 transition-all">
                <Plus className="w-5 h-5" />Add Category
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {categories.map((category) => (
                <div key={category._id} className="bg-slate-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-purple-500/20">
                  <div className="relative aspect-square">
                    <img src={category.image} alt={category.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-3 text-center">{category.name}</h3>
                    <div className="flex gap-2">
                      <button onClick={() => openCategoryModal(category)}
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 rounded-lg transition-colors">
                        <Edit className="w-4 h-4" />Edit
                      </button>
                      <button onClick={() => handleCategoryDelete(category._id)}
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "admins" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Admin Management</h2>
              <button onClick={openAdminModal}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-medium hover:from-pink-600 hover:to-purple-600 transition-all">
                <Plus className="w-5 h-5" />Add Admin
              </button>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20">
              <p className="text-gray-400 text-center">
                Create new admin users to manage the system. Admin users will have full access to all dashboard features.
              </p>
            </div>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-slate-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-purple-500/30">
            <div className="sticky top-0 bg-slate-900/95 backdrop-blur-sm flex items-center justify-between p-6 border-b border-purple-500/20">
              <h2 className="text-2xl font-bold">
                {modalType === "product" && (editMode ? "Edit Product" : "Add New Product")}
                {modalType === "category" && (editMode ? "Edit Category" : "Add New Category")}
                {modalType === "admin" && "Create New Admin"}
              </h2>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-slate-700 rounded-lg transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6">
              {formError && (
                <div className="mb-4 p-4 bg-red-600/20 border border-red-500/50 rounded-lg text-red-300">{formError}</div>
              )}

              {modalType === "product" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Product Name *</label>
                    <input type="text" value={productForm.name} onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                      className="w-full px-4 py-2 bg-slate-900/50 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:border-purple-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Description *</label>
                    <textarea value={productForm.description} onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                      rows={3} className="w-full px-4 py-2 bg-slate-900/50 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:border-purple-500" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Category *</label>
                      <select value={productForm.category} onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                        className="w-full px-4 py-2 bg-slate-900/50 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:border-purple-500">
                        <option value="">Select Category</option>
                        {categories.map((cat) => (
                          <option key={cat._id} value={cat._id}>{cat.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Unit Type *</label>
                      <select value={productForm.unitType} onChange={(e) => setProductForm({ ...productForm, unitType: e.target.value })}
                        className="w-full px-4 py-2 bg-slate-900/50 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:border-purple-500">
                        <option value="piece">Piece</option>
                        <option value="weight">Weight (kg/gram)</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Price per Unit (₹) * {productForm.unitType === 'weight' ? '(per kg)' : '(per piece)'}
                    </label>
                    <input type="number" step="0.01" value={productForm.pricePerUnit} onChange={(e) => setProductForm({ ...productForm, pricePerUnit: e.target.value })}
                      className="w-full px-4 py-2 bg-slate-900/50 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:border-purple-500" />
                  </div>
                  <div>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" checked={productForm.inStock} onChange={(e) => setProductForm({ ...productForm, inStock: e.target.checked })}
                        className="w-4 h-4 text-purple-600 rounded" />
                      <span className="text-sm font-medium text-gray-300">In Stock</span>
                    </label>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Product Image {!editMode && '*'}</label>
                    <input type="file" accept="image/*" onChange={(e) => setProductForm({ ...productForm, image: e.target.files[0] })}
                      className="w-full px-4 py-2 bg-slate-900/50 border border-purple-500/30 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-purple-600 file:text-white hover:file:bg-purple-700" />
                  </div>
                  <button onClick={handleProductSubmit}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-medium hover:from-pink-600 hover:to-purple-600 transition-all">
                    <Save className="w-5 h-5" />{editMode ? "Update Product" : "Create Product"}
                  </button>
                </div>
              )}

              {modalType === "category" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Category Name *</label>
                    <input type="text" value={categoryForm.name} onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
                      placeholder="e.g., Vegetables, Fruits, Dairy"
                      className="w-full px-4 py-2 bg-slate-900/50 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:border-purple-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Category Image {!editMode && '*'}</label>
                    <input type="file" accept="image/*" onChange={(e) => setCategoryForm({ ...categoryForm, image: e.target.files[0] })}
                      className="w-full px-4 py-2 bg-slate-900/50 border border-purple-500/30 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-purple-600 file:text-white hover:file:bg-purple-700" />
                  </div>
                  <button onClick={handleCategorySubmit}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-medium hover:from-pink-600 hover:to-purple-600 transition-all">
                    <Save className="w-5 h-5" />{editMode ? "Update Category" : "Create Category"}
                  </button>
                </div>
              )}

              {modalType === "admin" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Full Name *</label>
                    <input type="text" value={adminForm.name} onChange={(e) => setAdminForm({ ...adminForm, name: e.target.value })}
                      className="w-full px-4 py-2 bg-slate-900/50 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:border-purple-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number *</label>
                    <input type="tel" maxLength="10" value={adminForm.phone} onChange={(e) => setAdminForm({ ...adminForm, phone: e.target.value })}
                      placeholder="10-digit phone number"
                      className="w-full px-4 py-2 bg-slate-900/50 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:border-purple-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Password *</label>
                    <div className="relative">
                      <input type={showPassword ? "text" : "password"} value={adminForm.password} onChange={(e) => setAdminForm({ ...adminForm, password: e.target.value })}
                        placeholder="Min. 6 characters"
                        className="w-full px-4 py-2 bg-slate-900/50 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:border-purple-500" />
                      <button type="button" onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white">
                        {showPassword ? <EyeIcon className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Address Line 1 *</label>
                    <input type="text" value={adminForm.addressLine1} onChange={(e) => setAdminForm({ ...adminForm, addressLine1: e.target.value })}
                      className="w-full px-4 py-2 bg-slate-900/50 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:border-purple-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Address Line 2</label>
                    <input type="text" value={adminForm.addressLine2} onChange={(e) => setAdminForm({ ...adminForm, addressLine2: e.target.value })}
                      className="w-full px-4 py-2 bg-slate-900/50 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:border-purple-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Pincode *</label>
                    <input type="text" maxLength="6" value={adminForm.pincode} onChange={(e) => setAdminForm({ ...adminForm, pincode: e.target.value })}
                      placeholder="6-digit pincode"
                      className="w-full px-4 py-2 bg-slate-900/50 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:border-purple-500" />
                  </div>
                  <button onClick={handleAdminSubmit}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-medium hover:from-pink-600 hover:to-purple-600 transition-all">
                    <Save className="w-5 h-5" />Create Admin User
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;