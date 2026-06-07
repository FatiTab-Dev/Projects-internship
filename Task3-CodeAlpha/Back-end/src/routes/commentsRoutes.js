import express from 'express';
import auth from '../middleware/auth.js';
import {
  createComment,
  getComment,
  deleteComment,
} from '../controllers/commentController.js';

const router = express.Router();

// add comment task
router.post('/', auth, createComment);
// get comment task
router.get('/:taskId', auth, getComment);
// delete comment
router.delete('/:id', auth, deleteComment);

export default router;
