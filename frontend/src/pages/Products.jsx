import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Search, ShoppingCart, Eye, Check } from "lucide-react";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [cart, setCart] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
    loadCartFromStorage();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [productRes, categoryRes] = await Promise.all([
        axios.get("https://sat-t2tn.onrender.com/api/product"),
        axios.get("https://sat-t2tn.onrender.com/api/category"),
      ]);
      setProducts(productRes.data);
      setAllProducts(productRes.data);
      setCategories(categoryRes.data);
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  const loadCartFromStorage = () => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  };

  const saveCartToStorage = (newCart) => {
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
    if (!categoryId) {
      setProducts(allProducts);
    } else {
      const filtered = allProducts.filter(
        (p) => p.category && p.category._id === categoryId
      );
      setProducts(filtered);
    }
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = allProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(term) ||
        (p.category?.name && p.category.name.toLowerCase().includes(term))
    );
    setProducts(filtered);
  };

  // ✅ NEW: Simple add to cart - just add product, quantity handled in cart page
  const handleAddToCart = (product) => {
    const newCart = { 
      ...cart, 
      [product._id]: { 
        ...product, 
        quantityText: "", // Will be filled in cart page
        addedAt: Date.now() 
      } 
    };
    setCart(newCart);
    saveCartToStorage(newCart);
  };

  const removeFromCart = (productId) => {
    const newCart = { ...cart };
    delete newCart[productId];
    setCart(newCart);
    saveCartToStorage(newCart);
  };

  const getTotalItems = () => {
    return Object.keys(cart).length;
  };

  const viewProductDetails = (productId) => {
    navigate(`/product/${productId}`);
  };

  const getUnitDisplay = (product) => {
    if (product.unitType === 'weight') {
      return `₹${product.pricePerUnit}/kg`;
    } else {
      return `₹${product.pricePerUnit}/piece`;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-black text-white pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Our Products
              </h1>
              <p className="text-gray-400 text-sm mt-1">Explore our premium collection</p>
            </div>
            
            {/* Cart Button */}
            <button
              onClick={() => navigate("/cart")}
              className="relative px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-semibold hover:from-pink-600 hover:to-purple-600 transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-purple-500/50"
            >
              <ShoppingCart className="w-5 h-5" />
              <span>Cart</span>
              {getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-2 w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center text-xs font-bold border-2 border-slate-900">
                  {getTotalItems()}
                </span>
              )}
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search products or categories..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full bg-slate-800/50 border border-purple-500/30 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="mb-8 overflow-x-auto scrollbar-hide">
          <div className="flex gap-3 pb-2">
            <button
              onClick={() => handleCategoryClick(null)}
              className={`flex-shrink-0 px-6 py-2 rounded-xl font-medium transition-all duration-300 ${
                selectedCategory === null
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                  : "bg-slate-800/50 text-gray-400 hover:bg-slate-800 border border-purple-500/20"
              }`}
            >
              All Products
            </button>

            {categories.map((cat) => (
              <button
                key={cat._id}
                onClick={() => handleCategoryClick(cat._id)}
                className={`flex-shrink-0 flex items-center gap-2 px-6 py-2 rounded-xl font-medium transition-all duration-300 ${
                  selectedCategory === cat._id
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                    : "bg-slate-800/50 text-gray-400 hover:bg-slate-800 border border-purple-500/20"
                }`}
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-6 h-6 rounded-full object-cover"
                />
                <span>{cat.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.length > 0 ? (
            products.map((product) => (
              <div
                key={product._id}
                className="group bg-slate-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/20"
              >
                {/* Product Image */}
                <div className="relative overflow-hidden aspect-square bg-slate-900">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <button
                    onClick={() => viewProductDetails(product._id)}
                    className="absolute top-3 right-3 p-2 bg-slate-900/80 backdrop-blur-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-slate-900"
                  >
                    <Eye className="w-5 h-5 text-purple-400" />
                  </button>
                  
                  {/* Category Badge */}
                  {product.category && (
                    <div className="absolute top-3 left-3 px-3 py-1 bg-purple-600/80 backdrop-blur-sm rounded-full text-xs font-medium">
                      {product.category.name}
                    </div>
                  )}

                  {/* Stock Status */}
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <span className="px-4 py-2 bg-red-600 rounded-lg font-semibold">
                        Out of Stock
                      </span>
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-1 text-white group-hover:text-purple-400 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-400 mb-3 line-clamp-2">
                    {product.description}
                  </p>
                  
                  {/* Price Display */}
                  <div className="mb-4">
                    <p className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                      {getUnitDisplay(product)}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {product.unitType === 'weight' ? 'Price per kilogram' : 'Price per piece'}
                    </p>
                  </div>

                  {/* Add to Cart Button */}
                  {cart[product._id] ? (
                    <div className="flex gap-2">
                      <button
                        onClick={() => navigate("/cart")}
                        className="flex-1 py-3 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg font-semibold hover:from-emerald-600 hover:to-green-600 transition-all duration-300 flex items-center justify-center gap-2"
                      >
                        <Check className="w-5 h-5" />
                        In Cart
                      </button>
                      <button
                        onClick={() => removeFromCart(product._id)}
                        className="px-4 py-3 bg-red-600/20 hover:bg-red-600/30 rounded-lg transition-colors text-red-400"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleAddToCart(product)}
                      disabled={!product.inStock}
                      className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-semibold hover:from-pink-600 hover:to-purple-600 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ShoppingCart className="w-5 h-5" />
                      Add to Cart
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-20">
              <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-10 h-10 text-gray-600" />
              </div>
              <p className="text-gray-400 text-lg">No products found</p>
              <p className="text-gray-500 text-sm mt-2">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;