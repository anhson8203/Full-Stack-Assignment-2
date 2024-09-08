const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const cors = require('cors');

const authRouter = require('./routes/auth');
const postRouter = require('./routes/post');
const userRouter = require('./routes/user');
const commentRouter = require('./routes/comment');
const uploadRouter = require('./controllers/uploadController');

const app = express();

mongoose.connect(process.env.MONGO_URL).then(() => console.log('DB connection successful'));

app.use('/images', express.static("public/images"));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', authRouter);
app.use('/post', postRouter);
app.use('/user', userRouter);
app.use('/comment', commentRouter);
app.use('/upload', uploadRouter);

app.listen(process.env.PORT, () => console.log('Server is started'));