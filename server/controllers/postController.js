const postService = require('../services/postService');

/**
 * @desc    Create a new post
 * @route   POST /api/posts
 * @access  Private
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Next middleware function
 */
const createPost = async (req, res, next) => {
    try {
        const authorId = req.user.id;
        const { content, imageUrl } = req.body;

        if( !content) {
            const error = new Error('Content is required!');
            error.status = 400;
            throw error;
        }

        const newPost = await postService.createPost(req.user.id, {content, imageUrl});

        res.status(201).json(newPost);
    } catch (error) {
        next(error);
    }    
}


/**
 * @desc    Get all posts
 * @route   GET /api/posts
 * @access  Public
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Next middleware function
 */
const getAllPost = async (req, res, next) => {
    try {
        const posts = await postService.getAllPost();
        res.status(200).json(posts);
    } catch (error) {
        next(error);
    }
}

/**
 * @desc    Get a single post
 * @route   GET /api/posts/:id
 * @access  Public
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Next middleware function
 */
const getPostById = async (req, res, next) => {
    try {
        const post = await postService.getPostById(req.params.id);
        res.status(200).json(post);
    } catch (error) {
        next(error);
    }
}

/**
 * @desc    Update a post
 * @route   PUT /api/posts/:id
 * @access  Private
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Next middleware function
 */
const updatePost = async (req, res, next) => {
    try {
        const updatedPost = await postService.updatePost(req.params.id, req.user.id, req.body);
        res.status(200).json(updatedPost);
    } catch (error) {
        next(error);
    }
}

/**
 * @desc    Delete a post
 * @route   DELETE /api/posts/:id
 * @access  Private
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Next middleware function
 */
const deletePost = async (req, res, next) => {
    try {
        const deletedPost = await postService.deletePost(req.params.id, req.user.id);
        res.status(200).json(deletedPost);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    createPost,
    getAllPost,
    getPostById,
    getPostsByUserId,
    updatePost,
    deletePost,
};