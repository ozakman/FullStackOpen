import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes: 0
    })
  }

  return (
    <div>
      <h5>Create new</h5>
      <form onSubmit={addBlog}>
        <div>
          Title:
          <input id="title" value={newTitle} onChange={handleTitleChange} />
        </div>
        <div>
          Author:
          <input id="author" value={newAuthor} onChange={handleAuthorChange} />
        </div>
        <div>
          Url: <input id="url" value={newUrl} onChange={handleUrlChange} />
        </div>
        <div>
          <button type="submit">create</button>
        </div>
      </form>
    </div>
  )
}

export default BlogForm