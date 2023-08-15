import React , { useState } from 'react'
import PropTypes from 'prop-types'
import Blogs from '../services/Blogs'

const Blog = (props) => {
  const blog = props.blog
  const [blogObject, setBlogObject] = useState(blog)
  const [visible, setVisible] = useState(false)
  const showWhenVisible = { display: visible ? '' : 'none' }
  const [isFullHeigth, setIsFullHeigth] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }
  const buttonLabel = visible ? blog.title : blog.title

  const increaseLikes = () => {
    const updatedBlog = ({
      ...blog,
      likes: blog.likes + 1
    })
    props.updateBlog(updatedBlog)
    setBlogObject(updatedBlog)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const blogOwner = blogObject.user.name

  return (
    <div style={{'height':` ${isFullHeigth ? '100%' : '10%'}`}}>  
      <div style={blogStyle} className='blog'>
        <div>
            <p onClick={toggleVisibility}>{buttonLabel}</p>
        </div>
        <div style={showWhenVisible}>
          <p>{blog.url}</p>
          <p>{blogObject.likes}  likes<button id='like-button' onClick={increaseLikes}>like</button></p>
          <p>added by {blogOwner}</p>
        </div>
      </div>
    </div>      
  )
}

export default Blog
