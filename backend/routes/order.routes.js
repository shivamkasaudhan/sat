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

// Customer routes
router.post('/', createOrder);
router.get('/my-orders', getMyOrders);
router.get('/:id', getOrderById);
router.patch('/:id/cancel', cancelOrder);

// Admin only routes
router.get('/admin/all', authorizeAdmin, getAllOrders);
router.get('/admin/stats', authorizeAdmin, getOrderStats);
router.patch('/:id/status', authorizeAdmin, updateOrderStatus);

export default router;