const express = require('express');
const router = express.Router();

const healthRoutes = require('./healthRoutes');
const authRoutes = require('./authRoutes');
const postRoutes = require('./postRoutes');
const commentRoutes = require('./commentRoutes');
const likeRoutes = require('./likeRoutes');
const userRoutes = require('./userRoutes');

// Mount route groups
router.use('/health', healthRoutes);
router.use('/auth', authRoutes);
router.use('/post', postRoutes);
router.use('/comment', commentRoutes);
router.use('/likes', likeRoutes);
router.use('/users', userRoutes);

module.exports = router;
