/* eslint-disable */
import React from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const BlogForm = () => {
  const dispatch = useDispatch()

  const createNewBlog = async (event) => {
    event.preventDefault()
    const title = event.target.title.value
    const author = event.target.author.value
    const url = event.target.url.value

    event.target.title.value = ''
    event.target.author.value = ''
    event.target.url.value = ''

    const blogToCreate = {
      title: title,
      author: author,
      url: url,
      likes: 0
    }

    dispatch(createBlog(blogToCreate))
    dispatch(
      setNotification(`Blog ${title} successfully created`, 'success', 5)
    )
  }

  return (
    <form onSubmit={createNewBlog}>
      <div>
        <div>
          Title:
          <input type="text" name="title" id="title" />
        </div>
        <div>
          Author:
          <input type="text" name="author" id="author" />
        </div>
        <div>
          Url:
          <input type="text" name="url" id="url" />
        </div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default BlogForm
