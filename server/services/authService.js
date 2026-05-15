const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = require('../config/database');

const SALT_ROUNDS = 12;

/**
 * Generates a JWT access token for a given user.
 * @param {Object} user - The user object (must have id, email, role).
 * @returns {string} Signed JWT token.
 */
const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
};

/**
 * Strips sensitive fields from the user object before sending to client.
 * @param {Object} user - The raw user object from Prisma.
 * @returns {Object} Sanitized user object (no password).
 */
const sanitizeUser = (user) => {
  const { password, ...safeUser } = user;
  return safeUser;
};

/**
 * Registers a new user account.
 * @param {Object} data - { email, password, name }
 * @returns {Object} { user, token }
 * @throws {Error} If email already exists or validation fails.
 */
const signup = async ({ email, password, name }) => {
  // Check for existing user
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    const error = new Error('Email is already registered');
    error.status = 409;
    throw error;
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  // Create user
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
    },
  });

  const token = generateToken(user);

  return { user: sanitizeUser(user), token };
};

/**
 * Authenticates a user with email and password.
 * @param {Object} data - { email, password }
 * @returns {Object} { user, token }
 * @throws {Error} If credentials are invalid.
 */
const login = async ({ email, password }) => {
  // Find user by email
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    const error = new Error('Invalid email or password');
    error.status = 401;
    throw error;
  }

  // Verify password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    const error = new Error('Invalid email or password');
    error.status = 401;
    throw error;
  }

  const token = generateToken(user);

  return { user: sanitizeUser(user), token };
};

/**
 * Retrieves the current authenticated user's profile.
 * @param {string} userId - The user's UUID.
 * @returns {Object} Sanitized user object.
 * @throws {Error} If user not found.
 */
const getProfile = async (userId) => {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    const error = new Error('User not found');
    error.status = 404;
    throw error;
  }

  return sanitizeUser(user);
};

module.exports = { signup, login, getProfile, generateToken, sanitizeUser };
