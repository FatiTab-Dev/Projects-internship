import express from 'express';
import auth from '../middleware/auth.js';
import {
  getNotification,
  markAsRead,
} from '../controllers/notificationController.js';

const router = express.Router();

//get Notifications
router.get('/', auth, getNotification);
// mark as Read
router.put('/:id', auth, markAsRead);

export default router;
