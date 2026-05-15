const commentService = require('../services/commentService');


/**
 * @desc    Create a comment
 * @route   POST /api/posts/:id/comments
 * @access  Private
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Next middleware function
 */
const createComment = async (req, res, next) => {
    try {
        const authorId = req.user.id;
        const {content} = req.body;

        if ( !content) {
            const error = new Error('Comment cannot be empty!');
            error.status = 400;
            throw error;
        }

        const {postId} = req.params;
        const comment = await commentService.createComment(authorId, postId, {content});

        res.status(201).json({
            message: "Comment posted!",
            comment,
        })
    } catch (error) {
        error.status = error.status || 500;
        next(error);
    }
}



/**
 * @desc    Get all comments by post
 * @route   GET /api/posts/:postId/comments
 * @access  Private
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Next middleware function
 */
const getCommentsByPost = async (req, res, next) => {
    try {
        const {postId} = req.params;

        if (!postId) {
            const error = new Error('Post ID is required!');
            error.status = 400;
            throw error;
        }

        const comments = await commentService.getCommentsByPost(postId);
        res.status(200).json(comments);
    } catch (error) {
        next(error);
    }
}

/**
 * @desc    Delete a comment
 * @route   DELETE /api/comments/:commentId
 * @access  Private
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Next middleware function
 */
const deleteComment = async (req, res, next) => {   
    try {
        const authorId = req.user.id;
        const {commentId} = req.params;

        if (!commentId) {
            const error = new Error('Comment ID is required!');
            error.status = 400;
            throw error;
        }

        await commentService.deleteComment(commentId, authorId);

        res.status(200).json({
            message: "Comment deleted successfully",
        })
    } catch (error) {
        next(error);
    }
}

module.exports = {
    createComment,
    getCommentsByPost,
    deleteComment,
}