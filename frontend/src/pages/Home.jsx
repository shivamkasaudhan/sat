import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  ShoppingCart,
  Package,
  Clock,
  Shield,
  Star,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  TrendingUp,
  Users,
  Award,
} from "lucide-react";

const Home = () => {
  const [recentProducts, setRecentProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [productRes, categoryRes] = await Promise.all([
        axios.get("https://sat-t2tn.onrender.com/api/product"),
        axios.get("https://sat-t2tn.onrender.com/api/category"),
      ]);

      // Filter products added in last 7 days
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

      const recent = productRes.data
        .filter((p) => new Date(p.createdAt) >= sevenDaysAgo)
        .slice(0, 12);

      setRecentProducts(recent);
      setCategories(categoryRes.data);
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(recentProducts.length / 3));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? Math.ceil(recentProducts.length / 3) - 1 : prev - 1
    );
  };

  const features = [
    {
      icon: Clock,
      title: "Easy Scheduling",
      description: "Schedule your pickup at your convenience",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Shield,
      title: "Quality Assured",
      description: "Premium products with guaranteed quality",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Package,
      title: "Reasonable Price",
      description: "Best and Competive price",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Award,
      title: "Trusted Since 1998",
      description: "25+ years of excellence and service",
      color: "from-orange-500 to-red-500",
    },
  ];

  const testimonials = [
    {
      name: "Rajesh Kumar",
      role: "Business Owner",
      content: "Excellent service! The scheduling system makes ordering so convenient. Highly recommended!",
      rating: 5,
    },
    {
      name: "Priya Sharma",
      role: "Regular Customer",
      content: "Quality products and timely delivery. SAT has been my go-to supplier for years.",
      rating: 5,
    },
    {
      name: "Amit Patel",
      role: "Retailer",
      content: "Professional service and great product range. The online ordering system is fantastic!",
      rating: 5,
    },
  ];

  const stats = [
    { icon: Users, value: "10K+", label: "Happy Customers" },
    { icon: Package, value: "50K+", label: "Orders Delivered" },
    { icon: Star, value: "4.9", label: "Average Rating" },
    { icon: TrendingUp, value: "30+", label: "Years Experience" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-black text-white">
      
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 blur-3xl"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="text-center space-y-6">
            <div className="inline-block">
              <span className="px-4 py-2 bg-purple-600/20 border border-purple-500/30 rounded-full text-sm font-medium text-purple-300 backdrop-blur-sm">
                ✨ Premium Quality Since 1998
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                Shri Ashok Traders
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
              Your trusted partner for quality products with easy scheduling and reliable service
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <button
                onClick={() => navigate("/products")}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-semibold text-lg hover:from-pink-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-purple-500/50"
              >
                Browse Products
              </button>
              <button
                onClick={() => navigate("/legacy")}
                className="px-8 py-4 bg-slate-800/50 border border-purple-500/30 rounded-xl font-semibold text-lg hover:bg-slate-800 transition-all duration-300"
              >
                Our Legacy
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* New Arrivals Slider */}
      {recentProducts.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                New Arrivals
              </h2>
              <p className="text-gray-400">Recently added products just for you</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={prevSlide}
                className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextSlide}
                className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {Array.from({ length: Math.ceil(recentProducts.length / 3) }).map((_, slideIdx) => (
                <div key={slideIdx} className="min-w-full grid grid-cols-1 md:grid-cols-3 gap-6">
                  {recentProducts.slice(slideIdx * 3, slideIdx * 3 + 3).map((product) => (
                    <div
                      key={product._id}
                      onClick={() => navigate(`/product/${product._id}`)}
                      className="group relative bg-slate-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-purple-500/20 hover:border-purple-500/50 transition-all cursor-pointer"
                    >
                      {/* NEW Badge */}
                      <div className="absolute top-3 left-3 z-10 flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full text-xs font-bold shadow-lg">
                        <Sparkles className="w-3 h-3" />
                        NEW
                      </div>

                      <div className="aspect-square bg-slate-900 overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>

                      <div className="p-4">
                        <h3 className="font-semibold text-lg mb-1 text-white group-hover:text-purple-400 transition-colors">
                          {product.name}
                        </h3>
                        <p className="text-sm text-gray-400 mb-2 line-clamp-2">
                          {product.description}
                        </p>
                        <div className="flex justify-between items-center">
                          <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                            ₹{product.price}
                          </span>
                          <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors text-sm font-medium">
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Shop by Category */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
            Shop by Category
          </h2>
          <p className="text-gray-400">Browse our wide range of product categories</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div
              key={category._id}
              onClick={() => navigate(`/products?category=${category._id}`)}
              className="group relative bg-slate-800/30 backdrop-blur-sm rounded-2xl overflow-hidden border border-purple-500/20 hover:border-purple-500/50 transition-all cursor-pointer"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end">
                <div className="p-4 w-full">
                  <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">
                    {category.name}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
            Why Choose Us
          </h2>
          <p className="text-gray-400">Experience the SAT difference</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all group"
              >
                <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-400">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Testimonials */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
            What Our Customers Say
          </h2>
          <p className="text-gray-400">Trusted by thousands of satisfied customers</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, idx) => (
            <div
              key={idx}
              className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all"
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-300 mb-4 italic">"{testimonial.content}"</p>
              <div>
                <p className="font-semibold">{testimonial.name}</p>
                <p className="text-sm text-gray-400">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-3xl p-12 text-center border border-purple-500/30">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers and experience the convenience of easy scheduling
          </p>
          <button
            onClick={() => navigate("/products")}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-semibold text-lg hover:from-pink-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-purple-500/50"
          >
            Start Shopping Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;