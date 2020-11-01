import React, { useState } from 'react'
import Togglable from './Togglable'




const BlogForm = ({store, setNotification, setErrorMessage, createNewBlog, initializeUsers}) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')


    const createBlog = (e) => {

      const blogObject = {

                title: title , 
                author: author, 
                url: url

              }
         
        if(!title || !author || !url){

          e.preventDefault()
          store.dispatch(setErrorMessage(`To add a blog, all input fields are nescessary!`, 3000))


        } else {

          e.preventDefault()
          store.dispatch(createNewBlog(blogObject))
          store.dispatch(setNotification(`A new blog: ${title} by: ${author} was created!`, 3000))
          store.dispatch(initializeUsers())
          setTitle('')
          setAuthor('')
          setUrl('')

        }    
      
      }
  
        return (
        <Togglable buttonLabel="Add a new Blog">
          <div className="formDiv">
            <h2 className="title">Add a new blog</h2>
            <form onSubmit={createBlog}>
              <div className="field">
                <input className="input is-rounded"
                  id="title"
                  type="text"
                  value={title}
                  name="Title"
                  placeholder="Title"
                  onChange={({ target }) => setTitle(target.value)}
                />
              </div>
              <div className="field">
                <input className="input is-rounded"
                  id="author"
                  type="text"
                  value={author}
                  name="Author"
                  placeholder="Author"
                  onChange={({ target }) => setAuthor(target.value)}
                />
              </div>
              <div className="field">
                <input className="input is-rounded"
                  id="url"
                  type="text"
                  value={url}
                  name="Url"
                  placeholder="Url"
                  onChange={({ target }) => setUrl(target.value)}
                />
              </div>
              <button className="button is-primary is-rounded" id="create-blog-button" type="submit">Create</button>
            </form>
          </div>
        </Togglable>
        )
  }



export default BlogForm