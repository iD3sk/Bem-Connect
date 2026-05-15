const express = require('express');
const router = express.Router();

const postController = require('../controllers/postController');
const { authenticate } = require('../middlewares/authMiddleware');

// POST /api/posts   — Create a new post
router.post('/', authenticate, postController.createPost);

// GET /api/posts    — Get all posts
router.get('/', postController.getAllPost);

// GET /api/posts/:id — Get a single post
router.get('/:id', postController.getPostById);

// PUT /api/posts/:id — Update a post
router.put('/:id', authenticate, postController.updatePost);

// DELETE /api/posts/:id — Delete a post
router.delete('/:id', authenticate, postController.deletePost);


module.exports = router;