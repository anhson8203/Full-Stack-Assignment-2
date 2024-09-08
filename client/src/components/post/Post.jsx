/*
import React, { useEffect, useState } from 'react'
import classes from './post.module.css'
import person from '../../assets/Astralis.png'
import { request } from '../../util/request'
import { useSelector } from 'react-redux'
import { format } from 'timeago.js'
import { Link } from 'react-router-dom'
import { AiOutlineLike, AiFillLike, AiOutlineComment } from 'react-icons/ai'
import { IoMdShareAlt, IoMdSettings } from 'react-icons/io'

const Post = ({ post }) => {
  const { user, token } = useSelector((state) => state.auth)
  const [authorDetails, setAuthorDetails] = useState('')
  const [showComments, setShowComments] = useState(false)
  const [comments, setComments] = useState([])
  const [commentText, setCommentText] = useState('')
  const [isLiked, setIsLiked] = useState(post?.likes?.includes(user._id))
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await request('/user/find/' + post.userId, 'GET')
        setAuthorDetails(data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchDetails()
  }, [post._id])

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const data = await request(`/comment/${post._id}`, 'GET')
        setComments(data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchComments()
  }, [post._id])

  const handleDeletePost = async () => { }

  const handleLike = async () => { }
  
  return (
    <div className={classes.post}>
      <div className={classes.top}>
        <Link to={`/profile/${user?._id}`} className={classes.topLeft}>
          <img src={person} className={classes.postAuthorImg} />
          <div className={classes.postDetails}>
            <span>{authorDetails?.username}</span>
            <span className={classes.date}>{format(post?.createdAt)}</span>
          </div>
        </Link>
        {user._id === post?.userId && <IoMdSettings onClick={() => setShowModal(prev => !prev)} />}
        {showModal && (
          <span className={classes.deleteModal} onClick={handleDeletePost}>
            Delete post
          </span>
        )}
      </div>
      <p className={classes.desc}>
        {post?.desc}
      </p>
      <div className={classes.postImgContainer}>
        <img src={post.imageUrl ? `http://localhost:5000/images/${post.imageUrl}` : person} className={classes.postImg} />
      </div>
      <div className={classes.actions}>
        {
          !isLiked && (
            <span className={classes.action} onClick={handleLike}>
              Like <AiOutlineLike />
            </span>
          )
        }
        {
          isLiked && (
            <span className={classes.action}>
              Liked <AiFillLike />
            </span>
          )
        }
        <span className={classes.action}>
          Comment <AiOutlineComment />
        </span>
        <span className={classes.action}>
          Share <IoMdShareAlt />
        </span>
      </div>
    </div>
  )
}

export default Post
*/

import React, { useEffect, useState } from 'react'
import classes from './post.module.css'
import person from '../../assets/Astralis.png'
import { request } from '../../util/request'
import { useSelector } from 'react-redux'
import { format } from 'timeago.js'
import { Link } from 'react-router-dom'
import { AiOutlineLike, AiFillLike, AiOutlineComment } from 'react-icons/ai'
import { IoMdShareAlt, IoMdSettings } from 'react-icons/io'

const Post = ({ post }) => {
  const { user, token } = useSelector((state) => state.auth)
  const [authorDetails, setAuthorDetails] = useState('')
  const [showComments, setShowComments] = useState(false)
  const [comments, setComments] = useState([])
  const [commentText, setCommentText] = useState('')
  const [isLiked, setIsLiked] = useState(post?.likes?.includes(user?._id))
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await request('/user/find/' + post.userId, 'GET')
        setAuthorDetails(data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchDetails()
  }, [post._id])

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const data = await request(`/comment/${post._id}`, 'GET')
        setComments(data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchComments()
  }, [post._id])

  const handleDeletePost = async () => { }

  const handleLike = async () => { }

  if (!user) {
    return null;
  }

  return (
    <div className={classes.post}>
      <div className={classes.top}>
        <Link to={`/profile/${user._id}`} className={classes.topLeft}>
          <img src={person} className={classes.postAuthorImg} />
          <div className={classes.postDetails}>
            <span>{authorDetails?.username}</span>
            <span className={classes.date}>{format(post?.createdAt)}</span>
          </div>
        </Link>
        {user._id === post?.userId && <IoMdSettings onClick={() => setShowModal(prev => !prev)} />}
        {showModal && (
          <span className={classes.deleteModal} onClick={handleDeletePost}>
            Delete post
          </span>
        )}
      </div>
      <p className={classes.desc}>
        {post?.desc}
      </p>
      <div className={classes.postImgContainer}>
        <img src={post.imageUrl ? `http://localhost:5000/images/${post.imageUrl}` : person} className={classes.postImg} />
      </div>
      <div className={classes.actions}>
        {
          !isLiked && (
            <span className={classes.action} onClick={handleLike}>
              Like <AiOutlineLike />
            </span>
          )
        }
        {
          isLiked && (
            <span className={classes.action}>
              Liked <AiFillLike />
            </span>
          )
        }
        <span className={classes.action}>
          Comment <AiOutlineComment />
        </span>
        <span className={classes.action}>
          Share <IoMdShareAlt />
        </span>
      </div>
    </div>
  )
}

export default Post