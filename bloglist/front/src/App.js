import React, { useState, useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'

import Blogs from './components/Blogs'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'

import blogService from './services/blogs'
import loginService from './services/login'

import PropTypes from 'prop-types'

import {setNotification, setErrorMessage} from './reducers/notificationReducer'
import { initializeBlogs, createNewBlog , deleteBlogPost} from './reducers/blogsReducer'
import {setUser} from './reducers/userReducer'

import store from './store'




Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}


const App = () => {
  const blogs = useSelector(state => state.blogs)
  const notification = useSelector(state => state.notification)
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(()=>{
    const loggedUserJson = window.localStorage.getItem('loggedUser')
    if(loggedUserJson){
      const user = JSON.parse(loggedUserJson)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  },[dispatch])

  

  blogs.sort(function (a, b) {
    return b.likes - a.likes
  })


  const logOut = () => {
    window.localStorage.clear()
    window.location.reload()

  }


  return (
    <div>
      <Notification notification={notification} />
      <h2>Blog app</h2>
      {user === null ?
        <LoginForm store={store} setUser={setUser} setErrorMessage={setErrorMessage}/> :
        <div>
          <p>Logged in as {user.name}</p>
          <button id="logout-button" onClick={logOut}>log out</button>
          <BlogForm blogs={blogs} store={store} setNotification={setNotification} createNewBlog={createNewBlog}/>
          <div id='all-blogs'>
              {blogs.map(blog =>
                <Blogs  key={blog.id} blog={blog} blogs={blogs} user={user} store={store} setErrorMessage={setErrorMessage} deleteBlogPost={deleteBlogPost}/>
              )}
          </div>
        </div>

      }

    </div>
  )
}


export default App