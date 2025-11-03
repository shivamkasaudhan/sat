// controllers/order.controllers.js - UPDATED WITHOUT TAX
import Order from '../models/order.js';
import Notification from '../models/notification.js';
import Product from '../models/Product.js';
import User from '../models/user.js';

// Create Order (from cart or single product)
export const createOrder = async (req, res) => {
  try {
    const {
      orderItems,
      scheduledDate,
      scheduledTime,
      specialInstructions,
      deliveryAddress
    } = req.body;

    // Validate order items
    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'No items in order' 
      });
    }

    // // Validate scheduled date
    // const scheduled = new Date(scheduledDate);
    // if (scheduled < new Date()) {
    //   return res.status(400).json({ 
    //     success: false, 
    //     message: 'Scheduled date must be in the future' 
    //   });
    // }

    // Calculate totals and validate products
    let totalAmount = 0;
    const validatedItems = [];

    for (const item of orderItems) {
      const product = await Product.findById(item.product);
      
      if (!product) {
        return res.status(404).json({ 
          success: false, 
          message: `Product not found: ${item.product}` 
        });
      }

      // Parse quantity value
      const quantityValue = parseFloat(item.quantityValue);
      
      if (isNaN(quantityValue) || quantityValue <= 0) {
        return res.status(400).json({ 
          success: false,
          message: `Invalid quantity for ${product.name}` 
        });
      }

      // Calculate price based on unit
      let itemPrice;
      if (item.unit === 'kg') {
        itemPrice = product.pricePerUnit * quantityValue;
      } else if (item.unit === 'gram') {
        itemPrice = (product.pricePerUnit / 1000) * quantityValue;
      } else if (item.unit === 'piece') {
        itemPrice = product.pricePerUnit * quantityValue;
      } else {
        return res.status(400).json({ 
          success: false,
          message: `Invalid unit type: ${item.unit}` 
        });
      }

      totalAmount += itemPrice;

      validatedItems.push({
        product: product._id,
        productName: product.name,
        quantityText: item.quantityText,
        quantityValue: quantityValue,
        unit: item.unit,
        price: product.pricePerUnit,
        totalPrice: itemPrice,
        image: product.image
      });
    }

    // Get user details
    const user = await User.findById(req.user.id);

    // Create order (NO TAX CALCULATION)
    const order = await Order.create({
      user: req.user.id,
      orderItems: validatedItems,
      scheduledDate,
      scheduledTime,
      specialInstructions,
      contactPhone: user.phone,
      contactName: user.name,
      deliveryAddress: deliveryAddress || user.address,
      subtotal: totalAmount,
      totalAmount: totalAmount, // No tax added
      status: 'pending'
    });

    // Populate order details
    await order.populate('user', 'name phone');
    await order.populate('orderItems.product');

    // Notify all admins
    const admins = await User.find({ role: 'admin' });
    
    const adminNotifications = admins.map(admin => ({
      recipient: admin._id,
      recipientType: 'admin',
      type: 'order_placed',
      order: order._id,
      title: 'New Order Received',
      message: `New order ${order.orderNumber} from ${user.name} scheduled for ${new Date(scheduledDate).toLocaleDateString()} at ${scheduledTime}`
    }));

    if (adminNotifications.length > 0) {
      await Notification.insertMany(adminNotifications);
      order.adminNotified = true;
      await order.save();
    }

    res.status(201).json({
      success: true,
      message: 'Order placed successfully',
      order
    });

  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to create order',
      error: error.message 
    });
  }
};

// Get all orders (Admin)
export const getAllOrders = async (req, res) => {
  try {
    const { status, date, page = 1, limit = 10 } = req.query;
    
    const query = {};
    if (status) query.status = status;
    if (date) {
      const startDate = new Date(date);
      startDate.setHours(0, 0, 0, 0);
      const endDate = new Date(date);
      endDate.setHours(23, 59, 59, 999);
      query.scheduledDate = { $gte: startDate, $lte: endDate };
    }

    const orders = await Order.find(query)
      .populate('user', 'name phone')
      .populate('orderItems.product')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await Order.countDocuments(query);

    res.status(200).json({
      success: true,
      orders,
      totalPages: Math.ceil(count / limit),
      currentPage: Number(page),
      total: count
    });

  } catch (error) {
    console.error('Get all orders error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch orders',
      error: error.message 
    });
  }
};

// Get user's orders
export const getMyOrders = async (req, res) => {
  try {
    const { status } = req.query;
    
    const query = { user: req.user.id };
    if (status) query.status = status;

    const orders = await Order.find(query)
      .populate('orderItems.product')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      orders
    });

  } catch (error) {
    console.error('Get my orders error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch orders',
      error: error.message 
    });
  }
};

// Get single order
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user', 'name phone')
      .populate('orderItems.product');

    if (!order) {
      return res.status(404).json({ 
        success: false, 
        message: 'Order not found' 
      });
    }

    // Check if user has permission to view this order
    if (req.user.role !== 'admin' && order.user._id.toString() !== req.user.id.toString()) {
      return res.status(403).json({ 
        success: false, 
        message: 'Not authorized to view this order' 
      });
    }

    res.status(200).json({
      success: true,
      order
    });

  } catch (error) {
    console.error('Get order by ID error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch order',
      error: error.message 
    });
  }
};

// Update order status (Admin only)
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id).populate('user', 'name phone');

    if (!order) {
      return res.status(404).json({ 
        success: false, 
        message: 'Order not found' 
      });
    }

    const oldStatus = order.status;
    order.status = status;

    // Update timestamps based on status
    if (status === 'confirmed') {
      order.confirmedAt = new Date();
    } else if (status === 'ready') {
      order.readyAt = new Date();
      
      // Notify customer that order is ready
      await Notification.create({
        recipient: order.user._id,
        recipientType: 'user',
        type: 'order_ready',
        order: order._id,
        title: 'Order Ready for Pickup',
        message: `Your order ${order.orderNumber} is ready for pickup!`
      });

      order.customerNotified = true;

    } else if (status === 'completed') {
      order.completedAt = new Date();
    }

    await order.save();

    res.status(200).json({
      success: true,
      message: `Order status updated from ${oldStatus} to ${status}`,
      order
    });

  } catch (error) {
    console.error('Update order status error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to update order status',
      error: error.message 
    });
  }
};

// Cancel order
export const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ 
        success: false, 
        message: 'Order not found' 
      });
    }

    // Check permissions
    const isOwner = order.user.toString() === req.user.id.toString();
    const isAdmin = req.user.role === 'admin';

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ 
        success: false, 
        message: 'Not authorized to cancel this order' 
      });
    }

    // Can't cancel if already preparing or completed
    if (['preparing', 'ready', 'completed'].includes(order.status)) {
      return res.status(400).json({ 
        success: false, 
        message: `Cannot cancel order with status: ${order.status}` 
      });
    }

    order.status = 'cancelled';
    await order.save();

    // Notify the other party
    if (isAdmin) {
      await Notification.create({
        recipient: order.user,
        recipientType: 'user',
        type: 'order_cancelled',
        order: order._id,
        title: 'Order Cancelled',
        message: `Your order ${order.orderNumber} has been cancelled by admin`
      });
    } else {
      // Notify admins
      const admins = await User.find({ role: 'admin' });
      const adminNotifications = admins.map(admin => ({
        recipient: admin._id,
        recipientType: 'admin',
        type: 'order_cancelled',
        order: order._id,
        title: 'Order Cancelled',
        message: `Order ${order.orderNumber} has been cancelled by customer`
      }));
      
      if (adminNotifications.length > 0) {
        await Notification.insertMany(adminNotifications);
      }
    }

    res.status(200).json({
      success: true,
      message: 'Order cancelled successfully',
      order
    });

  } catch (error) {
    console.error('Cancel order error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to cancel order',
      error: error.message 
    });
  }
};

// Get order statistics (Admin)
export const getOrderStats = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const stats = await Order.aggregate([
      {
        $facet: {
          statusCounts: [
            { $group: { _id: '$status', count: { $sum: 1 } } }
          ],
          todayOrders: [
            { $match: { scheduledDate: { $gte: today } } },
            { $count: 'count' }
          ],
          totalRevenue: [
            { $match: { status: { $ne: 'cancelled' } } },
            { $group: { _id: null, total: { $sum: '$totalAmount' } } }
          ],
          recentOrders: [
            { $sort: { createdAt: -1 } },
            { $limit: 5 },
            { 
              $lookup: {
                from: 'users',
                localField: 'user',
                foreignField: '_id',
                as: 'user'
              }
            },
            { $unwind: '$user' }
          ]
        }
      }
    ]);

    res.status(200).json({
      success: true,
      stats: stats[0]
    });

  } catch (error) {
    console.error('Get order stats error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch order statistics',
      error: error.message 
    });
  }
};