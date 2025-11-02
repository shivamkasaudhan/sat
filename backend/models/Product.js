// models/Product.js
import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: true 
    },
    price: { 
      type: Number, 
      required: true 
    },
    description: { 
      type: String, 
      required: true 
    },
    image: { 
      type: String, 
      required: true 
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    // ✅ NEW: Unit type configuration
    unitType: {
      type: String,
      enum: ['piece', 'weight'], // piece or weight
      default: 'piece',
      required: true
    },
    // ✅ NEW: For weight-based products, price per kg
    // For piece-based products, price per piece
    pricePerUnit: {
      type: Number,
      required: true
    },
    // ✅ NEW: Available units for selection
    availableUnits: {
      type: [String],
      default: function() {
        return this.unitType === 'weight' ? ['gram', 'kg'] : ['piece'];
      }
    },
    // ✅ NEW: Stock availability (optional)
    inStock: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

// Virtual for display price (can be used for showing base price)
productSchema.virtual('displayPrice').get(function() {
  if (this.unitType === 'weight') {
    return `₹${this.pricePerUnit}/kg`;
  } else {
    return `₹${this.pricePerUnit}/piece`;
  }
});

// Ensure virtuals are included in JSON
productSchema.set('toJSON', { virtuals: true });
productSchema.set('toObject', { virtuals: true });

const Product = mongoose.model("Product", productSchema);
export default Product;