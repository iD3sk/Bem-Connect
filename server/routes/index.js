const express = require('express');
const router = express.Router();

const healthRoutes = require('./healthRoutes');
const authRoutes = require('./authRoutes');
const postRoutes = require('./postRoutes');

// Mount route groups
router.use('/health', healthRoutes);
router.use('/auth', authRoutes);
router.use('/post', postRoutes);

module.exports = router;
