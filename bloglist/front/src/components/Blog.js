import React, { useState } from 'react'
import {
    useParams,
    useHistory
  } from "react-router-dom"
  import moment from 'moment'


const Blog = ({blogs, blogService, store, setErrorMessage, deleteBlogPost, user, initializeBlogs,setNotification}) => {  
    const id = useParams().id
    const history = useHistory()

    let blog 
    const initialiazeBlog = ()=>{
      blog= blogs.find(b => b.id === id)
    }
    initialiazeBlog()
    const [likes, setLikes] = useState(blog.likes)
    const [comment, setComment] = useState('')
    

    const createComment = (e) => {
      if(comment !== ''){
        const object = {
          comment:comment,
          id:blog.id,
          date: moment().format('MMMM Do YYYY, h:mm:ss a')
        }
        e.preventDefault()
        blogService.postComment(object)
        store.dispatch(setNotification('Comment was succesfully posted!',3000))
        store.dispatch(initializeBlogs())
        initialiazeBlog()
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
        store.dispatch(initializeBlogs())
        
      }

    if(!blogs) {
        return (
            null
        )
    } else {
       return (
        <div>
            <h2>{blog.title}. {blog.author}</h2>
            <a href={`https://${blog.url}`}>{blog.url}</a>
            <div className={'likes-class'} id="likes-div">
                likes: {likes} <button id="like-button" onClick={() => { onClickLikePost(blog.id); setLikes(likes+1) }}>like</button> <button id="delete-button" onClick={() => deleteBlog(blog.id)}>delete</button> <button onClick={()=>{history.push('/')}}>Back</button>
            </div>
             
            <p>added by: {blog.user[0].name}</p>
            <h2>Comments:</h2>
            <form onSubmit={createComment}>
              <input  id="comment"
                      type="text"
                      value={comment}
                      name="comment"
                      placeholder="write a comment"
                      onChange={({ target }) => setComment(target.value)}>
              </input>
              <button  type="submit">Post</button>
            </form>
            <ul>
              {blog.comments.map(c=><li key={c.date}><p>{c.comment} at: {c.date}</p> </li>)}
            </ul>
        </div>
    )
    }
    
    


}

export default Blog