import express from 'express';
import { getUserProfile } from '../controllers/userController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

// Get user profile
router.get('/profile', authenticate, getUserProfile);

// Update user profile
router.put('/profile', (req, res) => {
  res.json({ message: 'Update user profile' });
});

export default router;
