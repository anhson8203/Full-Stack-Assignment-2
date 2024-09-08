import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import person from '../../assets/Astralis.png'
import { AiFillCamera, AiFillSmile, AiOutlineClose } from 'react-icons/ai'
import { IoMdPhotos } from 'react-icons/io'
import { request } from '../../util/request'
import classes from './share.module.css'

const Share = () => {
  const [desc, setDesc] = useState("")
  const [photo, setPhoto] = useState("")
  const { token } = useSelector((state) => state.auth)

  const handleCreatePost = async (e) => {
    try {
      let filename = null
      
      if (photo) {
        const formData = new FormData()
        filename = crypto.randomUUID() + photo.name
        formData.append("imageUrl", filename)
        formData.append("photo", photo)
        await request('/upload', 'POST', {}, formData, true)
      } else {
        return
      }

      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }

      const body = {
        desc,
        imageUrl: filename
      }

      await request('/post', 'POST', headers, body)
      window.location.reload()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className={classes.share}>
      <div className={classes.shareTop}>
        <img src={person} />
        <input type="text" placeholder='Share your opinions' onChange={(e) => setDesc(e.target.value)} />
        <button onClick={handleCreatePost}>POST</button>
      </div>
      <div className={classes.shareBottom}>
        <div className={classes.item}>
          Live Video
          <AiFillCamera />
        </div>
        <label htmlFor='photo' className={classes.item}>
          Photo
          <IoMdPhotos />
        </label>
        <div className={classes.item}>
          Activity
          <AiFillSmile />
        </div>
        <input style={{display: 'none'}} type="file" id='photo' onChange={(e) => setPhoto(e.target.files[0])}/>
      </div>
      {photo && (
          <div className={classes.photoContainer}>
            <AiOutlineClose className={classes.closeIcon} onClick={() => setPhoto("")}/>
            <img src={URL.createObjectURL(photo)} className={classes.photo}/>
          </div>
        )}
    </div>
  )
}

export default Share