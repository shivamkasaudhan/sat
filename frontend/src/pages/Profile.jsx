import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  User,
  Bell,
  Package,
  LogOut,
  Mail,
  Phone,
  MapPin,
  Calendar,
  CheckCircle,
  Trash2,
  Loader,
  ShoppingCart,
  Edit,
  Save,
  X,
  Lock,
} from "lucide-react";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState({});
  const [editing, setEditing] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);
  
  // Edit form state
  const [editForm, setEditForm] = useState({
    name: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    pincode: "",
  });

  // Password form state
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [updateMessage, setUpdateMessage] = useState({ type: "", text: "" });
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserData();
    fetchNotifications();
    loadCart();
  }, []);

  const loadCart = () => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  };

  const getTotalCartItems = () => {
    return Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);
  };

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:8000/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      if (response.data.success) {
        const userData = response.data.user;
        setUser(userData);
        setEditForm({
          name: userData.name,
          phone: userData.phone,
          addressLine1: userData.address?.firstLine || "",
          addressLine2: userData.address?.secondLine || "",
          pincode: userData.address?.pincode || "",
        });
      }
    } catch (err) {
      console.error("Fetch user error:", err);
      if (err.response?.status === 401) {
        handleLogout();
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:8000/api/notification",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        setNotifications(response.data.notifications);
        setUnreadCount(response.data.unreadCount);
      }
    } catch (err) {
      console.error("Fetch notifications error:", err);
    }
  };

  const handleUpdateProfile = async () => {
    try {
      setUpdateMessage({ type: "", text: "" });
      const token = localStorage.getItem("token");
      
      const response = await axios.patch(
        "http://localhost:8000/api/auth/update-profile",
        {
          name: editForm.name,
          phone: editForm.phone,
          address: {
            firstLine: editForm.addressLine1,
            secondLine: editForm.addressLine2,
            pincode: editForm.pincode,
          }
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        setUpdateMessage({ type: "success", text: "Profile updated successfully!" });
        setEditing(false);
        fetchUserData();
        
        // Update localStorage user
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }
    } catch (err) {
      console.error("Update profile error:", err);
      setUpdateMessage({ 
        type: "error", 
        text: err.response?.data?.message || "Failed to update profile" 
      });
    }
  };

  const handleUpdatePassword = async () => {
    try {
      setUpdateMessage({ type: "", text: "" });

      if (passwordForm.newPassword !== passwordForm.confirmPassword) {
        setUpdateMessage({ type: "error", text: "Passwords do not match" });
        return;
      }

      if (passwordForm.newPassword.length < 6) {
        setUpdateMessage({ type: "error", text: "Password must be at least 6 characters" });
        return;
      }

      const token = localStorage.getItem("token");
      
      const response = await axios.patch(
        "http://localhost:8000/api/auth/update-password",
        {
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        setUpdateMessage({ type: "success", text: "Password updated successfully!" });
        setChangingPassword(false);
        setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
      }
    } catch (err) {
      console.error("Update password error:", err);
      setUpdateMessage({ 
        type: "error", 
        text: err.response?.data?.message || "Failed to update password" 
      });
    }
  };

  const markAsRead = async (notificationId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `http://localhost:8000/api/notification/${notificationId}/read`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchNotifications();
    } catch (err) {
      console.error("Mark as read error:", err);
    }
  };

  const markAllAsRead = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        "http://localhost:8000/api/notification/read-all",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchNotifications();
    } catch (err) {
      console.error("Mark all as read error:", err);
    }
  };

  const deleteNotification = async (notificationId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `http://localhost:8000/api/notification/${notificationId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchNotifications();
    } catch (err) {
      console.error("Delete notification error:", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("userRole");
    localStorage.removeItem("cart");
    sessionStorage.clear();
    window.location.href = "/";
  };

  const getNotificationIcon = (type) => {
    const icons = {
      order_placed: Package,
      order_ready: CheckCircle,
      order_confirmed: CheckCircle,
      order_cancelled: Trash2,
    };
    return icons[type] || Bell;
  };

  const getNotificationColor = (type) => {
    const colors = {
      order_placed: "text-blue-400 bg-blue-500/10",
      order_ready: "text-green-400 bg-green-500/10",
      order_confirmed: "text-purple-400 bg-purple-500/10",
      order_cancelled: "text-red-400 bg-red-500/10",
    };
    return colors[type] || "text-gray-400 bg-gray-500/10";
  };

  const formatNotificationTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-black flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 text-purple-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading profile...</p>
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
            My Account
          </h1>
          <p className="text-gray-400">Manage your profile and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20 space-y-2 sticky top-24">
              <button
                onClick={() => setActiveTab("profile")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  activeTab === "profile"
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                    : "text-gray-400 hover:bg-slate-700/50"
                }`}
              >
                <User className="w-5 h-5" />
                <span className="font-medium">Profile</span>
              </button>

              <button
                onClick={() => setActiveTab("notifications")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all relative ${
                  activeTab === "notifications"
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                    : "text-gray-400 hover:bg-slate-700/50"
                }`}
              >
                <Bell className="w-5 h-5" />
                <span className="font-medium">Notifications</span>
                {unreadCount > 0 && (
                  <span className="ml-auto px-2 py-0.5 bg-pink-500 rounded-full text-xs font-bold">
                    {unreadCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => navigate("/my-orders")}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-slate-700/50 transition-all"
              >
                <Package className="w-5 h-5" />
                <span className="font-medium">My Orders</span>
              </button>

              <button
                onClick={() => navigate("/cart")}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-slate-700/50 transition-all relative"
              >
                <ShoppingCart className="w-5 h-5" />
                <span className="font-medium">Cart</span>
                {getTotalCartItems() > 0 && (
                  <span className="ml-auto px-2 py-0.5 bg-purple-500 rounded-full text-xs font-bold">
                    {getTotalCartItems()}
                  </span>
                )}
              </button>

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-600/20 transition-all mt-4 border-t border-purple-500/20 pt-4"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Sign Out</span>
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === "profile" && user && (
              <div className="space-y-6">
                
                {/* Update Message */}
                {updateMessage.text && (
                  <div className={`p-4 rounded-xl border ${
                    updateMessage.type === "success" 
                      ? "bg-green-500/10 border-green-500/50 text-green-400"
                      : "bg-red-500/10 border-red-500/50 text-red-400"
                  }`}>
                    {updateMessage.text}
                  </div>
                )}

                {/* Profile Card */}
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-6">
                      <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-3xl font-bold">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold mb-1">{user.name}</h2>
                        <p className="text-gray-400">{user.email}</p>
                        <span className="inline-block mt-2 px-3 py-1 bg-purple-600/20 border border-purple-500/30 rounded-full text-sm text-purple-400 font-medium">
                          {user.role === "admin" ? "👑 Admin" : "👤 Client"}
                        </span>
                      </div>
                    </div>

                    {!editing && (
                      <button
                        onClick={() => setEditing(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-purple-600/20 hover:bg-purple-600/30 rounded-lg transition-colors text-purple-400 font-medium"
                      >
                        <Edit className="w-4 h-4" />
                        Edit Profile
                      </button>
                    )}
                  </div>

                  {editing ? (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm text-gray-400 mb-2">Name</label>
                        <input
                          type="text"
                          value={editForm.name}
                          onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                          className="w-full bg-slate-900/50 border border-purple-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm text-gray-400 mb-2">Phone</label>
                        <input
                          type="tel"
                          value={editForm.phone}
                          onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
                          maxLength="10"
                          className="w-full bg-slate-900/50 border border-purple-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm text-gray-400 mb-2">Address Line 1</label>
                        <input
                          type="text"
                          value={editForm.addressLine1}
                          onChange={(e) => setEditForm({...editForm, addressLine1: e.target.value})}
                          className="w-full bg-slate-900/50 border border-purple-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm text-gray-400 mb-2">Address Line 2</label>
                        <input
                          type="text"
                          value={editForm.addressLine2}
                          onChange={(e) => setEditForm({...editForm, addressLine2: e.target.value})}
                          className="w-full bg-slate-900/50 border border-purple-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm text-gray-400 mb-2">Pincode</label>
                        <input
                          type="text"
                          value={editForm.pincode}
                          onChange={(e) => setEditForm({...editForm, pincode: e.target.value})}
                          maxLength="6"
                          className="w-full bg-slate-900/50 border border-purple-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500"
                        />
                      </div>

                      <div className="flex gap-3">
                        <button
                          onClick={handleUpdateProfile}
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-medium hover:from-pink-600 hover:to-purple-600 transition-all"
                        >
                          <Save className="w-4 h-4" />
                          Save Changes
                        </button>
                        <button
                          onClick={() => {
                            setEditing(false);
                            setEditForm({
                              name: user.name,
                              phone: user.phone,
                              addressLine1: user.address?.firstLine || "",
                              addressLine2: user.address?.secondLine || "",
                              pincode: user.address?.pincode || "",
                            });
                          }}
                          className="px-4 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg font-medium transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-slate-900/50 rounded-xl">
                        <div className="flex items-start gap-3">
                          <Phone className="w-5 h-5 text-pink-400 mt-0.5" />
                          <div>
                            <p className="text-xs text-gray-400 mb-1">Phone</p>
                            <p className="text-white font-medium">{user.phone}</p>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 bg-slate-900/50 rounded-xl md:col-span-2">
                        <div className="flex items-start gap-3">
                          <MapPin className="w-5 h-5 text-purple-400 mt-0.5" />
                          <div>
                            <p className="text-xs text-gray-400 mb-1">Address</p>
                            <p className="text-white font-medium">
                              {user.address?.firstLine 
                                ? `${user.address.firstLine}${user.address.secondLine ? ', ' + user.address.secondLine : ''}, PIN: ${user.address.pincode}`
                                : "Not provided"}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 bg-slate-900/50 rounded-xl md:col-span-2">
                        <div className="flex items-start gap-3">
                          <Calendar className="w-5 h-5 text-pink-400 mt-0.5" />
                          <div>
                            <p className="text-xs text-gray-400 mb-1">Member Since</p>
                            <p className="text-white font-medium">
                              {new Date(user.createdAt).toLocaleDateString("en-IN", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              })}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Change Password Section */}
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold flex items-center gap-2">
                      <Lock className="w-5 h-5 text-purple-400" />
                      Change Password
                    </h3>
                    {!changingPassword && (
                      <button
                        onClick={() => setChangingPassword(true)}
                        className="px-4 py-2 bg-purple-600/20 hover:bg-purple-600/30 rounded-lg transition-colors text-purple-400 font-medium text-sm"
                      >
                        Change Password
                      </button>
                    )}
                  </div>

                  {changingPassword && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm text-gray-400 mb-2">Current Password</label>
                        <input
                          type="password"
                          value={passwordForm.currentPassword}
                          onChange={(e) => setPasswordForm({...passwordForm, currentPassword: e.target.value})}
                          className="w-full bg-slate-900/50 border border-purple-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm text-gray-400 mb-2">New Password</label>
                        <input
                          type="password"
                          value={passwordForm.newPassword}
                          onChange={(e) => setPasswordForm({...passwordForm, newPassword: e.target.value})}
                          className="w-full bg-slate-900/50 border border-purple-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm text-gray-400 mb-2">Confirm New Password</label>
                        <input
                          type="password"
                          value={passwordForm.confirmPassword}
                          onChange={(e) => setPasswordForm({...passwordForm, confirmPassword: e.target.value})}
                          className="w-full bg-slate-900/50 border border-purple-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500"
                        />
                      </div>

                      <div className="flex gap-3">
                        <button
                          onClick={handleUpdatePassword}
                          className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-medium hover:from-pink-600 hover:to-purple-600 transition-all"
                        >
                          Update Password
                        </button>
                        <button
                          onClick={() => {
                            setChangingPassword(false);
                            setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
                          }}
                          className="px-4 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg font-medium transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === "notifications" && (
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">Notifications</h2>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllAsRead}
                      className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
                    >
                      Mark all as read
                    </button>
                  )}
                </div>

                {notifications.length === 0 ? (
                  <div className="text-center py-12">
                    <Bell className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400">No notifications yet</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {notifications.map((notification) => {
                      const NotifIcon = getNotificationIcon(notification.type);
                      const colorClass = getNotificationColor(notification.type);

                      return (
                        <div
                          key={notification._id}
                          className={`p-4 rounded-xl border transition-all cursor-pointer ${
                            notification.isRead
                              ? "bg-slate-900/30 border-purple-500/10"
                              : "bg-slate-900/50 border-purple-500/30"
                          }`}
                          onClick={() => !notification.isRead && markAsRead(notification._id)}
                        >
                          <div className="flex gap-4">
                            <div className={`p-2 rounded-lg ${colorClass} flex-shrink-0`}>
                              <NotifIcon className="w-5 h-5" />
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex justify-between items-start gap-2 mb-1">
                                <h4 className="font-semibold text-white">
                                  {notification.title}
                                </h4>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    deleteNotification(notification._id);
                                  }}
                                  className="p-1 hover:bg-red-600/20 rounded transition-colors text-gray-400 hover:text-red-400"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                              <p className="text-sm text-gray-400 mb-2">
                                {notification.message}
                              </p>
                              <div className="flex items-center gap-3 text-xs text-gray-500">
                                <span>{formatNotificationTime(notification.createdAt)}</span>
                                {!notification.isRead && (
                                  <span className="px-2 py-0.5 bg-purple-600/20 border border-purple-500/30 rounded-full text-purple-400">
                                    New
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;