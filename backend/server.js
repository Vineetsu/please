import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Set up __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables before other imports
dotenv.config({ path: join(__dirname, '.env') });

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes.js';
import foodRoutes from './routes/foodRoutes.js';
import userRoutes from './routes/userRoutes.js';
import connectDB from './config/db.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Debug environment variables
console.log('Environment check on startup:');
console.log('MONGODB_URI:', process.env.MONGODB_URI ? 'Set' : 'Not set');
if (!process.env.MONGODB_URI) {
  console.error('ERROR: MONGODB_URI is not set in environment variables');
  process.exit(1);
}

// Connect DB
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/foods', foodRoutes);
app.use('/api/users', userRoutes);

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Food Secure Network API' });
});

// Port configuration
const PORT = process.env.PORT || 5000;

// Add error handling for MongoDB connection
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

mongoose.connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log('Environment variables loaded:');
  console.log('- PORT:', process.env.PORT);
  console.log('- MONGODB_URI:', process.env.MONGODB_URI ? 'Set' : 'Not set');
  console.log('- JWT_SECRET:', process.env.JWT_SECRET ? 'Set' : 'Not set');
});
