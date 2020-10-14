import React, { useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'

import {
  BrowserRouter as Router,
  Switch, Route, Link
} from "react-router-dom"

import Blogs from './components/Blogs'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Users from './components/Users'
import User from './components/User'

import blogService from './services/blogs'

import PropTypes from 'prop-types'

import {setNotification, setErrorMessage} from './reducers/notificationReducer'
import { initializeBlogs, createNewBlog , deleteBlogPost} from './reducers/blogsReducer'
import {initializeUsers} from './reducers/userReducer'
import {setUser, setUsers} from './reducers/userReducer'

import store from './store'




Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}


const App = () => {
  const blogs = useSelector(state => state.blogs)
  const notification = useSelector(state => state.notification)
  const user = useSelector(state => state.users.loggedInUser)
  const users = useSelector(state => state.users.allUsers)
  
  const dispatch = useDispatch()

 
  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeUsers())
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
    dispatch(setUser(null))
    dispatch(setUsers(null))

  }

const padding = {
  padding: 5
}

  return (
    <Router>
      <div>
        <Link style={padding} to='/'>Home</Link>
        <Link style={padding} to='/users'>Users</Link>
      </div>
      <Notification notification={notification} />
      <h2>Blog app</h2>
      {user === null ? <LoginForm store={store} setUser={setUser} setErrorMessage={setErrorMessage}/> : 
        <div>
          <p>Logged in as {user.name}</p>
          <button id="logout-button" onClick={logOut}>log out</button>
        </div>
      }
      <Switch>
        <Route path='/users/:id'>
          <User users={users}/>
        </Route>
        <Route path='/users'>
          <Users users={users} Link={Link}/>
        </Route>
        <Route path='/'>
        {user !== null ? 
          <div>
            <div> 
              <BlogForm blogs={blogs} store={store} setNotification={setNotification} createNewBlog={createNewBlog}/>
              <div id='all-blogs'>
                  {blogs.map(blog =>
                    <Blogs  key={blog.id} blog={blog} blogs={blogs} user={user} store={store} setErrorMessage={setErrorMessage} deleteBlogPost={deleteBlogPost}/>
                  )}
              </div>
            </div>
          </div> : null }
        </Route>
      </Switch>
    </Router>

  )
}


export default App