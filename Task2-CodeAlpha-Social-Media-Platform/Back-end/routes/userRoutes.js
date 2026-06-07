import express from 'express';
import {
  register,
  login,
  updateProfile,
  getUserProfile,
  toggleFollow,
  getFollowers,
  getFollowing,
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

router.put('/profile', protect, upload.single('image'), updateProfile);

router.get('/:userId', getUserProfile);
router.post('/:userId/follow', protect, toggleFollow);
router.get('/:userId/followers', protect, getFollowers);
router.get('/:userId/following', protect, getFollowing);

export default router;
