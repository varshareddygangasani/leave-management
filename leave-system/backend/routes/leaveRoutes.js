const express = require('express');
const Leave = require('../models/Leave');
const { protect } = require('../middleware/authMiddleware.js');

const router = express.Router();

// Submit and process leave request immediately
router.post('/', async (req, res) => {
  try {
    const leaveData = {
      ...req.body,
      user: req.body.userId,
      status: 'pending' // Will be updated immediately
    };

    const leave = await Leave.create(leaveData);

    // Process the leave immediately
    if (leave.type === 'sick') {
      // Always approve sick leaves
      leave.status = 'approved';
    } else {
      // For other types, 70% chance of approval
      leave.status = Math.random() < 0.7 ? 'approved' : 'rejected';
    }

    await leave.save();
    res.status(201).json(leave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all leaves for a user
router.get('/user/:userId', async (req, res) => {
  try {
    const leaves = await Leave.find({ user: req.params.userId });
    res.json(leaves);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Process leave request (auto-approve/reject)
router.put('/:id/process', async (req, res) => {
  try {
    const leave = await Leave.findById(req.params.id);
    if (!leave) {
      return res.status(404).json({ message: 'Leave request not found' });
    }

    // Always approve sick leaves
    if (leave.type === 'sick') {
      leave.status = 'approved';
    } else {
      // Randomly approve/reject other leaves (70% approval rate)
      leave.status = Math.random() < 0.7 ? 'approved' : 'rejected';
    }

    await leave.save();
    res.json(leave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update leave status (for managers/admin)
router.put('/:id/status', protect, async (req, res) => {
  try {
    const { status } = req.body;
    const leave = await Leave.findById(req.params.id);

    if (!leave) {
      return res.status(404).json({ message: 'Leave not found' });
    }

    if (req.user.role !== 'manager' && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    leave.status = status;
    await leave.save();

    res.json(leave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router; 