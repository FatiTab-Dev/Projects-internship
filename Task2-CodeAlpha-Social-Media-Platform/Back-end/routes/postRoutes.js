import express from 'express';
import {createPost, deletePosts, getPosts} from '../controllers/postController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();
router.post('/', protect, createPost);
router.get('/', getPosts);
router.delete('/:id', protect, deletePosts);


export default router;