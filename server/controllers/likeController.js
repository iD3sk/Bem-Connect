const likeService = require('../services/likeService');

/**
 * Toggle like on a post
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Next middleware function
 */
const togglePostLike = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const {postId} = req.params;

        if (!postId) {
            const error = new Error('Post ID is required!');
            error.status = 400;
            throw error;
        }

        const result = await likeService.togglePostLike(userId, postId);
        res.status(200).json({
            message: result.liked ? "Liked!" : "Unliked!",
            liked: result.liked,
        })
    } catch (error) {
        error.status = error.status || 500;
        next(error);
    }
}

/**
 * Toggle like on a comment
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Next middleware function
 */
const toggleCommentLike = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const {commentId} = req.params;

        if (!commentId) {
            const error = new Error('Comment ID is required!');
            error.status = 400;
            throw error;
        }

        const result = await likeService.toggleCommentLike(userId, commentId);
        res.status(200).json({
            message: result.liked ? "Liked!" : "Unliked!",
            liked: result.liked,
        })
    } catch (error) {
        error.status = error.status || 500;
        next(error);
    }
}

module.exports = {
    togglePostLike,
    toggleCommentLike,
}
