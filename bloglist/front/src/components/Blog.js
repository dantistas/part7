import React, { useState } from 'react'
import {
    useParams,
    useHistory
  } from "react-router-dom"


const Blog = ({blogs, blogService, store, setErrorMessage, deleteBlogPost, user}) => {  
    const id = useParams().id
    const history = useHistory()

    const blog = blogs.find(b => b.id === id)

    const [likes, setLikes] = useState(blog.likes)

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

    if(!blogs) {
        return (
            null
        )
    } else {
       return (
        <div>
            <button onClick={()=>{history.push('/')}}>Back</button>
            <h1>{blog.title}. {blog.author}</h1>
            <a href={`https://${blog.url}`}>{blog.url}</a>
            <div className={'likes-class'} id="likes-div">
                likes: {likes} <button id="like-button" onClick={() => { onClickLikePost(blog.id); setLikes(likes+1) }}>like</button>
            </div>
            <button id="delete-button" onClick={() => deleteBlog(blog.id)}>delete</button> 
            <p>added by: {blog.user[0].name}</p>
        </div>
    )
    }
    
    


}

export default Blog