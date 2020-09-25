import React, { useState }  from 'react'




const Blog = ({ blog , deletePost, onClickLikePost }) => {
  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }



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
        <button id="delete-button" onClick={() => deletePost(blog.id)}>delete</button>
      </div>
    </div>
  )
}

export default Blog


