const prisma = require('../config/database');

/**
 * Returns server health status including DB connectivity.
 */
const getHealthStatus = async () => {
  let dbStatus = 'disconnected';

  try {
    await prisma.$queryRaw`SELECT 1`;
    dbStatus = 'connected';
  } catch {
    dbStatus = 'disconnected';
  }

  return {
    status: 'ok',
    timestamp: new Date().toISOString(),
    database: dbStatus,
  };
};

module.exports = { getHealthStatus };
