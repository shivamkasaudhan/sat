import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  ArrowLeft,
  ShoppingCart,
  Plus,
  Minus,
  Package,
  Tag,
  Loader,
  AlertCircle,
} from "lucide-react";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState({});

  useEffect(() => {
    fetchProduct();
    loadCart();
  }, [id]);

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

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await axios.get("https://sat-t2tn.onrender.com/api/product");
      const products = response.data;
      
      const currentProduct = products.find((p) => p._id === id);
      setProduct(currentProduct);

      // Get related products from same category
      if (currentProduct) {
        const related = products
          .filter(
            (p) =>
              p.category?._id === currentProduct.category?._id &&
              p._id !== currentProduct._id
          )
          .slice(0, 4);
        setRelatedProducts(related);
      }
    } catch (err) {
      console.error("Fetch product error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (!product) return;

    const newCart = {
      ...cart,
      [product._id]: {
        ...product,
        quantity: cart[product._id]
          ? cart[product._id].quantity + quantity
          : quantity,
      },
    };
    saveCart(newCart);
    setQuantity(1);
  };

  const isInCart = cart[id];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-black flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 text-purple-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading product...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-black flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Product Not Found</h2>
          <p className="text-gray-400 mb-6">The product you're looking for doesn't exist</p>
          <button
            onClick={() => navigate("/products")}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-semibold hover:from-pink-600 hover:to-purple-600 transition-all"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-black text-white pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Button */}
        <button
          onClick={() => navigate("/products")}
          className="flex items-center gap-2 mb-8 text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Products</span>
        </button>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          
          {/* Product Image */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-3xl p-8 border border-purple-500/20">
            <div className="aspect-square bg-slate-900 rounded-2xl overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            {/* Category Badge */}
            {product.category && (
              <div className="flex items-center gap-2 mb-4">
                <Tag className="w-4 h-4 text-purple-400" />
                <span className="px-4 py-1 bg-purple-600/20 border border-purple-500/30 rounded-full text-sm text-purple-400 font-medium">
                  {product.category.name}
                </span>
              </div>
            )}

            {/* Product Name */}
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {product.name}
            </h1>

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  ₹{product.price}
                </span>
                <span className="text-gray-400 text-lg">/ unit</span>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8 p-6 bg-slate-800/30 rounded-2xl border border-purple-500/10">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Package className="w-5 h-5 text-purple-400" />
                Product Description
              </h3>
              <p className="text-gray-300 leading-relaxed">{product.description}</p>
            </div>

            {/* Quantity Selector */}
            <div className="mb-6">
              <label className="block text-sm text-gray-400 mb-3">Quantity</label>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 bg-slate-800/50 rounded-xl p-2 border border-purple-500/20">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 hover:bg-slate-700 rounded-lg transition-colors"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  <span className="px-8 text-2xl font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 hover:bg-slate-700 rounded-lg transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex-1 p-4 bg-slate-800/30 rounded-xl border border-purple-500/10">
                  <p className="text-sm text-gray-400 mb-1">Subtotal</p>
                  <p className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    ₹{(product.price * quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              {isInCart ? (
                <button
                  onClick={() => navigate("/cart")}
                  className="flex-1 py-4 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl font-bold text-lg hover:from-emerald-600 hover:to-green-600 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-green-500/50"
                >
                  <ShoppingCart className="w-6 h-6" />
                  View Cart ({cart[id].quantity})
                </button>
              ) : (
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold text-lg hover:from-pink-600 hover:to-purple-600 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-purple-500/50"
                >
                  <ShoppingCart className="w-6 h-6" />
                  Add to Cart
                </button>
              )}
            </div>

            {/* Additional Info */}
            <div className="mt-6 p-4 bg-purple-600/10 border border-purple-500/30 rounded-xl">
              <p className="text-sm text-purple-300">
                ✨ Free pickup available • Schedule your order at checkout
              </p>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Related Products
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <div
                  key={relatedProduct._id}
                  onClick={() => navigate(`/product/${relatedProduct._id}`)}
                  className="group bg-slate-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/20 cursor-pointer"
                >
                  {/* Image */}
                  <div className="relative overflow-hidden aspect-square bg-slate-900">
                    <img
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  {/* Info */}
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-1 text-white group-hover:text-purple-400 transition-colors line-clamp-1">
                      {relatedProduct.name}
                    </h3>
                    <p className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                      ₹{relatedProduct.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;