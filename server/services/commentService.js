const prisma = require('../config/database');

/**
 * Creates a new comment on a specific post.
 * @param {string} authorId - The ID of the user creating the comment.
 * @param {string} postId - The ID of the post to comment on.
 * @param {Object} data - Comment data containing the content.
 * @returns {Object} The created comment object with author details.
 */
const createComment = async (authorId, postId, {content}) => {
    const comment = await prisma.comment.create({
        data: {
            content,
            authorId,
            postId,
        },
        include: {
            author: {
                select: { id: true, name: true, email: true, avatar: true}
            },
        },
    });
    return comment;
}

/**
 * Retrieves all comments for a specific post, ordered by creation time (oldest first).
 * Includes the author details for each comment.
 * @param {string} postId - The ID of the post to retrieve comments for.
 * @returns {Array<Object>} Array of comment objects, each including author details.
 */
const getCommentsByPost = async (postId) => {
    const comments = await prisma.comment.findMany({
        where: {postId: postId},
        include: {
            author: {
                select: { id: true, name: true, email: true, avatar: true}
            },
        },
        orderBy: { createdAt: "asc" },
    });

    return comments;
}


/**
 * Deletes a comment. Validates that the deleter is the comment's author.
 * @param {string} commentId - The ID of the comment to delete.
 * @param {string} authorId - The ID of the user attempting the deletion.
 * @returns {Object} The deleted comment object.
 * @throws {Error} If the comment is not found (status 404) or the user is not authorized (status 403).
 */
const deleteComment = async (commentId, authorId) => {
    const existingComment = await prisma.comment.findUnique({
        where: {id: commentId},
    })

    if (!existingComment) {
        const error = new Error('Comment not found');
        error.status = 404;
        throw error;
    }

    if (existingComment.authorId !== authorId) {
        const error = new Error('Un-authorized to delete this comment');
        error.status = 403;
        throw error;
    }

    const deletedComment = await prisma.comment.delete({
        where: {id: commentId},
    });

    return deletedComment;
}

module.exports = {
    createComment,
    getCommentsByPost,
    deleteComment,
}
