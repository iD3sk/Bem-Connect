const prisma = require('../config/database');

/**
 * Toggle like on a post
 * @param {string} userId - The ID of the user
 * @param {string} postId - The ID of the post
 * @returns {Object}
 */
const togglePostLike = async (userId, postId) => {
    const existingLike = await prisma.postLike.findUnique({
        where: {
            userId_postId: { userId, postId }
        },
    });

    if (existingLike) {
        await prisma.postLike.delete({
            where: {id: existingLike.id},
        });
        return {liked: false};
    }

    await prisma.postLike.create({
        data: {userId, postId},
    });
    return {liked: true};
}

/**
 * Toggle like on a comment
 * @param {string} userId - The ID of the user
 * @param {string} commentId - The ID of the comment
 * @returns {Object}
 */
const toggleCommentLike = async (userId, commentId) => {
    const existingLike = await prisma.commentLike.findUnique({
        where: {
            userId_commentId: { userId, commentId }
        },
    });

    if (existingLike) {
        await prisma.commentLike.delete({
            where: {id: existingLike.id},
        });
        return {liked: false};
    }

    await prisma.commentLike.create({
        data: {userId, commentId},
    });
    return {liked: true};
}

module.exports = {
    togglePostLike,
    toggleCommentLike,
}