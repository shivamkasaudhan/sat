import express from 'express';
import {
  getMyNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  getUnreadCount
} from '../controllers/notification.controller.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// All routes require authentication
router.use(protect);

router.get('/', getMyNotifications);
router.get('/unread-count', getUnreadCount);
router.patch('/:id/read', markAsRead);
router.patch('/read-all', markAllAsRead);
router.delete('/:id', deleteNotification);

export default router;