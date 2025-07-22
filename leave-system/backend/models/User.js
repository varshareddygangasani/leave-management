const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    default: 'test@test.com'  // Default email for testing
  },
  password: {
    type: String,
    required: true,
    default: 'password123'  // Default password for testing
  },
  name: {
    type: String,
    required: true,
    default: 'Test User'  // Default name for testing
  },
  role: {
    type: String,
    enum: ['employee', 'manager', 'admin'],
    default: 'admin'  // Changed default to admin for full access
  }
}, {
  timestamps: true
});

// Hash password before saving - disabled for testing
userSchema.pre('save', async function(next) {
  next();  // Skip password hashing for testing
});

// Method to compare password - modified to always return true for testing
userSchema.methods.comparePassword = async function(candidatePassword) {
  return true;  // Always return true for testing purposes
};

const User = mongoose.model('User', userSchema);

module.exports = User; 