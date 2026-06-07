import express from 'express';
import auth from '../middleware/auth.js';
import {
  createTask,
  updateTask,
  getTask,
  deleteTask,
} from '../controllers/taskController.js';

const router = express.Router();

// creat task
router.post('/', auth, createTask);
// get task project
router.get('/:projectId', auth, getTask);
// update task
router.put('/:id', auth, updateTask);
// delete task
router.delete('/:id', auth, deleteTask);

export default router;
