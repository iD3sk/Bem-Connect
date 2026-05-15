const jwt = require('jsonwebtoken');

/**
 * Middleware: Authenticate JWT token.
 *
 * Expects header:  Authorization: Bearer <token>
 * On success, attaches decoded payload to `req.user`.
 */
const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, email, role, iat, exp }
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token has expired. Please login again.' });
    }
    return res.status(401).json({ error: 'Invalid token.' });
  }
};

/**
 * Middleware factory: Authorize by role.
 *
 * Usage:  router.get('/admin', authenticate, authorize('ADMIN'), handler)
 *
 * @param  {...string} roles - Allowed roles (e.g. 'ADMIN', 'MEMBER').
 * @returns {Function} Express middleware.
 */
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required.' });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        error: 'You do not have permission to access this resource.',
      });
    }

    next();
  };
};

module.exports = { authenticate, authorize };
