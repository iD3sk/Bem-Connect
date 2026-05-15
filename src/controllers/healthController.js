const healthService = require('../services/healthService');

/**
 * @desc    Health check endpoint
 * @route   GET /api/health
 * @access  Public
 */
const check = async (_req, res, next) => {
  try {
    const result = await healthService.getHealthStatus();
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = { check };
