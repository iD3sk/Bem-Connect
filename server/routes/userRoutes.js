const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const { authenticate } = require('../middlewares/authMiddleware');

// GET /api/users/profile   — Get user profile
router.get('/profile', authenticate, userController.getUserProfile);

// GET /api/users/posts     — Get user posts
router.get('/posts', authenticate, userController.getUserPosts);

// GET /api/users/comments  — Get user comments
router.get('/comments', authenticate, userController.getUserComments);

module.exports = router;
