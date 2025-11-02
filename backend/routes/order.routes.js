import express from 'express';
import {
  createOrder,
  getAllOrders,
  getMyOrders,
  getOrderById,
  updateOrderStatus,
  cancelOrder,
  getOrderStats
} from '../controllers/order.controllers.js';
import { protect, authorizeAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// All routes require authentication
router.use(protect);

// IMPORTANT: More specific routes MUST come before generic ones
// Admin routes (most specific first)
router.get('/admin/all', authorizeAdmin, getAllOrders);
router.get('/admin/stats', authorizeAdmin, getOrderStats);

// Customer specific routes (before /:id)
router.get('/my-orders', getMyOrders);
router.post('/', createOrder);

// Generic routes with parameters (last)
router.get('/:id', getOrderById);
router.patch('/:id/status', authorizeAdmin, updateOrderStatus);
router.patch('/:id/cancel', cancelOrder);

export default router;