import express from 'express';
import auth from '../middleware/auth.js';

const router = express.Router();
// creat project 
router.post('/');
//invite
router.post('/:id/invite');
// get my project
router.get('/');
// get some project
router.get('/:id');
// update project
router.put('/:id');
// delete project
router.delete('/:id');

export default router;