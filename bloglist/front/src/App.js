import React, { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import PropTypes from 'prop-types'
import {useSelector} from 'react-redux'
import Notification from './components/Notification'
import {setNotification, setErrorMessage} from './reducers/notificationReducer'
import store from './store'
import BlogForm from './components/BlogForm'



Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const notification = useSelector(state => state)
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])
  blogs.sort(function (a, b) {
    return b.likes - a.likes
  })

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedUser')
    if(loggedUserJson){
      const user = JSON.parse(loggedUserJson)
      setUser(user)
      blogService.setToken(user.token)
    }
  },[])


  const handleLogin = async (e) => {
    e.preventDefault()
    try{
      const user = await loginService.login({
        username,password,
      })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    }catch(exception){
      store.dispatch(setErrorMessage('wrong username or password', 3000))
    }
  }
   

  const loginForm = () => {
    return (
      <div>
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin} id="login-form">
          <div>
            <input
              id="username"
              type="text"
              value={username}
              name="Username"
              placeholder="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            <input
              id="password"
              type="password"
              value={password}
              name="password"
              placeholder="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id="login-button" type="submit">login</button>
        </form>
      </div>
    )
  }

  const logOut = () => {
    window.localStorage.clear()
    window.location.reload()

  }


  return (
    <div>
      <Notification notification={notification} />
      <h2>Blog app</h2> 
      {user === null ?
        loginForm() :
        <div>
          <p>Logged in as {user.name}</p>
          <button id="logout-button" onClick={logOut}>log out</button>
          <BlogForm blogs={blogs} setBlogs={setBlogs} store={store} setNotification={setNotification}/>
          <div id='all-blogs'>
              {blogs.map(blog =>
                <Blogs  key={blog.id} blog={blog} blogs={blogs} user={user} setBlogs={setBlogs} store={store} setErrorMessage={setErrorMessage}/>
              )}
          </div>
        </div>

      }

    </div>
  )
}


export default App