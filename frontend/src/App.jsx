import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import MyOrders from "./pages/MyOrders";
import OrderDetails from "./pages/OrderDetails";
import Profile from "./pages/Profile";
import Legacy from "./pages/Legacy";
import Login from "./pages/Login";
import SignUp from "./pages/signup";
import AdminDashboard from "./pages/AdminDashboard";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import FAQ from "./pages/Faq";
import TermsAndConditions from "./pages/TermsAndConditions";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("user");

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = () => {
    const token = localStorage.getItem("token");
    
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const now = Date.now() / 1000; // in seconds
        
        if (decoded.exp > now) {
          // Token is valid
          setIsLoggedIn(true);
          
          // Get role from multiple sources (fallback chain)
          const role = decoded.role || localStorage.getItem("userRole") || "user";
          setUserRole(role);
          
          console.log("✅ Auth Status:", { isLoggedIn: true, role }); // Debug log
        } else {
          // Token expired
          console.log("❌ Token expired");
          handleLogout();
        }
      } catch (err) {
        // Invalid token
        console.error("❌ Invalid token:", err);
        handleLogout();
      }
    } else {
      console.log("❌ No token found");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userId");
    localStorage.removeItem("cart"); // Also clear cart on logout
    setIsLoggedIn(false);
    setUserRole("user");
  };

  // Protected Route Component
  const ProtectedRoute = ({ children, adminOnly = false }) => {
    if (!isLoggedIn) {
      return <Navigate to="/login" replace />;
    }
    if (adminOnly && userRole !== "admin") {
      console.log("⚠️ Access denied. Role:", userRole);
      return <Navigate to="/" replace />;
    }
    return children;
  };

  // Layout wrapper component
  const Layout = ({ children }) => (
    <div className="flex flex-col min-h-screen">
      <Navbar isLoggedIn={isLoggedIn} userRole={userRole} onLogout={handleLogout} />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );

  return (
    <Router>
      <Routes>
        {/* Public Routes with Layout */}
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        
        <Route
          path="/products"
          element={
            <Layout>
              <Products />
            </Layout>
          }
        />
        
        <Route
          path="/product/:id"
          element={
            <Layout>
              <ProductDetails />
            </Layout>
          }
        />
        
        <Route
          path="/cart"
          element={
            <Layout>
              <Cart />
            </Layout>
          }
        />
        
        <Route
          path="/legacy"
          element={
            <Layout>
              <Legacy />
            </Layout>
          }
        />
<Route path="/privacy" element={<Layout><PrivacyPolicy /></Layout>} />
<Route path="/faqs" element={<Layout><FAQ /></Layout>} />
<Route path="/terms" element={<Layout><TermsAndConditions /></Layout>} />
        {/* Auth Routes without Layout */}
        <Route
          path="/login"
          element={
            isLoggedIn ? (
              <Navigate to={userRole === "admin" ? "/admin/dashboard" : "/"} replace />
            ) : (
              <Login setIsLoggedIn={setIsLoggedIn} setUserRole={setUserRole} />
            )
          }
        />
        
        <Route
          path="/signup"
          element={
            isLoggedIn ? (
              <Navigate to="/" replace />
            ) : (
              <SignUp />
            )
          }
        />

        {/* Protected Customer Routes */}
        <Route
          path="/my-orders"
          element={
            <ProtectedRoute>
              <Layout>
                <MyOrders />
              </Layout>
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/order/:id"
          element={
            <ProtectedRoute>
              <Layout>
                <OrderDetails />
              </Layout>
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Layout>
                <Profile />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Protected Admin Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute adminOnly={true}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* 404 Page */}
        <Route
          path="*"
          element={
            <Layout>
              <div className="min-h-screen bg-gradient-to-b from-slate-900 to-black flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
                    404
                  </h1>
                  <p className="text-gray-400 text-xl mb-6">Page not found</p>
                  <a
                    href="/"
                    className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-semibold hover:from-pink-600 hover:to-purple-600 transition-all duration-300 inline-block"
                  >
                    Go Home
                  </a>
                </div>
              </div>
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;