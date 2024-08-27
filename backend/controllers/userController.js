const User = require('../models/User');
const bcrypt = require('bcrypt');

const getAll = async (req, res) => {
    try {
        const users = await User.find({}).select('-password');

        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            throw new Error('User not found!');
        }

        const { password, ...others } = user._doc;

        return res.status(200).json(others);
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

const updateUser = async (req, res) => {
    if (req.params.id === req.user.id) {
        try {
            if (req.body.password) {
                const newHashedPassword = await bcrypt.hash(req.body.password, 10);
                req.body.password = newHashedPassword;
            }

            const user = await User.findByIdAndUpdate(
                req.params.id,
                { $set: req.body },
                { new: true }
            );

            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    } else {
        return res.status(403).json({ message: 'You can only update your account!' });
    }
}

const deleteUser = async (req, res) => {
    if (req.params.id === req.user.id) {
        try {
            const user = await User.findById(req.params.id);
            if (!user) {
                throw new Error('User not found!');
            }

            await User.findByIdAndDelete(req.params.id);
            return res.status(200).json({ message: 'User has been deleted!' });
        } catch (error) {
            return res.status(500).json(error.message);
        }
    } else {
        return res.status(403).json({ message: 'You can only delete your account!' });
    }
}

const getUserFriends = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            throw new Error('User not found!');
        }

        const userFriends = await Promise.all(
            user.followings.map(friendId => {
                return User.findById(friendId).select('-password');
            })
        );

        return res.status(200).json(userFriends);
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

const followUser = async (req, res) => {
    if (req.params.id !== req.user.id) {
        try {
            const friend = await User.findById(req.params.id);
            if (!friend) {
                throw new Error('No user with this ID found!');
            }

            if (friend.followers.includes(req.user.id)) {
                throw new Error('You are already following this person!');
            }

            await User.findByIdAndUpdate(
                req.params.id,
                { $push: { followers: req.user.id } }
            );

            await User.findByIdAndUpdate(
                req.user.id,
                { $push: { followings: req.params.id } }
            );

            return res.status(200).json({ message: 'You are now following this person!' });
        } catch (error) {
            return res.status(500).json(error.message);
        }
    } else {
        return res.status(403).json({ message: 'You cannot follow yourself!' });
    }
}

const unfollowUser = async (req, res) => {
    if (req.params.id !== req.user.id) {
        try {
            const friend = await User.findById(req.params.id);
            if (!friend) {
                throw new Error('No user with this ID found!');
            }

            if (!friend.followers.includes(req.user.id)) {
                throw new Error('You are not following this person!');
            }

            await User.findByIdAndUpdate(
                req.params.id,
                { $pull: { followers: req.user.id } }
            );

            await User.findByIdAndUpdate(
                req.user.id,
                { $pull: { followings: req.params.id } }
            );

            return res.status(200).json({ message: 'You have unfollowed this person!' });
        } catch (error) {
            return res.status(500).json(error.message);
        }
    } else {
        return res.status(403).json({ message: 'You cannot unfollow yourself!' });
    }
}

module.exports = {
    getAll,
    getUser,
    updateUser,
    deleteUser,
    getUserFriends,
    followUser,
    unfollowUser
}