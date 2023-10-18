import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = (props) => {
  const blog = props.blog
  const [blogObject, setBlogObject] = useState(blog)
  const [visible, setVisible] = useState(false)
  const showWhenVisible = { display: visible ? '' : 'none' }
  const loginCredientials = props.user

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const increaseLikes = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1
    }
    props.updateBlog(updatedBlog)
    setBlogObject(updatedBlog)
    setTimeout(() => {
      window.location.reload(false)
    }, 3000)
  }

  const removeBlog = () => props.deleteBlog(blog)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const blogOwner = blogObject.user.name
  console.log('added by:', blogOwner)

  if (loginCredientials === blogOwner) {
    return (
      <div>
        <div style={blogStyle} className="blog">
          <div>
            <div onClick={toggleVisibility}>
              {blog.title} {blog.author}
            </div>
          </div>

          <div style={showWhenVisible}>
            <p>{blog.author}</p>
            <p>{blog.url}</p>
            <p>
              {blogObject.likes === 0 || blogObject.likes === 1
                ? `${blogObject.likes} like`
                : `${blogObject.likes} likes`}
              <button id="like-button" onClick={increaseLikes}>
                like
              </button>
            </p>
            <p>added by {blogOwner}</p>
            <p>{blogObject.comments}</p>
            <div>
              <button id="remove" onClick={removeBlog}>
                remove
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  //ELSE:

  return (
    <div>
      <div style={blogStyle} className="blog">
        <div>
          <div onClick={toggleVisibility}>
            {blog.title} {blog.author}
          </div>
        </div>

        <div style={showWhenVisible}>
          <p>{blog.author}</p>
          <p>{blog.url}</p>
          <p>
            {blogObject.likes} likes
            <button id="like-button" onClick={increaseLikes}>
              like
            </button>
          </p>
          <p>added by {blogOwner}</p>
        </div>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired
}

export default Blog
