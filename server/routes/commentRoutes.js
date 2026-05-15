const express = require('express');
const router = express.Router();

const commentController = require('../controllers/commentController');
const { authenticate } = require('../middlewares/authMiddleware');

// POST /api/comments   — Create a new comment
router.post("/:postId", authenticate, commentController.createComment);

// GET /api/comments/:postId   — Get all comments of a post
router.get("/:postId", commentController.getCommentsByPost);

// DELETE /api/comments/:commentId   — Delete a comment
router.delete("/:commentId", authenticate, commentController.deleteComment);

module.exports = router;