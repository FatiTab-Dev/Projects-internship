import express from 'express';
import { register, login, updateProfile} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

router.put('/profile', protect, upload.single('image'), updateProfile);

export default router;