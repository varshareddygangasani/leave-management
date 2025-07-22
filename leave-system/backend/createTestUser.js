const mongoose = require('mongoose');
const User = require('./models/User.js');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/leave-system', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error('MongoDB Connection Error:', err));

// Create test user
const createTestUser = async () => {
  try {
    // Delete existing test user if exists
    await User.deleteOne({ email: 'test@test.com' });
    
    // Create new test user
    const testUser = await User.create({
      name: 'Test User',
      email: 'test@test.com',
      password: 'password123',
      role: 'admin'
    });
    
    console.log('Test user created successfully:', testUser);
    process.exit(0);
  } catch (error) {
    console.error('Error creating test user:', error);
    process.exit(1);
  }
};

createTestUser(); 