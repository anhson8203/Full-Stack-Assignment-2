const Comment = require('../models/Comment');

const getCommentsFromPost = async (req, res) => {
    try {
        const comments = await Comment.find({ postId: req.params.postId });

        return res.status(200).json(comments);
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

const createComment = async (req, res) => {
    try {
        const createdComment = new Comment({ ...req.body, userId: req.user.id });
        await createdComment.save();

        return res.status(201).json(createdComment);
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

const deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.commentId);
        if (comment.userId === req.user.id) {
            await comment.delete();
        } else {
            throw new Error('Can only delete your comments');
        }
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

const toggleLike = async (req, res) => {
    try {
        const currentUserId = req.user.id;
        const comment = await Comment.findById(req.params.commentId);

        if (!comment.likes.includes(currentUserId)) {
            comment.likes.push(currentUserId);
            await comment.save();

            return res.status(200).json({ message: 'Comment liked' });
        } else {
            comment.likes = comment.likes.filter((id) => id !== currentUserId);
            await comment.save();

            return res.status(200).json({ message: 'Comment unliked' });
        }
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

module.exports = { getCommentsFromPost, createComment, deleteComment, toggleLike };