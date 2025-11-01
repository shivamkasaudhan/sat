import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  recipientType: {
    type: String,
    enum: ['admin', 'user'],
    required: true
  },
  
  type: {
    type: String,
    enum: ['order_placed', 'order_ready', 'order_confirmed', 'order_cancelled'],
    required: true
  },
  
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true
  },
  
  title: {
    type: String,
    required: true
  },
  
  message: {
    type: String,
    required: true
  },
  
  isRead: {
    type: Boolean,
    default: false
  },
  
  readAt: Date
  
}, {
  timestamps: true
});

// Indexes
notificationSchema.index({ recipient: 1, isRead: 1, createdAt: -1 });

const Notification = mongoose.model('Notification', notificationSchema);

export default Notification;