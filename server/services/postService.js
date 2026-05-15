const prisma = require('../config/database');

/**
 * Creates a new post.
 * @param {string} authorId - The ID of the user creating the post.
 * @param {Object} data - Post data containing title, content, and optional imageUrl.
 * @returns {Object} The created post object with author details.
 */
const createPost = async (authorId, {content, imageUrl}) => {
    const post = await prisma.post.create({
        data: {
            content,
            imageUrl:imageUrl || null,
            authorId,
        },
        include: {
            author: {
                select: { id: true, name: true, email: true, avatar: true}
            },
        },        
    });

    return post;
}

/**
 * Retrieves all posts, ordered by newest first.
 * Includes author details and counts for likes and comments.
 * @returns {Array<Object>} Array of post objects.
 */
const getAllPost = async () => {
    const posts = await prisma.post.findMany({
        include: {
            author: {
                select: { id: true, name: true, email: true, avatar: true}
            },
            _count: {
                select: {likes: true, comments: true},
            },
        },
        orderBy: { createdAt: "desc" },
    });

    return posts;
}

/**
 * Retrieves a single post by its ID.
 * Includes author details, associated comments (with their authors), and like count.
 * @param {string} postId - The ID of the post to retrieve.
 * @returns {Object} The post object.
 * @throws {Error} If the post is not found (status 404).
 */
const getPostById = async (postId) => {
    const post = await prisma.post.findUnique({
        where: {id: postId},
        include: {
            author: {
                select: { id: true, name: true, email: true, avatar: true},
            }, 
            comments: {
                include: {
                    author: {
                        select: { id: true, name: true, email: true, avatar: true},
                    },
                }
            }, 
            _count:{
                select: {likes: true}
            },                
        },
    })

    if (!post) {
        const error =  new Error('Post not found');
        error.status = 404;
        throw error;
    }

    return post;
}

/**
 * Updates an existing post. Validates that the updater is the post's author.
 * @param {string} postId - The ID of the post to update.
 * @param {string} authorId - The ID of the user attempting the update.
 * @param {Object} data - Updated post data (title, content, imageUrl).
 * @returns {Object} The updated post object.
 * @throws {Error} If post not found (status 404) or user is not the author (status 403).
 */
const updatePost = async (postId, authorId, { 
    content, imageUrl}) => {
    const existingPost = await getPostById(postId);
    
    if (existingPost.authorId !== authorId) {
        const error =  new Error('Un-authorized to edit this post');
        error.status = 403;
        throw error;
    } 

    const updatePost = await prisma.post.update({
        where: {id: postId},
        data: {
            content,
            imageUrl:imageUrl || null,
        },
        include: {
            author: {
                select: { id: true, name: true, email: true, avatar: true}
            },
        },
    })

    return updatePost
}

/**
 * Deletes an existing post. Validates that the deleter is the post's author.
 * @param {string} postId - The ID of the post to delete.
 * @param {string} authorId - The ID of the user attempting the deletion.
 * @returns {Object} The deleted post object.
 * @throws {Error} If post not found (status 404) or user is not the author (status 403).
 */
const deletePost = async (postId, authorId) => {
    const existingPost = await getPostById(postId);
    
    if (existingPost.authorId !== authorId) {
        const error =  new Error('Un-authorized to delete this post');
        error.status = 403;
        throw error;
    } 

    const deletedPost = await prisma.post.delete({
        where: {id: postId},
    }); 

    return deletedPost;
}

module.exports = {
    createPost,
    getAllPost,
    getPostById,
    updatePost,
    deletePost,
}



