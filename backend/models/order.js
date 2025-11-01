import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  productName: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  price: {
    type: Number,
    required: true
  },
  totalPrice: {
    type: Number,
    required: true
  }
});

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  orderItems: [orderItemSchema],
  
  // Scheduling Details
  scheduledDate: {
    type: Date,
    required: true
  },
  scheduledTime: {
    type: String,
    required: true
  },
  
  // Order Status
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'preparing', 'ready', 'completed', 'cancelled'],
    default: 'pending'
  },
  
  // Pricing
  subtotal: {
    type: Number,
    required: true
  },
  tax: {
    type: Number,
    default: 0
  },
  totalAmount: {
    type: Number,
    required: true
  },
  
  // Additional Info
  specialInstructions: {
    type: String,
    maxlength: 500
  },
  
  // Contact Info
  contactPhone: {
    type: String,
    required: true
  },
  contactEmail: {
    type: String,
    required: true
  },
  
  // Notifications
  adminNotified: {
    type: Boolean,
    default: false
  },
  customerNotified: {
    type: Boolean,
    default: false
  },
  
  // Timestamps for status changes
  confirmedAt: Date,
  readyAt: Date,
  completedAt: Date,
  
}, {
  timestamps: true
});

// Indexes for better query performance
orderSchema.index({ user: 1, createdAt: -1 });
orderSchema.index({ status: 1, scheduledDate: 1 });

// Virtual for order number
orderSchema.virtual('orderNumber').get(function() {
  return `ORD-${this._id.toString().slice(-8).toUpperCase()}`;
});

// Ensure virtuals are included in JSON
orderSchema.set('toJSON', { virtuals: true });
orderSchema.set('toObject', { virtuals: true });

const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);

export default Order;