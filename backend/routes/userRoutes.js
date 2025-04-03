const express = require('express');
const { 
  getUserProfile, 
  updateUserProfile, 
  getUsersByType,
  deleteUser 
} = require('../controllers/userController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// User profile routes
router.route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

// Admin routes for managing users
// Note: You might want to add an isAdmin middleware for these routes
router.get('/:type', protect, getUsersByType);
router.delete('/:id', protect, deleteUser);

module.exports = router;