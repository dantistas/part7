import React, { useState } from 'react'
import blogService from '../services/blogs'
import Togglable from './Togglable'




const BlogForm = ({blogs, setBlogs, store, setNotification}) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')


    const createBlog = async (e) => {
      const blogObject = {
                title: title, 
                author: author, 
                url: url
              }
        e.preventDefault()
        const returnedBlog = await blogService.create(blogObject)
        setBlogs(blogs.concat(returnedBlog))
        store.dispatch(setNotification(`a new blog: ${returnedBlog.title} by: ${returnedBlog.author} was created!`, 3000))
        setTitle('')
        setAuthor('')
        setUrl('')
      }
  
        return (
        <Togglable buttonLabel="Create new Blog">
          <div className="formDiv">
            <h2>create new</h2>
            <form onSubmit={createBlog}>
              <div>
                <input
                  id="title"
                  type="text"
                  value={title}
                  name="Title"
                  placeholder="Title"
                  onChange={({ target }) => setTitle(target.value)}
                />
              </div>
              <div>
                <input
                  id="author"
                  type="text"
                  value={author}
                  name="Author"
                  placeholder="Author"
                  onChange={({ target }) => setAuthor(target.value)}
                />
              </div>
              <div>
                <input
                  id="url"
                  type="text"
                  value={url}
                  name="Url"
                  placeholder="Url"
                  onChange={({ target }) => setUrl(target.value)}
                />
              </div>
              <button id="create-blog-button" type="submit">Create</button>
            </form>
          </div>
        </Togglable>
        )
  }



export default BlogForm