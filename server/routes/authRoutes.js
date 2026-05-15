const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const { authenticate } = require('../middlewares/authMiddleware');

// POST /api/auth/signup  — Register a new user
router.post('/signup', authController.signup);

// POST /api/auth/login   — Login with email & password
router.post('/login', authController.login);

// GET  /api/auth/me      — Get current user profile (protected)
router.get('/me', authenticate, authController.getMe);

module.exports = router;
