import React, { useState } from 'react'
import Share from '../share/Share'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { request } from '../../util/request'
import classes from './posts.module.css'
import Post from '../post/Post'

const Posts = () => {
  const [posts, setPosts] = useState([])
  const { token } = useSelector((state) => state.auth)

  useEffect(() => {
    const fetchTimelinePosts = async() => {
      try {
        const headers = {
          'Authorization': `Bearer ${token}`
        }

        const data = await request('/post/timelinePosts', 'GET', headers)
        console.log(data)
        setPosts(data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchTimelinePosts()
  }, [])

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <Share />
        <div className={classes.posts}>
          {posts.map((post) => (
            <Post post={post} key={post._id}/>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Posts