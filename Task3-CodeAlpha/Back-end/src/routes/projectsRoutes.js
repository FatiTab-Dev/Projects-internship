import express from 'express';
import auth from '../middleware/auth.js';
import {
  createProject,
  getProject,
  getProjectById,
  updateProject,
  deleteProject,
  inviteMember,
} from '../controllers/projectController.js';

const router = express.Router();
// creat project
router.post('/', auth, createProject);
//invite
router.post('/:id/invite', auth, inviteMember);
// get my project
router.get('/', auth, getProject);
// get some project
router.get('/:id', auth, getProjectById);
// update project
router.put('/:id', auth, updateProject);
// delete project
router.delete('/:id', auth, deleteProject);

export default router;
