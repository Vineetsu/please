import mongoose from 'mongoose';

const checkMongoConnection = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/test');
    console.log('MongoDB is running and accessible! ✅');
    await mongoose.disconnect();
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error.message);
    console.log('\nPossible solutions:');
    console.log('1. Make sure MongoDB is installed');
    console.log('2. Ensure MongoDB service is running');
    console.log('3. Check if MongoDB is running on the default port (27017)');
  }
  process.exit(0);
};

checkMongoConnection(); 