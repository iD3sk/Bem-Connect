const userService = require('../services/userService');

/**
 * Get user profile
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Next middleware function
 */
const getUserProfile = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const user = await userService.getUserProfile(userId);
        res.status(200).json(user);
    } catch (error) {
        error.status = error.status || 500;
        next(error);
    }
}

/**
 * Get user posts
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Next middleware function
 */
const getUserPosts = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const posts = await userService.getUserPosts(userId);
        res.status(200).json(posts);
    } catch (error) {
        error.status = error.status || 500;
        next(error);
    }
}

/**
 * Get user comments
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Next middleware function
 */
const getUserComments = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const comments = await userService.getUserComments(userId);
        res.status(200).json(comments);
    } catch (error) {
        error.status = error.status || 500;
        next(error);
    }
}

module.exports = {
    getUserProfile,
    getUserPosts,
    getUserComments,
}