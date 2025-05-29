import Food from '../models/Food.js';

// Get all foods
export const getAllFoods = async (req, res) => {
  try {
    const foods = await Food.find()
      .populate('donorId', 'name email')
      .populate('claimedBy', 'name email');
    res.json(foods);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching foods', error: error.message });
  }
};

// Create new food
export const createFood = async (req, res) => {
  try {
    const { name, quantity, expiryDate, location } = req.body;
    const newFood = new Food({
      name,
      quantity,
      expiryDate,
      location,
      donorId: req.user.id
    });

    const savedFood = await newFood.save();
    res.status(201).json(savedFood);
  } catch (error) {
    res.status(400).json({ message: 'Error creating food', error: error.message });
  }
};

// Delete food
export const deleteFood = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    
    if (!food) {
      return res.status(404).json({ message: 'Food not found' });
    }
    
    if (food.donorId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    await food.deleteOne();
    res.json({ message: 'Food deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting food', error: error.message });
  }
};

// Claim food
export const claimFood = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    
    if (!food) {
      return res.status(404).json({ message: 'Food not found' });
    }

    if (food.status !== 'available') {
      return res.status(400).json({ message: 'Food is not available for claiming' });
    }

    food.claimedBy = req.user.id;
    food.status = 'claimed';
    
    await food.save();
    res.json({ message: 'Food claimed successfully', food });
  } catch (error) {
    res.status(500).json({ message: 'Error claiming food', error: error.message });
  }
};
