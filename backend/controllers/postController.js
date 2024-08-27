const User = require('../models/User');
const Post = require('../models/Post');

const getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        return res.status(200).json(post);
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

const getUserPosts = async (req, res) => {
    try {
        const userPosts = await Post.find({ userId: req.params.id });
        return res.status(200).json(userPosts);
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

const createPost = async (req, res) => {
    try {
        const isEmpty = Object.values(req.body).some((v) => v === '');
        if (isEmpty) {
            throw new Error("Missing required fields!");
        }

        const newPost = new Post({ ...req.body, userId: req.user.id });
        await newPost.save();

        return res.status(201).json(newPost);
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

const updatePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (post.userId === req.user.id) {
            const updatedPost = await Post.findByIdAndUpdate(
                req.params.id,
                { $set: req.body },
                { new: true }
            );

            return res.status(200).json(updatedPost);
        } else {
            throw new Error("Can only update your own posts!");
        }
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            throw new Error("Post not found!");
        }

        if (post.userId === req.user.id) {
            await post.delete();
            return res.status(200).json({ message: "Post deleted!" });
        } else {
            throw new Error("Can only delete your own posts!");
        }
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

const likePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        if (!post) {
            throw new Error("Post not found!");
        }

        const isLikedByCurrentUser = post.likes.includes(req.user.id);
        if (isLikedByCurrentUser) {
            throw new Error("Post already liked!");
        } else {
            await Post.findByIdAndUpdate(
                req.params.postId,
                { $push: { likes: req.user.id } },
                { new: true }
            );

            return res.status(200).json({ message: "Post liked!" });
        }
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

const dislikePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        if (!post) {
            throw new Error("Post not found!");
        }

        const isLikedByCurrentUser = post.likes.includes(req.user.id);
        if (isLikedByCurrentUser) {
            await Post.findByIdAndUpdate(
                req.params.postId,
                { $pull: { likes: req.user.id } },
                { new: true }
            );

            return res.status(200).json({ message: "Post disliked!" });
        } else {
            throw new Error("Post not already liked!");
        }
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

const getTimeLinePosts = async (req, res) => {
    try {
        const currentUSer = await User.findById(req.user.id);
        const userPosts = await Post.find({ userId: currentUSer._id });
        const friendPosts = await Promise.all(
            currentUSer.followings.map((friendId) => {
                return Post.find({ userId: friendId });
            })
        );

        const allPosts = userPosts.concat(...friendPosts).sort((a, b) => b.createdAt - a.createdAt);
        return res.status(200).json(allPosts);
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

module.exports = {
    getPost,
    createPost,
    getUserPosts,
    updatePost,
    deletePost,
    likePost,
    dislikePost,
    getTimeLinePosts,
};