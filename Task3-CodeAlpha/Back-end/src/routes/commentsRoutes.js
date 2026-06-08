import express from 'express';
import auth from '../middleware/auth.js';
import {
  createComment,
  getComment,
  deleteComment,
  updateComment,
} from '../controllers/commentController.js';

const router = express.Router();

// add comment task
router.post('/', auth, createComment);
// get comment task
router.get('/:taskId', auth, getComment);
// update comment
router.put('/:id', auth, updateComment);
// delete comment
router.delete('/:id', auth, deleteComment);

export default router;
