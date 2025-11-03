import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, User, ShoppingBag, Clock, LogOut, Package } from "lucide-react";

const Navbar = ({ isLoggedIn = false, userRole = "client", onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [navigate]);

  const handleSignOut = () => {
    // Clear all authentication data
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userId');
    
    // Clear session storage as well
    sessionStorage.clear();
    
    // Close dropdown
    setIsDropdownOpen(false);
    setIsMenuOpen(false);
    
    // Call parent logout function if provided
    if (onLogout) {
      onLogout();
    }
    
    // Force reload and redirect to home
    window.location.href = '/';
  };

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/products", label: "Products" },
    { to: "/legacy", label: "Legacy" },
  ];

  return (
    <>
      <nav className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 text-white shadow-2xl sticky top-0 z-50 backdrop-blur-md bg-opacity-90 border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Left: Brand Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-md opacity-75 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Package className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-lg sm:text-xl font-bold tracking-tight bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent group-hover:from-pink-400 group-hover:to-purple-400 transition-all duration-300 hidden sm:block">
                  Shri Ashok Traders
                </span>
                <span className="text-xs text-purple-300 hidden lg:block">Premium Quality Since 1998</span>
                <span className="text-lg font-bold tracking-tight bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent block sm:hidden">
                  SAT
                </span>
              </div>
            </Link>

            {/* Center: Nav Links (hidden on mobile) */}
            <div className="hidden md:flex space-x-1 lg:space-x-2">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="relative px-4 py-2 text-sm font-medium text-gray-200 hover:text-white transition-colors duration-200 group"
                >
                  <span className="relative z-10">{link.label}</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-purple-600/0 via-purple-600/50 to-pink-600/0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-3/4 transition-all duration-300"></span>
                </Link>
              ))}
            </div>

            {/* Right: User Section */}
            <div className="flex items-center gap-3">
              {isLoggedIn ? (
                <div className="relative" ref={dropdownRef}>
                  <button
                    className="relative flex items-center justify-center w-10 h-10 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-full hover:from-purple-500/50 hover:to-pink-500/50 hover:scale-110 transition-all duration-300 ring-2 ring-purple-400/50 hover:ring-pink-400/50"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    aria-label="User menu"
                  >
                    <User className="w-5 h-5" />
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-slate-900 animate-pulse"></span>
                  </button>

                  {/* Dropdown Menu */}
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-3 w-56 bg-slate-800 text-white rounded-2xl shadow-2xl py-2 z-50 border border-purple-500/30 backdrop-blur-xl animate-fadeIn">
                      <div className="px-4 py-3 border-b border-purple-500/20 bg-gradient-to-r from-purple-900/30 to-pink-900/30">
                        <p className="text-xs text-purple-300 uppercase tracking-wider font-semibold">
                          {userRole === "admin" ? "👑 Admin Panel" : "👤 Client Area"}
                        </p>
                      </div>
                      <Link
                        to="/profile"
                        className="flex items-center gap-3 px-4 py-3 hover:bg-purple-900/30 transition-all duration-150 group"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <div className="p-1.5 bg-purple-500/20 rounded-lg group-hover:bg-purple-500/30 transition-colors">
                          <User className="w-4 h-4 text-purple-400" />
                        </div>
                        <span className="text-sm font-medium">My Profile</span>
                      </Link>
                      {isLoggedIn && userRole === "client" && (
                        <Link
                          to="/my-orders"
                          className="flex items-center gap-3 px-4 py-3 hover:bg-purple-900/30 transition-all duration-150 group"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          <div className="p-1.5 bg-pink-500/20 rounded-lg group-hover:bg-pink-500/30 transition-colors">
                            <Clock className="w-4 h-4 text-pink-400" />
                          </div>
                          <span className="text-sm font-medium">My Orders</span>
                        </Link>
                      )}
                      <div className="border-t border-purple-500/20 mt-1">
                        <button
                          onClick={handleSignOut}
                          className="flex items-center gap-3 w-full text-left px-4 py-3 hover:bg-red-900/30 transition-all duration-150 text-red-400 group"
                        >
                          <div className="p-1.5 bg-red-500/20 rounded-lg group-hover:bg-red-500/30 transition-colors">
                            <LogOut className="w-4 h-4" />
                          </div>
                          <span className="text-sm font-medium">Sign Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to="/login"
                  className="hidden md:block relative px-6 py-2.5 rounded-xl font-semibold text-sm overflow-hidden group"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 group-hover:from-pink-600 group-hover:to-purple-600 transition-all duration-300"></span>
                  <span className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300"></span>
                  <span className="relative text-white flex items-center gap-2">
                    Sign In
                    <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                  </span>
                </Link>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden focus:outline-none hover:bg-purple-500/20 p-2 rounded-lg transition-all duration-200 border border-purple-500/30"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-slate-900/95 backdrop-blur-md text-white px-4 pb-4 space-y-2 shadow-2xl border-t border-purple-500/20 animate-slideDown">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="block py-3 px-4 rounded-xl hover:bg-purple-900/30 transition-all duration-200 border border-purple-500/20 hover:border-purple-500/40"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            
            {/* Show Sign In button only when NOT logged in */}
            {!isLoggedIn && (
              <Link
                to="/login"
                className="block mt-4 py-3 px-4 text-center rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 font-semibold hover:from-pink-600 hover:to-purple-600 shadow-lg transform hover:scale-105 transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign In
              </Link>
            )}
          </div>
        )}
      </nav>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            max-height: 0;
          }
          to {
            opacity: 1;
            max-height: 500px;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }

        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default Navbar;