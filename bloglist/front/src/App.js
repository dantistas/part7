import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import CreateNewBlog from './components/createblog'
import Togglable from './components/toggle'
import PropTypes from 'prop-types'


Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}


const Notification = ({ message }) => {
  if(message === null ) {
    return null
  }else {
    return (
      <div className="notification" id="notification">
        {message}
      </div>
    )
  }
}

const ErrorNotification = ({ error }) => {
  if(error === null ) {
    return null
  }else {
    return (
      <div id="error-notification" className="error">
        {error}
      </div>
    )
  }
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notification, setNotification] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
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
    console.log(`logging with username: ${username} password: ${password}`)
    try{
      const user = await loginService.login({
        username,password,
      })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      console.log(user.id)
    }catch(exception){
      setErrorMessage ('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
  }
  
  const deletePost = (id) => {
    const toDelete = blogs.find(b => b.id === id)
    if(toDelete.userID === user.id){
      const ok = window.confirm(`Delete: ${toDelete.title} by ${toDelete.author} ?`)
    if(ok){
      // blogService.setToken(user.token)
      blogService.remove(id)
      setBlogs(blogs.filter(b => b.id !== id))
      setNotification (`a blog: ${toDelete.title} by: ${toDelete.author} was deleted!`)
      setTimeout(() => {
        setNotification(null)
      }, 3000)
     }
    }else{
      setErrorMessage(`a blog: ${toDelete.title} by: ${toDelete.author} was NOT deleted! because you are not creator `)
      setTimeout(() => {
        setNotification(null)
      }, 3000)
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

  const addBlog = async (blogObject) => {
    const returnedBlog = await blogService.create(blogObject)
    setBlogs(blogs.concat(returnedBlog))
    
    setNotification (`a new blog: ${returnedBlog.title} by: ${returnedBlog.author} was created!`)
    setTimeout(() => {
      setNotification(null)
    }, 3000)
  }

  const blogForm = () => {
    return (
      <Togglable buttonLabel="Create new Blog">
        <CreateNewBlog
          createBlog={addBlog}
          username={username}
        />
      </Togglable>

    )


  }
  const logOut = () => {
    window.localStorage.clear()
    window.location.reload()

  }

  const onClickLikePost = (id) => {
    blogService.like(id)
    
  }

  return (
    <div>
      <Notification message={notification} />
      <ErrorNotification error={errorMessage} />
      <h2>blogs</h2>
      {user === null ?
        loginForm() :
        <div>
          <p>Logged in as {user.name}</p>
          <button id="logout-button" onClick={logOut}>log out</button>
          {blogForm()}
          <div id='all-blogs'>
          {blogs.map(blog =>
            <Blog  key={blog.id} blog={blog}  deletePost={deletePost} onClickLikePost={onClickLikePost}/>
          )}
          </div>
        </div>

      }

    </div>
  )
}


export default App