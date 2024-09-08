import React from 'react'
import classes from './home.module.css'

import NavBar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Posts from '../../components/posts/Posts'
import Friends from '../../components/friend/Friends'

const Home = () => {
  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <NavBar />
        <main className={classes.main}>
          <Sidebar />
          <Posts />
          <Friends />
        </main>
      </div>
    </div>
  )
}

export default Home