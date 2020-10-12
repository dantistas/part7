import React, { useState }  from 'react'
import blogService from '../services/blogs'




const Blogs = ({blogs, user, setBlogs, store, setErrorMessage, blog , deletePost}) => {
  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }



  const deleteBlog = (id) => {
    const toDelete = blogs.find(b => b.id === id)
    if(toDelete.userID === user.id){
      const ok = window.confirm(`Delete: ${toDelete.title} by ${toDelete.author} ?`)
    if(ok){
      blogService.remove(id)
      setBlogs(blogs.filter(b => b.id !== id))
      store.dispatch(setErrorMessage(`a blog: ${toDelete.title} by: ${toDelete.author} was deleted!`, 3000))
     }
    }else{
      store.dispatch(setErrorMessage(`a blog: ${toDelete.title} by: ${toDelete.author} was NOT deleted! because you are not creator `, 3000))
    }
    
  }


  const onClickLikePost = (id) => {
    blogService.like(id)
    
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }



  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  

  return (
    <div style={blogStyle} className={'blog-class'} id="blog">
      <div style={hideWhenVisible} className={'title-class'}>
        {blog.title}
        <button id="view-button" onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible} className={'after-view-click-class'}>
        <div className={'title-class'}>
          title: {blog.title}
          <button onClick={toggleVisibility}>hide</button> 
        </div>
        <div className={'url-class'}>
          <a href={blog.url}>{blog.url}</a>
          
          
        </div>
        <div className={'likes-class'} id="likes-div">
          likes: {likes} <button id="like-button" onClick={() => { onClickLikePost(blog.id); setLikes(likes+1) }}>like</button>
        </div> 
        <div className={'author-class'}>
          author: {blog.author}
        </div>
        <button id="delete-button" onClick={() => deleteBlog(blog.id)}>delete</button>
      </div>
    </div>
  )
}

export default Blogs


