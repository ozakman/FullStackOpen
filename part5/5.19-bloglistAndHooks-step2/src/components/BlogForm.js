/* eslint-disable */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useField } from '../hooks'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle ] = useState('')
  const [newAuthor, setNewAuthor ] = useState('')
  const [newUrl, setNewUrl ] = useState('')

  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

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
      url: newUrl
    })
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <div>
    <h2>Create new</h2>
    <form onSubmit={addBlog}>
      Title: 
        <input
          {...title} 
        />
        <br/> 
      Author:
        <input
          {...author} 
        />
        <br/>
      Url:
        <input
          {...url}
        />
        <br/>
        <button type="submit">create</button> 
        </form>
        <br/>
    </div>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm