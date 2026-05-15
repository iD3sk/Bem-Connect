const express = require('express');
const router = express.Router();

const healthRoutes = require('./healthRoutes');

// Mount route groups
router.use('/health', healthRoutes);

module.exports = router;
