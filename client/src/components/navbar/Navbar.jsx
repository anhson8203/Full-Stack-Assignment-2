import React from 'react'
import classes from './navbar.module.css'
import { useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { useNavigate, Link } from 'react-router-dom'
import person from '../../assets/Astralis.png'

const Navbar = () => {
  const [showModal, setShowModal] = useState(false)
  const navigate = useNavigate()

  const toggleModal = () => {
    setShowModal(prev => !prev)
  }

  const handleLogout = () => {
    localStorage.clear()
    navigate('/auth')
  }

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.left}>
          <Link to='/'>
            <h3>Facebook</h3>
          </Link>
        </div>
        <div className={classes.right}>
          <form className={classes.searchForm}>
            <input type="text" placeholder='Search Facebook' />
            <AiOutlineSearch className={classes.searchIcon} />
          </form>
          <img src={person} className={classes.personImg} onClick={toggleModal} />
          {showModal && (
            <div className={classes.modal}>
              <span onClick={handleLogout} className={classes.logout}>Log Out</span>
              <Link to='/' className={classes.updateProfile}>Update Profile</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar