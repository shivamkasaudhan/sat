import Notification from '../models/notification.js';

// Get user notifications
export const getMyNotifications = async (req, res) => {
  try {
    const { page = 1, limit = 20, unreadOnly = false } = req.query;
    
    const query = { recipient: req.user.id };
    if (unreadOnly === 'true') {
      query.isRead = false;
    }

    const notifications = await Notification.find(query)
      .populate('order', 'orderNumber status scheduledDate scheduledTime')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await Notification.countDocuments(query);
    const unreadCount = await Notification.countDocuments({ 
      recipient: req.user.id, 
      isRead: false 
    });

    res.status(200).json({
      success: true,
      notifications,
      unreadCount,
      totalPages: Math.ceil(count / limit),
      currentPage: Number(page),
      total: count
    });

  } catch (error) {
    console.error('Get notifications error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch notifications',
      error: error.message 
    });
  }
};

// Mark notification as read
export const markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);

    if (!notification) {
      return res.status(404).json({ 
        success: false, 
        message: 'Notification not found' 
      });
    }

    // Check if user owns this notification
    if (notification.recipient.toString() !== req.user.id.toString()) {
      return res.status(403).json({ 
        success: false, 
        message: 'Not authorized' 
      });
    }

    notification.isRead = true;
    notification.readAt = new Date();
    await notification.save();

    res.status(200).json({
      success: true,
      message: 'Notification marked as read',
      notification
    });

  } catch (error) {
    console.error('Mark as read error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to update notification',
      error: error.message 
    });
  }
};

// Mark all notifications as read
export const markAllAsRead = async (req, res) => {
  try {
    await Notification.updateMany(
      { recipient: req.user.id, isRead: false },
      { isRead: true, readAt: new Date() }
    );

    res.status(200).json({
      success: true,
      message: 'All notifications marked as read'
    });

  } catch (error) {
    console.error('Mark all as read error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to update notifications',
      error: error.message 
    });
  }
};

// Delete notification
export const deleteNotification = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);

    if (!notification) {
      return res.status(404).json({ 
        success: false, 
        message: 'Notification not found' 
      });
    }

    // Check if user owns this notification
    if (notification.recipient.toString() !== req.user.id.toString()) {
      return res.status(403).json({ 
        success: false, 
        message: 'Not authorized' 
      });
    }

    await notification.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Notification deleted'
    });

  } catch (error) {
    console.error('Delete notification error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to delete notification',
      error: error.message 
    });
  }
};

// Get unread count
export const getUnreadCount = async (req, res) => {
  try {
    const count = await Notification.countDocuments({ 
      recipient: req.user.id, 
      isRead: false 
    });

    res.status(200).json({
      success: true,
      unreadCount: count
    });

  } catch (error) {
    console.error('Get unread count error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to get unread count',
      error: error.message 
    });
  }
};