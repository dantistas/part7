import React, { useState }  from 'react'


const CreateNewBlog = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')


const addBlog = (e) => {
  e.preventDefault()
  createBlog({
    title: title,
    author: author,
    url: url,
  })
  setTitle('')
  setAuthor('')
  setUrl('')
  
}

  return (
    <div className="formDiv">
      <h2>create new</h2>
      <form onSubmit={addBlog}>
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
  )
}

export default CreateNewBlog