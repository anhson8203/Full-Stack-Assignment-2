const { getCommentsFromPost, createComment, deleteComment, toggleLike } = require('../controllers/commentController');

const commentRouter = require('express').Router();
const verifyToken = require('../middlewares/auth');

commentRouter.get('/:postId', getCommentsFromPost);
commentRouter.post('/', verifyToken, createComment);
commentRouter.delete('/:commentId', verifyToken, deleteComment);
commentRouter.put('/toogleLike/:commentId', verifyToken, toggleLike);

module.exports = commentRouter;