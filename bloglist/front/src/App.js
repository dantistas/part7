import React, { useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'

import {
  BrowserRouter as Router,
  Switch, Route, Link,useHistory
} from "react-router-dom"

import Blogs from './components/Blogs'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Users from './components/Users'
import User from './components/User'
import CreateUser from './components/CreateUser'

import 'bulma/css/bulma.css'

import blogService from './services/blogs'

import PropTypes from 'prop-types'

import {setNotification, setErrorMessage, setNotificationNull} from './reducers/notificationReducer'
import { initializeBlogs, createNewBlog , deleteBlogPost} from './reducers/blogsReducer'
import {initializeUsers, setUser, setUsers} from './reducers/userReducer'

import store from './store'
import logo from "../src/logo3.png"
import logo2 from "../src/logo2.png"




Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

const App = () => {
  const blogs = useSelector(state => state.blogs)
  const notification = useSelector(state => state.notification)
  const user = useSelector(state => state.users.loggedInUser)
  const users = useSelector(state => state.users.allUsers)


  const dispatch = useDispatch()
  const history = useHistory()

 

  useEffect(()=>{

    dispatch(initializeBlogs())
    dispatch(initializeUsers())

    const loggedUserJson = window.localStorage.getItem('loggedUser')

    if(loggedUserJson){
      const loggedUser = JSON.parse(loggedUserJson)
      dispatch(setUser(loggedUser))
      blogService.setToken(loggedUser.token)
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


  const createBlogStyle = {
    "height":"500px",
    "borderLeft": "1px solid grey" 
  }
 

  return (
    <Router>
      <div>
            <section className="hero is-fullheight is-warning is-bold">
              <div style={{display: "flex", "justifyContent": "center" , margin: "0 auto"}}>
                <Notification notification={notification} setNotificationNull={setNotificationNull} store={store}/>
              </div>  
              <nav className="navbar has-shadow is-white" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                  <a className="navbar-item" href="/">
                    <img src={logo} style={{"maxHeight": 50}} alt={"logo"}></img>
                  </a>
                  <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                    <span className="navbar-item" to='/' aria-hidden="true">Home</span>
                    <span className="navbar-item" to='/' aria-hidden="true">Users</span>
                  </a>
                </div>
                <div className="navbar-menu">
                  <div className="navbar-start">
                    <Link className="navbar-item" to='/'>Home</Link>
                    <Link className="navbar-item" to='/users'>Users</Link>
                  </div>
                </div>
                
                <div className="navbar-end">
                  <div className="navbar-item">
                    <div className="buttons">
                      {user ? [
                        <div  key={user.id} className="px-5">
                          <em key={user.id}>Logged in as {user.name} </em>
                        </div>,
                        <button className="button is-danger" key={`${user.name} + ${user.id}`}onClick={logOut}>Log out!</button>] : 
                          [<Link key ="sign-up" className="button is-primary" to='/sign-up'><strong>Sign up</strong></Link>,
                          <Link  key="log-in" className="button is-primary is-light" to='/log-in'>Log in</Link>]
                          } 
                    </div>
                  </div>
                </div>
              </nav>

                        
                <div className="container is-fluid py-6">
                      <Switch>

                        <Route path='/sign-up'>
                          <div className="columns is-centered">
                              <CreateUser store={store} setNotification={setNotification} setErrorMessage={setErrorMessage} user={user}/> 
                          </div>
                           
                        </Route>

                        <Route path='/log-in'>
                          <div className="columns is-centered">
                            <LoginForm store={store} user={user} setUser={setUser} setNotification={setNotification} setErrorMessage={setErrorMessage}/> 
                          </div>
                         </Route>

                        <Route path='/users/:id'>
                          <User blogs={blogs} users={users}/>
                        </Route>

                        <Route path='/users'>
                          <Users users={users} Link={Link}/>
                        </Route>

                        <Route path='/'>
                          {user ?
                                <div className="columns is-vcentered">
                                  <div className="column is-6">
                                      <div className="block" id='all-blogs'>
                                          {blogs.map(blog =>
                                        
                                            <Blogs initializeBlogs={initializeBlogs} Link={Link} key={blog.id} blog={blog} blogs={blogs} user={user} store={store} setNotification={setNotification} setErrorMessage={setErrorMessage} deleteBlogPost={deleteBlogPost}/>
                                        
                                          )}
                                        </div>
                                      </div>
                                      
                                      <div style={createBlogStyle} className="column is-3 is-offset-3">
                                        <BlogForm blogs={blogs} store={store} initializeUsers={initializeUsers} setNotification={setNotification} setErrorMessage={setErrorMessage} createNewBlog={createNewBlog}/>
                                      </div>
                                   </div>    
                                : 
                                            <div className="columns is-centered">
                                                <div className="column py-5 px-6">
                                                  <img style={{height:300}}src={logo2} alt="logo2"></img>
                                                </div>
                                                <div className="column py-6 px-6">
                                                  <h1 className="title is-bold py-6">Here you can share your favourite blogs</h1>
                                                </div>
                                            </div>
                                       }              
                        </Route>

                      </Switch>
                </div>
            </section>
      </div>
    </Router>
  )
}


export default App