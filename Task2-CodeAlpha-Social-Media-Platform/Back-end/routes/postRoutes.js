import express from 'express';
import {createPost, deletePosts, getPosts, updatePost} from '../controllers/postController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();
router.post('/', protect, createPost);
router.get('/', getPosts);
router.delete('/:id', protect, deletePosts);
router.put('/:id', protect, updatePost);


export default router;