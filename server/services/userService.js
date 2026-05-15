const prisma = require('../config/database');

/**
 * Get user profile by ID
 * @param {string} userId - The ID of the user
 * @returns {Object}
 */
const getUserProfile = async (userId) => {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
            id: true,
            name: true,
            email: true,
            username: true,
            avatar: true,
            birthday: true,
            createdAt: true,
            _count: {
                select: {
                    posts: true,
                    comments: true,
                    postLikes: true
                }
            }
        },
    });

    if (!user) {
        const error = new Error('User not found');
        error.status = 404;
        throw error;
    }

    return user;
}

/**
 * Get user posts by ID
 * @param {string} userId - The ID of the user
 * @returns {Object}
 */
const getUserPosts = async (userId) => {
    const posts = await prisma.post.findMany({
        where: { authorId: userId },
        select: {
            id: true,
            title: true,
            content: true,
            imageUrl: true,
            createdAt: true,
            _count: {
                select: { likes: true, comments: true },
            },
        },
        orderBy: { createdAt: 'desc' },
    });

    return posts;
}

/**
 * Get user comments by ID
 * @param {string} userId - The ID of the user
 * @returns {Object}
 */
const getUserComments = async (userId) => {
    const comments = await prisma.comment.findMany({
        where: { authorId: userId },
        select: {
            id: true,
            content: true,
            createdAt: true,
            post: {
                select: {
                    id: true,
                    title: true,
                },
            },
        },
        orderBy: { createdAt: 'desc' },
    });

    return comments;
}

module.exports = {
    getUserProfile,
    getUserPosts,
    getUserComments,
}