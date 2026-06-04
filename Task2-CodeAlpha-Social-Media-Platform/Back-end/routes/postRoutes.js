import express from 'express';
import {createPost, deletePosts, getPosts, updatePost, toggleLike, addComment, deleteComment, updateComment} from '../controllers/postController.js';
import { protect } from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();
// post
router.post('/', protect,upload.single('image'), createPost);
router.get('/', getPosts);
router.delete('/:id', protect, deletePosts);
router.put('/:id', protect, updatePost);

// likes
router.post('/:id/like',protect, toggleLike);
// comments
router.post('/:id/comment', protect, addComment);
router.delete('/:id/comment/:commentId', protect, deleteComment);
router.put('/:id/comment/:commentId', protect, updateComment);


export default router;