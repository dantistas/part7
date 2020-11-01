import React, { useState }  from 'react'
import {
  useHistory
} from "react-router-dom"

import blogService from "../services/blogs"

import moment from 'moment'



const Blogs = ({blogs, blog, Link, store, setErrorMessage, deleteBlogPost, user, setNotification}) => {

  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)
  const [comments, setComments] = useState(blog.comments)
  const [comment, setComment] = useState('')

  const history = useHistory()

  const showWhenVisible = { display: visible ? 'block' : 'none' }

  let sizeOfColumn
  let title = blog.title

  if(blog.title.length < 15){
    sizeOfColumn = 3
  } else if(blog.title.length < 20){
    sizeOfColumn = 4
  } else if(blog.title.length < 30){
    sizeOfColumn = 6
  } else if (blog.title.length < 45) {
    sizeOfColumn = 8
  } else if (blog.title.length < 45) {
    sizeOfColumn = 9
  } else if (blog.title.length < 50) {
    sizeOfColumn = 10
  } else {
    sizeOfColumn = 12
    title = blog.title.slice(0,50) + "..."
  }


  const toggleVisibility = () => {
    setVisible(!visible)
  }


  const createComment =  async(e) => {
    if(comment !== ''){

        const object = {
          comment:comment,
          id:blog.id,
          date: moment().format('MMMM Do YYYY, h:mm:ss a')
        }

      e.preventDefault()
      await blogService.postComment(object)
      setComments(comments.concat(object))
      store.dispatch(setNotification('Comment was succesfully posted!',3000))
      setComment('')
    }else{
      e.preventDefault()
      store.dispatch(setErrorMessage('You cannot post empty comment!', 3000))
    }
  }


  const deleteBlog = (id) => {
      const toDelete = blogs.find(b => b.id === id)
      if(toDelete.userID === user.id){
        const ok = window.confirm(`Delete: ${toDelete.title} by ${toDelete.author} ?`)
      if(ok){
        store.dispatch(deleteBlogPost(id))
        store.dispatch(setErrorMessage(`a blog: ${toDelete.title} by: ${toDelete.author} was deleted!`, 3000))
        history.push('/')
       }
      }else{
        store.dispatch(setErrorMessage(`a blog: ${toDelete.title} by: ${toDelete.author} was NOT deleted! because you are not creator `, 3000))
      }
      
    }


  const onClickLikePost = (id) => {

      blogService.like(id)
      
    }
    


  const blogStyle = {
    "paddingTop": 5,
    "paddingLeft": 20,
    "paddingRight": 20,
    "margin": 10,
    "marginBottom": 10,
    "borderLeft": "6px solid #2196F3",
    "borderBottom": "1px solid #2196F3",
    "backgroundColor": "#ddffff",
    "borderTopRightRadius": "25px",
    "borderBottomRightRadius": "25px",
    
    
  }

  

  return (
    <div style={blogStyle} className={`column is-${sizeOfColumn}`}>
      <div className="container" id="blog">
        <Link onClick={toggleVisibility} to={`/blogs/${blog.id}`}>{title}</Link>
        <div className="modal" style={showWhenVisible}>
                  <div className="modal-background">
                            <div className="hero-body">
                              <div className="modal-card py-6 px-6">
                                <header className="modal-card-head">
                                    <p className="modal-card-title">{title}</p>
                                    <p className="modal-card-subtitle">Author: {blog.author}</p>
                                </header>
                                  <section className="modal-card-body">
                                    <div className="card" id="card">
                                      <header className="card-header">
                                        <p className="card-header-title">added by: {blog.user[0].name}</p>
                                        <p className="card-header-title">likes: {likes}</p>
                                      </header>
                                      <div className="card-content">
                                        <div className="content">
                                          <a href={`https://${blog.url}`}>{blog.url}</a>
                                          <h2 className="subtitle is-4">Comments:</h2>
                                            <form onSubmit={createComment}>
                                              <input
                                                      id="comment"
                                                      type="text"
                                                      value={comment}
                                                      name="comment"
                                                      placeholder="write a comment"
                                                      onChange={({ target }) => setComment(target.value)}>
                                              </input>
                                              <button  type="submit">Post</button>
                                            </form>
                                            {comments.length === 0 ? <p className="subtitle">There are no comments yet, be first to comment!</p> 
                                                      :
                                                      <ul>
                                                        {comments.map(c=><li key={c.date}><p>{c.comment} at: {c.date}</p> </li>)}
                                                      </ul>
                                              } 
                                        </div>
                                      </div>
                                    </div>
                                  </section>
                                  <footer className="modal-card-foot">
                                    <a href={null} className="card-footer-item" onClick={() => { onClickLikePost(blog.id); setLikes(likes+1) }}>Like</a>
                                    <a href={null} className="card-footer-item" onClick={() => deleteBlog(blog.id)}>Delete</a>
                                    <a href={null} className="card-footer-item" onClick={()=>{toggleVisibility(); history.push('/')}}>Back</a>
                                  </footer>
                              </div>
                            </div>
                    <button onClick={()=>{toggleVisibility(); history.push('/')}} className="modal-close is-large" aria-label="close"></button>
                  </div>
        </div>  
      </div>
    </div>
    
  )
}

export default Blogs

