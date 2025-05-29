import express from 'express';
import {
  createFood,
  getAllFoods,
  deleteFood,
} from '../controllers/foodController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

// Get all food listings
router.get('/', getAllFoods);

// Create new food listing
router.post('/', authenticate, createFood);

// Update food listing
router.put('/:id', (req, res) => {
  res.json({ message: 'Update food listing' });
});

// Delete food listing
router.delete('/:id', authenticate, deleteFood);

export default router;
