import Notification from '../models/Notification.js';

// get notifications
export const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ recipient: req.user._id })
      .populate('sender', 'name profilePicture')
      .populate('post', 'text')
      .sort({ createdAt: -1 })
      .limit(20);
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching notifications' });
  }
};

// get unread count
export const getUnreadCount = async (req, res) => {
  try {
    const count = await Notification.countDocuments({
      recipient: req.user._id,
      read: false
    });
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching count' });
  }
};

// mark all as read
export const markAllRead = async (req, res) => {
  try {
    await Notification.updateMany(
      { recipient: req.user._id, read: false },
      { read: true }
    );
    res.status(200).json({ message: 'All marked as read' });
  } catch (error) {
    res.status(500).json({ message: 'Error marking notifications' });
  }
};