const express = require('express');
const router = express.Router();

const likeController = require('../controllers/likeController');
const { authenticate } = require('../middlewares/authMiddleware');
  
// POST /api/likes/post/:postId  — Toggle like on a post
router.post('/post/:postId', authenticate, likeController.togglePostLike);
// POST /api/likes/comment/:commentId — Toggle like on a comment
router.post('/comment/:commentId', authenticate, likeController.toggleCommentLike);

module.exports = router;