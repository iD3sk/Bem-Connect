const authService = require('../services/authService');

/**
 * @desc    Register a new user
 * @route   POST /api/auth/signup
 * @access  Public
 */
const signup = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;

    // Basic input validation
    if (!email || !password || !name) {
      return res.status(400).json({
        error: 'Please provide email, password, and name',
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        error: 'Password must be at least 8 characters long',
      });
    }

    const result = await authService.signup({ email, password, name });

    res.status(201).json({
      message: 'Account created successfully',
      user: result.user,
      token: result.token,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Login an existing user
 * @route   POST /api/auth/login
 * @access  Public
 */
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: 'Please provide email and password',
      });
    }

    const result = await authService.login({ email, password });

    res.status(200).json({
      message: 'Login successful',
      user: result.user,
      token: result.token,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get current authenticated user's profile
 * @route   GET /api/auth/me
 * @access  Private (requires JWT)
 */
const getMe = async (req, res, next) => {
  try {
    const user = await authService.getProfile(req.user.id);

    res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
};

module.exports = { signup, login, getMe };
